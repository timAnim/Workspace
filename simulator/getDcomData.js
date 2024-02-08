function getDcomData(_moduleKey, _groupBy, _id, _delay) {
    let url = "/api/flow/api/v1/bfm/instances/form/groupBy";
    let storageKey = "DcomData_" + _groupBy; //在全局缓存
    let delayTime = _delay ? _delay : 5000 //间隔默认5s
    let stamp = "DcomDataStamp" + _groupBy;

    // 此处考虑做字典
    // let disc = {
    //     "服务请求": "servicedesk",
    //     "事件管理": "incident",
    //     "维保管理": "overhaul",
    // }

    // let moduleKey = disc[_moduleKey];
    let groupBy = _groupBy;


    // 本地获取存储的数组
    window[storageKey] = window[storageKey] ? window[storageKey] : [];
    getData();

    // 返回全局变量里的值
    return window[storageKey][_id];

    function getData() {
        // 小于间隔不处理
        if (new Date().valueOf() - window[stamp] < delayTime) return false

        postHttp({
                url,
                params: {
                    moduleKey: _moduleKey,
                    "search": {},
                    groupBy: [groupBy],
                    "operation": "count"
                },
                success: function(result) {
                    console.log(window[stamp]);
                    if (!result.data[_groupBy]) {
                        window[storageKey] = [0];
                    } else {
                        let _arr = []
                        result.data[_groupBy].forEach((_ele, i) => {
                            _arr[i] = _ele.value
                        });
                        window[storageKey] = _arr;
                    }
                },
                error: function(result) {
                    console.log(result);
                }
            })
            // 重新开始计时
        window[stamp] = new Date().valueOf()
    }

    function postHttp({
        url,
        params,
        success,
        error
    }) {
        let xhr = new XMLHttpRequest();
        xhr.open('post', url, true);

        xhr.setRequestHeader("content-type", "application/json;charset=utf-8")
        xhr.send(JSON.stringify(params));
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200 || xhr.status == 304) {
                    success(JSON.parse(xhr.responseText))
                } else {
                    error('请求失败')
                }
            }
        }
    }

}