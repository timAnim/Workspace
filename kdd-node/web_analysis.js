// ==UserScript==
// @name         日报
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://doc.weixin.qq.com/doc/w3_AOYAEwaKABEbCppMH1KTzSBTpdZp5?scode=AGEAIQdLAA0RGoeyKmAOYAEwaKABE
// @icon         https://www.google.com/s2/favicons?sz=64&domain=qq.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  var inp = document.createElement("textarea");
  inp.style =
    "position:absolute; z-index: 999; height: 100px; width: 100px; background: #eeeeee; bottom: 16px; right: 16px;";
  inp.onblur = function getweekreport(e) {
    let date_scope = getDateScope();
    var txt = this.value;

    // 最终结果的对象
    let resultObj = {};

    // 人员列表
    let staffReg = new RegExp(/陈峥|匡原|唐文洁|文扬思|咸明阳|余丽|赵嘉/gi);

    // 晨会表头
    const meeting_th = ["人员", "任务", "输出物", "标准工时"];

    // 日期表达式
    let dateReg = new RegExp(/\d\d\d\d-\d\d-\d\d/gi);

    //任务分隔符
    let taskReg = new RegExp(/、|，|；|\s/gi);

    //工作量分隔符
    let loadReg = new RegExp(/[x|×]/gi);

    // 项目列表
    let projs = {};

    // 文本转化成数组
    let txtArr = txtTransform(txt);

    let TP = {
      "》": {
        t: "文档",
        a: 0.5,
      },
      界面设计: {
        t: "效果图",
        a: 1,
      },
      系统图: {
        t: "效果图",
        a: 1,
      },
      UI: {
        t: "效果图",
        a: 1,
      },
      组件: {
        t: "组件",
        a: 1,
      },
      组态: {
        t: "组态",
        a: 0.5,
      },
      模型: {
        t: "设备建模",
        a: 0.5,
      },
      界面: {
        t: "效果图",
        a: 1,
      },
      建模: {
        t: "建模",
        a: 0.5,
      },
      渲染图: {
        t: "设备建模",
        a: 0.5,
      },
      效果图: {
        t: "效果图",
        a: 1,
      },
      图标: {
        t: "图标",
        a: 0.5,
      },
      原型: {
        t: "原型",
        a: 0.5,
      },
      素材: {
        t: "素材",
        a: 0.5,
      },
      贴图: {
        t: "素材",
        a: 0.5,
      },
      剪辑: {
        t: "剪辑",
        a: 1,
      },
      录屏: {
        t: "录屏",
        a: 0.5,
      },
      动画: {
        t: "动画",
        a: 2,
      },
    };

    // 文本处理
    dataMine();

    genWeekreport();

    function genWeekreport() {
      let report = [];
      date_scope.forEach((date) => {
        if (resultObj[date]) {
          let task_txt = "";
          resultObj[date]["陈峥"].forEach((task) => {
            task_txt += task[0] + "; ";
          });
          report.push(`${date}: ${task_txt}`);
        }
      });

      let report_txt = "";

      console.log(report.join(""));
      return report;
    }

    // 处理文本变成数组
    function txtTransform(txt) {
      // 去掉段内换行
      txt = txt.replace(/\r|\u0085|\u2028|\u2029/gi, "");

      // 切成数组
      let arr = txt.split(/\n/);
      arr.forEach((str, i) => {
        // 去掉今日
        arr[i] = str.replace(new RegExp("【昨天】", "g"), "");
        if (/【今日】/.test(str) || !str) arr.splice(i, 1);
      });
      return arr;
    }

    function dataMine() {
      let dt, person, taskArr, loadArr;
      txtArr.forEach((str) => {
        //说明是日期行
        if (dateReg.test(str)) {
          resultObj[str] = {};
          dt = str;
        }

        // 说明是人员行
        if (staffReg.test(str)) {
          person = str.replace(/\s/g, "");
          resultObj[dt][person] = [];
        }

        // 说明是任务行
        let projName = "";
        if (loadReg.test(str)) {
          taskArr = str.split(taskReg);
          taskArr.forEach((task, i) => {
            loadArr = task.split(loadReg);
            if (/%/.test(loadArr[1])) return false;
            if (!loadArr[1]) return false;

            for (const key in TP) {
              if (new RegExp(key).test(task)) {
                resultObj[dt][person].push([
                  task.replace(/\s/g, ""),
                  TP[key].t,
                  TP[key].a * parseFloat(loadArr[1]),
                ]);

                return;
              }
            }
          });
        }
      });
    }

    function getDateScope() {
      let date_scope = getLatest();
      let now_day = new Date().getDay();
      let len = 0;
      // 从今天到上个周一

      if (now_day <= 5) {
        // 如果没到周五
        len = now_day;
        date_scope = date_scope.slice(7 - len);
      } else {
        // 到周五
        len = 5;
        date_scope = date_scope.slice(0, 5);
      }
      return date_scope;
    }

    function getLatest() {
      // 创建一个空数组来存储日期
      let dates = [];

      // 获取当前日期
      let now = new Date();

      // 循环获取最近 7 天的日期
      for (let i = 0; i < 7; i++) {
        // 获取当前日期的时间戳
        let timestamp = now.getTime();

        // 计算 i 天前的时间戳
        let dayTimestamp = 24 * 60 * 60 * 1000; // 一天的毫秒数
        let iDayAgoTimestamp = timestamp - i * dayTimestamp;

        // 转换为日期对象
        let date = new Date(iDayAgoTimestamp);

        // 格式化日期为 "yyyy-MM-dd" 的字符串并存入数组
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        dates.push(year + "-" + month + "-" + day);
      }

      // 打印日期数组
      // console.log(dates);
      dates.reverse();
      return dates;
    }
  };
  document.body.appendChild(inp);
  // Your code here...
})();
