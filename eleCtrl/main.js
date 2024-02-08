require(["/js/plugin/vue2/vue.min.js"], function(Vue) {
    function getResourceItems(terms, output) {
        return fetch("/api/v2/cmdb/resources/items", {
            body: JSON.stringify({
                output: output,
                where: [{
                    terms: [terms],
                }, ],
                output_format: "list",
                translate: 1,
            }),
            method: "POST",
            mode: "cors",
            credentials: "include",
        }).then((v) => v.json());
    }

    function getReverStatus(realValue, type = "control") {
        // ===============================临时测试和演示用by Tim

        // 取url地址中 status的值, open是分或双分, close是合或双合
        let hash_arr = window.location.search.replace('?', '').split('&')
        let hash_obj = {}
        hash_arr.forEach(item => {
            hash_obj[item.split('=')[0]] = item.split('=')[1]
        })

        let elec_status = hash_obj.status == "open" ? '0' : '1';
        // 需要根据是否是open取反

        console.log('status= ', window.location.search.indexOf('status'))
        if (window.location.search.indexOf('status') != "-1") return elec_status;

        // ===============================临时测试和演示用by Tim
        var node = window.parent.dataModel.getDataById(params.xeid);
        var mValue = node.parseBindData({ real_value: realValue }, 'real_value', node.a("propertyData")['equip.status']);
        var subList = node.a("propertyData")['equip.status'].subList;
        var map = {};
        subList.forEach(item => {
            map[item.rightValue] = item.leftValue + '';
        });
        var reverVal = mValue === '0' ? '1' : '0';
        return type === "control" ? reverVal : map[reverVal];
    }
    const params = {};
    const getLast = (ids) =>
        fetch("/api/v3/dcpm/attributed_metrics:batchGet", {
            method: "POST",
            body: JSON.stringify({
                resources: ids.map((resource_id) => ({ resource_id })),
            }),
        })
        .then((v) => v.json())
        .then((res) => {
            const map = {};
            res.resources.forEach((item) => {
                map[item.resource_id] = item;
            });
            return map;
        });

    const getLables = (id) => {
        return getLast([id]).then((res) => {
            var parseData = JSON.parse(res[id].labels || "{}");
            parseData.real_value = res[id].real_value;
            return parseData;
        });
    };
    const getRealValue = (id) => {
        return getLast([id]).then((res) => {
            if (params.isControlSimulation) {
                var parseData = JSON.parse(res[id].labels || "{}");
                return parseData['test_control'] || res[id].real_value || "";
            }
            return res[id].real_value || "";
        });
    };

    const setSign = (blocked, sign, zsParams) => {
        const otherLabels = ["test_normal", "test_control", "test_scheme"];
        const map = {};
        sign.filter(x => !otherLabels.includes(x)).forEach((i) => (map[i] = true));
        map.blocked = blocked;
        Object.assign(map, zsParams);
        return fetch("/api/v3/dcpm/control", {
            method: "post",
            body: JSON.stringify({
                resource_id: params.crid,
                value: JSON.stringify(map),
                type: "label",
                status_id: params.srid,
            }),
        }).then((v) => v.json());
    };
    const setNumber = (value) => {
        if (!value) {
            return Promise.reject({ code: 2 });
        }
        if (typeof value === 'number') {
            value = `${value}`;
        }
        return fetch(`/api/v3/dcpm/control/${params.srid}/simulated_value`, {
            method: "post",
            body: JSON.stringify({
                value,
                type: "test_normal",
                status_id: params.srid,
            }),
        }).then((res) => {
            if (res.status === 200) {
                return {
                    error_code: "00",
                    error_msg: "Succeed"
                }
            } else {
                return res.text();
            }
        }).then(res => {
            if (res.error_code === "00") {
                return res;
            }
            var resObj = JSON.parse(res);
            return {
                error_code: resObj.error.code || '500',
                error_msg: resObj.error.message || "操作失败"
            }
        });
    };

    const doSetting = (id, value, type, jhrUser) => {
        if (params.isControlSimulation) {
            var node = window.parent.dataModel.getDataById(params.xeid);
            value = getReverStatus(node.real_value, "status");
        }
        if (typeof value === 'number') {
            value = `${value}`;
        }
        const param = {
            // resource_id: id,
            value: value,
        };
        if (type) {
            param.type = type;
            param.status_id = params.srid || '';
        }
        if (jhrUser) {
            param.guardian = jhrUser;
        }
        return fetch(`/api/v3/dcpm/control/${id}:execute`, {
            method: "post",
            body: JSON.stringify(param),
        }).then((res) => {
            if (res.status === 200) {
                return {
                    error_code: "00",
                    error_msg: "Succeed"
                };
            } else {
                return res.text();
            }
        }).then(res => {
            if (res.error_code === '00') {
                return res;
            }
            var resObj = JSON.parse(res);
            var message = resObj.error.message || '';
            var index = message.indexOf('desc =');
            if (index > -1) {
                message = message.slice(index + 7);
            }
            return {
                error_code: resObj.error.code || '500',
                error_msg: message,
            }
        });
    };

    const targetResize = () => {
        setTimeout(() => {
            const parentEl = parent.__elecDialog.getDOMNode();
            const alertBoxWrapper = parentEl.querySelector(
                ".c-alertBox__svg-outline"
            );
            const alertBox = parentEl.querySelector(".c-alertBox");
            alertBox.style.height =
                document.querySelector("#app").offsetHeight + 40 + "px";

            if (params.type == 'yk') {
                alertBoxWrapper.style.width = "1102px";
                alertBoxWrapper.style.transform = "translate(-50%, -50%)";
                alertBox.style.width = "1100px";
                alertBox.style.transform = "translate(-50%, -50%)";
            }
        }, 10);
    };

    location.search
        .slice(1)
        .split("&")
        .forEach((v) => {
            const kv = v.split("=");
            params[kv[0]] = kv[1];
        });
    const getPreConditionList = (value) => {
        return fetch(
            `/api/v3/dcpm/control/pre_condition_check:list?controlId=${params.crid}&targetStatus=${value}`, {
                method: "get",
            }
        ).then((v) => v.json());
    };
    const checkPreCondition = (value, jhrUser) => {
        let url = `/api/v3/dcpm/control/pre_condition_check:execute?controlId=${params.crid}&targetStatus=${value}&guardian=${jhrUser}`;
        if (params.isControlSimulation) {
            url += "&control_type=test_control";
        }
        return fetch(
            url, {
                method: "get",
            }
        ).then((v) => v.json());
    };
    // ​人工检查提交
    const manualChecked = (value, content) => {
        const param = {
            controlId: params.crid,
            targetStatus: value,
            content,
        };
        return fetch(`/api/v3/dcpm/control/manual_check:record`, {
            method: "post",
            body: JSON.stringify(param),
        }).then((v) => v.json());
    };
    window.vm = new Vue({
        el: "#app",
        data: function() {
            return {
                device: {},
                type: {
                    gp: "挂牌",
                    zp: "摘牌",
                    yk: "遥控",
                    lock: "闭锁/解锁",
                    zs: "人工置数",
                }[params.type],
                guarderNeed: +params.guarder,
                currentStep: -1,
                successStep: {},
                params: params,

                random: new Date().getTime(),

                allSignList: [
                    // {
                    //   id: "blocked",
                    //   label: "封锁",
                    // },
                    {
                        id: "denied_switch_in",
                        label: "禁止合闸",
                    },
                    {
                        id: "denied_switch_in_and_at_work",
                        label: "禁止合闸，有人工作",
                    },
                    {
                        id: "denied_opening",
                        label: "禁止分闸",
                    },
                    {
                        id: "at_overhaul",
                        label: "设备在检修",
                    },
                ],

                signLeftCheck: {},
                signRightCheck: {},

                errInfo: {
                    step: 0,
                    err: "success",
                    msg: "",
                },

                form: {
                    czr: {
                        pwd: "",
                    },
                    jhr: {
                        usr: "",
                        pwd: "",
                    },
                    gp: {
                        signs: [],
                    },
                    yk: {
                        task: null,
                    },
                },
                isExpand1: true,
                isExpand2: true,
                manualContent: "",
                checkOperatorResult: null,
                checkGuarderResult: null,
                preSettingResult: null,
                doSettingResult: null,
                checkResultMaps: {},
                preConditionList: [],
                checkPreConditionReustMaps: {},
                mapperMap: {},
            };
        },
        computed: {
            currentStepInfo: function() {
                return this.steps[this.currentStep];
            },
            subTitle: function() {
                switch (this.type) {
                    case "挂牌":
                        return "挂牌操作";
                    case "摘牌":
                        return "摘牌操作";
                    case "遥控":
                        return "遥控操作";
                    case "闭锁/解锁":
                        return params.lock ? "解锁操作" : "封锁操作";
                    case "人工置数":
                        return params.test_normal ? "恢复刷新" : "人工变反";
                }
            },
            steps: function() {
                switch (this.type) {
                    case "挂牌":
                        this.guarderNeed = false;
                        return [
                            "操作人验证",
                            // this.guarderNeed ? "监护人验证" : "",
                            "挂牌操作执行",
                        ].filter((v) => v);
                    case "摘牌":
                        this.guarderNeed = false;
                        return [
                            "操作人验证",
                            // this.guarderNeed ? "监护人验证" : "",
                            "摘牌操作执行",
                        ].filter((v) => v);
                    case "遥控":
                        return [
                            "操作验证",
                            // this.guarderNeed ? "监护人验证" : "",
                            "前置条件校验",
                            "人工检查",
                            this.device.ctrl ? "遥控预置" : "",
                            "遥控执行",
                        ].filter((v) => v);
                    case "闭锁/解锁":
                        this.guarderNeed = false;
                        return [
                            "操作人验证",
                            // this.guarderNeed ? "监护人验证" : "",
                            params.lock ? "解锁操作" : "封锁操作",
                        ].filter((v) => v);
                    case "人工置数":
                        this.guarderNeed = false;
                        return ["操作人验证", params.test_normal ? "恢复刷新" : "人工变反"];
                }
            },
            signList: function() {
                const selected = {};
                this.form.gp.signs.forEach((key) => {
                    selected[key] = true;
                });
                return this.allSignList.filter((v) => !selected[v.id]);
            },
            selectSignList: function() {
                const activeSign = {};
                this.form.gp.signs.forEach((v) => {
                    activeSign[v] = true;
                });
                return this.allSignList.filter((v) => activeSign[v.id]);
            },
            signLeftSelectAll() {
                for (let i = 0; i < this.signList.length; i++) {
                    if (!this.signLeftCheck[this.signList[i].id]) {
                        return false;
                    }
                }
                return true;
            },
            signRightSelectAll() {
                for (let i = 0; i < this.selectSignList.length; i++) {
                    if (!this.signRightCheck[this.selectSignList[i].id]) {
                        return false;
                    }
                }
                return true;
            },
        },
        watch: {
            currentStepInfo(val) {
                switch (val) {
                    case "挂牌操作执行":
                        getLables(params.srid)
                            .then((labels) => {
                                console.log(labels);
                                delete labels.blocked;
                                delete labels.real_value;
                                this.form.gp.signs = Object.keys(labels).filter(
                                    (v) => labels[v]
                                );
                            })
                            .catch((e) => {
                                this.handleTask({ error_msg: "后台服务异常" });
                            });
                        break;

                    default:
                        break;
                }
            },
        },
        methods: {
            handleTask(res, successInfo, errorInfo) {
                if (res.error_code === "00") {
                    this.errInfo = {
                        step: this.currentStep,
                        err: "success",
                        msg: successInfo || "操作成功",
                    };
                    this.nextStep();
                } else {
                    this.errInfo = {
                        step: this.currentStep,
                        err: "error",
                        msg: errorInfo || res.error_msg || "操作失败",
                    };
                }
            },
            async beforeUnloadHadle() {
                console.log('弹框关闭');
                if (
                    (this.params.type === 'yk' && this.preSettingResult === "padding") ||
                    this.preSettingResult === "success"
                ) {
                    await doSetting(this.device.ctrl.cancel, this.form.yk.task);
                }
            },
            async close() {
                if (
                    this.params.type === 'yk' && this.preSettingResult === 'success' && !this.doSettingResult
                ) {
                    await doSetting(this.device.ctrl.cancel, this.form.yk.task);
                    parent.__elecDialog.removeBox();
                    return;
                }
                parent.__elecDialog.removeBox();
            },
            nextStep() {
                this.successStep[this.currentStep++] = true;
                if (!this.steps[this.currentStep]) {
                    parent.dialog.floatTips("操作成功");
                    setTimeout(() => {
                        this.close();
                    }, 1000);
                }
                targetResize();
            },
            nextStepHandle(type) {
                switch (type) {
                    case "操作验证":
                        {
                            if (this.params.type === 'yk') {
                                // 前置条件校验
                                checkPreCondition(this.form.yk.task, this.form.jhr.usr).then((res) => {
                                    if (res.results) {
                                        const exitKeys = Object.keys(this.checkPreConditionReustMaps);
                                        const resObj = {};
                                        exitKeys.forEach((key) => {
                                            resObj[key] = res.results[key];
                                        });
                                        this.executePreConditionItems(resObj);
                                    } else if (res.error.message) {
                                        this.errInfo = {
                                            step: this.currentStep,
                                            err: "error",
                                            msg: res.error.message,
                                        };
                                    } else {
                                        this.errInfo = {
                                            step: this.currentStep,
                                            err: "error",
                                            msg: "前置条件校验异常",
                                        };
                                    }

                                });
                            }
                            break;
                        }
                    case "前置条件校验":
                        this.setCheckResultMaps("人工检查");
                        break;
                    case "人工检查":
                        {
                            if (!this.manualContent) {
                                this.errInfo = {
                                    step: this.currentStep,
                                    err: "error",
                                    msg: "请在人工检查输入信息",
                                };
                                return;
                            }
                            manualChecked(this.form.yk.task, this.manualContent);
                            this.handleDoSetting(!!this.device.ctrl);
                            break;
                        }
                    case "遥控预置":
                        this.handleDoSetting();
                        break;
                }
            },
            executePreConditionItems(list) {
                let index = 0;
                const arr = Object.keys(list);
                const fn = () => {
                    const key = arr[index];
                    this.checkPreConditionReustMaps[key] = "padding";
                    setTimeout(() => {
                        this.checkPreConditionReustMaps[key] = list[key] ?
                            "success" :
                            "fail";
                        index++;
                        if (index < arr.length) {
                            fn();
                        } else {
                            if (Object.values(list).every((x) => x)) {
                                this.setCheckResultMaps("前置条件校验");
                            }
                        }
                    }, 1000);
                };
                fn();
            },
            setCheckResultMaps(str) {
                this.steps.forEach((key) => {
                    this.$set(this.checkResultMaps, key, key === str);
                });
            },
            transformRight() {
                const activeSign = {};
                const res = [];
                this.form.gp.signs.forEach((v) => {
                    activeSign[v] = true;
                });
                this.signList.forEach((item) => {
                    if (activeSign[item.id] || this.signLeftCheck[item.id]) {
                        res.push(item.id);
                    }
                    this.$set(this.signLeftCheck, item.id, false);
                });
                this.form.gp.signs = this.form.gp.signs.concat(res);
            },
            transformLeft() {
                this.form.gp.signs = this.form.gp.signs.filter(
                    (id) => !this.signRightCheck[id]
                );
                this.signRightCheck = {};
            },
            doSignLeftSelectAll(e) {
                const v = e.target.checked;
                this.signList.forEach((item) => {
                    this.$set(this.signLeftCheck, item.id, v);
                });
            },
            doSignRightSelectAll(e) {
                const v = e.target.checked;
                this.selectSignList.forEach((item) => {
                    this.$set(this.signRightCheck, item.id, v);
                });
            },

            handleCheckPwd(usr, pwd) {
                this.errInfo = {
                    step: this.currentStep,
                    err: "loading",
                    msg: "验证中...",
                };
                fetch("/api/v2/auth/sso/check_password", {
                        method: "post",
                        body: JSON.stringify({
                            account: usr || params.account,
                            password: pwd,
                        }),
                    })
                    .then((v) => v.json())
                    .then((res) => {
                        if (!usr) {
                            this.checkOperatorResult =
                                res.error_code === "00" ? "success" : "fail";
                        } else {
                            this.checkGuarderResult =
                                res.error_code === "00" ? "success" : "fail";
                        }
                        if (
                            this.checkOperatorResult === "success" &&
                            (!this.guarderNeed || this.checkGuarderResult === "success")
                        ) {
                            this.setCheckResultMaps("操作验证");
                        }
                        this.handleTask(res, "验证成功", "验证失败");
                    });
            },
            // 操作人验证
            handleSelfCheck() {
                if (!this.form.czr.pwd) {
                    this.errInfo = {
                        step: this.currentStep,
                        err: "error",
                        msg: "请输入密码",
                    };
                } else {
                    this.handleCheckPwd("", this.form.czr.pwd);
                    this.checkOperatorResult = "padding";
                }
            },
            // 监护人验证
            handleAuthCheck() {
                if (this.form.jhr.usr === params.account) {
                    this.errInfo = {
                        step: this.currentStep,
                        err: "error",
                        msg: "监护人不能为当前用户",
                    };
                } else if (!this.form.czr.pwd) {
                    this.errInfo = {
                        step: this.currentStep,
                        err: "error",
                        msg: "请操作人输入密码",
                    };
                } else if (!this.form.jhr.pwd || !this.form.jhr.usr) {
                    this.errInfo = {
                        step: this.currentStep,
                        err: "error",
                        msg: "请输入用户名和密码",
                    };
                } else {
                    this.handleCheckPwd(this.form.jhr.usr, this.form.jhr.pwd);
                    this.checkGuarderResult = "padding";
                }
            },
            // (人工置数逻辑已迁移到layout.js文件)
            handleSetNumber() {
                getLables(params.srid)
                    .then((labels) => {
                        var value = '';
                        if (!labels['test_normal']) {
                            var realValue = labels.real_value;
                            var node = window.parent.dataModel.getDataById(params.xeid);
                            var mValue = node.parseBindData({ real_value: realValue }, 'real_value', node.a("propertyData")['equip.status']);
                            var subList = node.a("propertyData")['equip.status'].subList.filter(x => x.leftValue !== "other");
                            var map = {};
                            subList.forEach(item => {
                                map[item.rightValue] = item.leftValue;
                            });
                            var reverVal = mValue === '0' ? '1' : '0';
                            value = map[reverVal];
                        }
                        return setNumber(value);
                    })
                    .then((res) => this.handleTask(res, "操作成功"))
                    .catch((error) => {
                        if (error.code === 2) {
                            this.handleTask({ error_msg: "开关状态配置的是无效值, 注意检查映射配置！" });
                        } else {
                            this.handleTask({ error_msg: "后台服务异常" });
                        }
                    });
            },
            // 挂牌
            handleSetSign() {
                const otherLabels = ["test_normal", "test_control", "test_scheme"];
                const map = {};
                this.form.gp.signs.filter(x => !otherLabels.includes(x)).forEach((i) => (map[i] = true));
                fetch(`/api/v3/dcpm/control/${params.crid}/sign`, {
                    method: "post",
                    body: JSON.stringify({
                        statusId: params.srid,
                        value: JSON.stringify(map),
                    }),
                }).then((res) => {
                    if (res.status === 200) {
                        res.error_code = "00"
                        this.handleTask(res, "操作成功");
                    } else {
                        this.handleTask({ error_msg: "操作失败" });
                    }
                })
            },
            // 摘牌操作
            handleRmSign() {
                // getLables(params.srid)
                //   .then((labels) => {
                //     delete labels[params.sign];
                //     delete labels.real_value;
                //     return setSign(
                //       labels.blocked,
                //       Object.keys(labels).filter((v) => labels[v])
                //     );
                //   })
                //   .then((res) => this.handleTask(res, "操作成功"))
                //   .catch((e) => {
                //     this.handleTask({ error_msg: "后台服务异常" });
                //   });
                var signStr = JSON.stringify({
                    [params.sign]: false
                });
                fetch(`/api/v3/dcpm/control/${params.crid}/sign?statusId=${params.srid}&value=${signStr}`, {
                        method: "delete",
                    }).then((res) => {
                        if (res.status === 200) {
                            res.error_code = "00"
                            this.handleTask(res, "操作成功");
                        } else {
                            this.handleTask({ error_msg: "操作失败" });
                        }
                    })
                    .catch((error) => {
                        this.handleTask({ error_msg: "后台服务异常" });
                    });
            },
            // 封锁解锁
            handleSetBlockSign() {
                if (!params.lock) {
                    fetch(`/api/v3/dcpm/control/${params.crid}/block`, {
                            method: "post",
                            body: JSON.stringify({
                                statusId: params.srid,
                                value: JSON.stringify({ blocked: true }),
                            }),
                        }).then((res) => {
                            if (res.status === 200) {
                                res.error_code = "00"
                                this.handleTask(res, "操作成功");
                            } else {
                                this.handleTask({ error_msg: "操作失败" });
                            }
                        })
                        .catch((e) => {
                            this.handleTask({ error_msg: "后台服务异常" });
                        });
                } else {
                    fetch(`/api/v3/dcpm/control/${params.crid}/block?statusId=${params.srid}&value=${JSON.stringify({blocked:false})}`, {
                            method: "delete",
                        }).then((res) => {
                            if (res.status === 200) {
                                res.error_code = "00"
                                this.handleTask(res, "操作成功");
                            } else {
                                this.handleTask({ error_msg: "操作失败" });
                            }

                        })
                        .catch((error) => {
                            this.handleTask({ error_msg: "后台服务异常" });
                        });
                }

            },
            // 遥控执行; select:true => 遥控预置
            handleDoSetting(select) {
                let value = this.form.yk.task;
                if (value) {
                    let task;
                    this.errInfo = {
                        step: this.currentStep,
                        err: "loading",
                        msg: "操作中...",
                    };

                    if (select) {
                        this.preSettingResult = "padding";
                    } else {
                        this.doSettingResult = "padding";
                    }
                    if (this.device.ctrl) {
                        let type = '';
                        if (params.isControlSimulation) {
                            // 模拟遥控
                            type = select ? "test_select" : "test_operater";
                        } else {
                            type = select ? "select" : "operater";
                        }
                        // 选控
                        task = doSetting(
                            this.device.ctrl[select ? "select" : "operater"],
                            value,
                            type,
                            this.form.jhr.usr,
                        );
                    } else {
                        let type = undefined;
                        if (params.isControlSimulation) {
                            // 模拟遥控
                            type = "test_operater";
                        }
                        // 直控
                        task = doSetting(params.crid, value, type);
                    }
                    console.log('------------task:');
                    console.log(task);
                    task
                        .then((res) => {
                            this.handleTask(res, "操作成功");
                            return res;
                        })
                        .then((res) => {
                            console.log(res);
                            if (res.error_code === '00') {
                                if (select) {
                                    this.preSettingResult = "success";
                                    this.setCheckResultMaps("遥控预置");
                                } else {
                                    this.doSettingResult = "success";
                                    this.setCheckResultMaps("遥控执行");
                                }
                            } else {
                                if (select) {
                                    this.preSettingResult = "fail";
                                } else {
                                    this.doSettingResult = "fail";
                                }
                            }

                        })
                        .catch((e) => {
                            if (select) {
                                this.preSettingResult = "fail";
                            } else {
                                this.doSettingResult = "fail";
                            }
                            console.log(e);
                        });
                } else {
                    this.handleTask({
                        error_code: "",
                        error_msg: "请选择操作选项",
                    });
                }
            },

            finalStep() {
                switch (this.type) {
                    case "挂牌":
                        return this.handleSetSign();
                    case "摘牌":
                        return this.handleRmSign();
                    case "遥控":
                        return this.handleDoSetting();
                    case "闭锁/解锁":
                        return this.handleSetBlockSign();
                    case "人工置数":
                        return this.handleSetNumber();
                }
            },
        },
        mounted() {
            // fetch("/api/v3/dcpm/control/signs:list").then((res) => {
            //   console.log(res);
            // });
            if (params.type !== 'zs' && !params.crid) {
                return;
            }
            if (params.type === 'zs' && !params.srid) {
                return;
            }
            getResourceItems({
                field: "resource_id",
                operator: "eq",
                value: params.type === 'zs' ? params.srid : params.crid,
            }).then((res) => {
                console.log(res);
                const device = res[0];
                if (device) {
                    const name = device.name;
                    const mapperStr = (device.mapper || "");
                    let mapper = [];
                    if (mapperStr.indexOf('=') !== -1) {
                        mapper = mapperStr.split(";")
                            .filter((v) => v)
                            .map((v) => {
                                var m = v.split("=");
                                this.mapperMap[m[0]] = m[1];
                                return m;
                            });
                    }
                    const control_flow = device.control_flow ?
                        device.control_flow
                        .split(";")
                        .filter((v) => v)
                        .map((v) => {
                            return v.split("=");
                        })
                        .reduce((v, r) => {
                            v[r[0]] = device.parent_id + "_" + r[1];
                            return v;
                        }, {}) :
                        null;
                    this.device = {
                        location: device._location_translated,
                        name: name,
                        mapper: mapper,
                        ctrl: control_flow,
                    };

                    getRealValue(params.srid).then((res) => {
                        const list = mapper ? mapper.filter((x) => x[0] != res) : [];
                        if (list.length) {
                            this.form.yk.task = getReverStatus(res, "control");
                            getPreConditionList(this.form.yk.task).then((data) => {
                                this.preConditionList = data.steps;
                                data.steps.forEach((item) => {
                                    this.$set(this.checkPreConditionReustMaps, item.key, "");
                                });
                            });
                        }
                    });
                    targetResize();
                }
            });
            this.nextStep();
        },
    });
});