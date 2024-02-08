const fs = require("fs");
const xlsx = require("better-xlsx");
const parseXlsx = require("node-xlsx").default;
const fl_path = "./src/202305-1.txt";
const atend_path = "./src/考勤.xlsx";
const pbc_path = "./src/pbc.xlsx";
const fl_name = fl_path.split("/").pop().split(".")[0];
const compareStrs = require("./compareStrs");
const TP = require("./cnfg");

// 最终的统计结果
let stat = {};

// 最终结果的对象
let resultObj = {};
let projectObj = {};

// 人员列表
let staffReg = new RegExp(/陈峥|匡原|唐文洁|文扬思|咸明阳|余丽|赵嘉/gi);
let staffLv = [
  ["陈峥", 1.25],
  ["匡原", 1.25],
  ["唐文洁", 1.25],
  ["文扬思", 1],
  ["咸明阳", 1],
  ["余丽", 1],
  ["赵嘉", 1],
];

// 统计表头
let stat_th = [
  "人员",
  "标准工时",
  "职级系数",
  "工作量得分",
  "正常工时",
  "应出工时",
  "出勤得分",
  "质量",
  "质量得分",
  "总得分",
  "排名",
  "评语",
];

// 晨会表头
const meeting_th = ["人员", "任务", "输出物", "标准工时"];

// 计算工时的列表
let formulaArr = {
  工作量得分: ["标准工时/职级系数", "向低职级倾斜"],
  出勤得分: ["(出勤-应出)/16", "向额外工作倾斜"],
  质量得分: ["绩效-85", "质量以85为标准"],
  总得分: ["工作量+出勤+质量", "总分以70分为满分"],
};

// 日期表达式
let dateReg = new RegExp(/\d\d\d\d-\d\d-\d\d/gi);

//任务分隔符
let taskReg = new RegExp(/、|，|；|\s/gi);

//工作量分隔符
let loadReg = new RegExp(/[x|×]/gi);

let txt = fs.readFileSync(fl_path, "utf8");

// 评语模板
let comments = [
  ["维度", "及格线", "优秀线", "前缀", "差评语", "中评语", "优评语"],
  [
    "工作量",
    30,
    60,
    "效率和时间利用",
    "要加强；",
    "良好；",
    "优秀，承担大量工作；",
  ],
  ["积极性", 1, 2, "工作态度和积极性", "要加强；", "良好；", "优秀；"],
  [
    "质量",
    -5,
    0,
    "交付物的质量",
    "要加强；",
    "良好；",
    "优秀，得到市场和产品高度认可；",
  ],
  [
    "总评语",
    35,
    60,
    "总体评价：",
    "一般，建议面谈；",
    "良好，继续保持；",
    "优秀，建议绩效奖励；",
  ],
];

// 项目列表
let projs = {};

// 此处为输出的excel表
const file = new xlsx.File();
const sheet = file.addSheet("晨会");
const sheet2 = file.addSheet("统计");
const sheet3 = file.addSheet("项目");

// 文本转化成数组
let txtArr = txtTransform(txt);

// 考勤矩阵
let attendArr = [];
if (fs.existsSync(atend_path)) attendArr = getAttendArr(atend_path);
else attendArr = getAttendArr();

// PBC矩阵
let pbcArr = [];
if (fs.existsSync(pbc_path)) pbcArr = getPbcArr(pbc_path);
else pbcArr = getPbcArr();

// 文本处理
dataMine();

// 数据统计并表
dataAnalysis();

// 晨会表导出到文件
meeting2excel();

// 统计结果转化为excel
stat2excel();

proj2excel();

projSum();
// return console.log(projs);

file
  .saveAs()
  .pipe(fs.createWriteStream("./res/" + fl_name + ".xlsx"))
  .on("finish", () => {
    fs.openSync("./res/" + fl_name + ".xlsx");
    console.log("Done.");
  });

// 处理文本变成数组
function txtTransform(txt) {
  // 去掉段内换行
  txt = txt.replace(/\r|\u0085|\u2028|\u2029/gi, "");

  // 切成数组
  arr = txt.split(/\n/);
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
        // getProjName(loadArr[0]);

        for (const key in TP) {
          if (new RegExp(key).test(task)) {
            resultObj[dt][person].push([
              task.replace(/\s/g, ""),
              TP[key].t,
              TP[key].a * parseFloat(loadArr[1]),
            ]);

            projName = checkProjName(loadArr[0]);
            if (!projectObj[projName]) projectObj[projName] = 0;
            projectObj[projName] += TP[key].a * parseFloat(loadArr[1]);

            return;
          }
        }
      });
    }
  });
}

function checkProjName(str) {
  // for (const key in TP) {
  //   _str = _str.replace(TP[key].t, "");
  // }
  if (str) str = str.replaceAll(/[\d]+|[a-zA-Z]+|[\.]|[《]|[》]/gi, "");
  return str;
}

function projSum() {
  let res;
  for (const i in projectObj) {
    for (const j in projectObj) {
      res = getProjName(i, j);
      if (res.length > 2) projs[res] = 0;
    }
  }

  for (const key in projectObj) {

    // projectObj
  }
}

function getProjName(a, b) {
  // console.log(a, b);
  let tmp;
  if (a && b) {
    tmp = compareStrs(a, b);
    if (tmp.length > 2) return tmp;
  }
  return false;
}

function getAttendArr(atend_path) {
  if (!atend_path) return [];
  const ws = parseXlsx.parse(atend_path)[0].data;
  const cols_reg = new RegExp(/姓名|正常工时|应出工时/);
  let rows = [];
  let start_row;

  ws.forEach((r, i) => {
    r.forEach((c, j) => {
      // 只保留三列
      if (cols_reg.test(c)) {
        // 去掉表头
        if (!start_row) start_row = i;
        rows.push(j);
      }
    });
  });

  let res = [];
  ws.forEach((r, i) => {
    // 去掉表头
    if (i <= start_row) return false;
    r.forEach((c, j) => {
      rows.forEach((row) => {
        // 放到3x3数组中
        if (j == row) res.push(c);
      });
    });
  });

  let resArr = [];
  while (res.length > 0) {
    resArr.push(res.splice(0, 3));
  }
  return resArr;
}

function getPbcArr(pbc_path) {
  if (!pbc_path) return [];

  const ws = parseXlsx.parse(pbc_path)[0].data;

  const cols_reg = new RegExp(/姓名|绩效分数/);
  let rows = [];
  let res = [];
  let start_row;

  ws.forEach((r, i) => {
    r.forEach((c, j) => {
      // 只保留两列
      if (cols_reg.test(c)) {
        // 去掉表头
        if (!start_row) start_row = i;
        rows.push(j);
      }
    });
  });

  for (const i in ws) {
    // 去掉表头
    if (i <= start_row) continue;
    if (ws[i].length <= 1) continue;
    res.push(ws[i][rows[0]]);
    res.push(ws[i][rows[1]]);
  }

  let resArr = [];

  while (res.length > 0) {
    resArr.push(res.splice(0, 2));
  }

  return resArr;
}

function dataAnalysis() {
  let sort_arr = [];

  // 对晨会的输出进行加和
  for (const mdt in resultObj) {
    for (const mperson in resultObj[mdt]) {
      resultObj[mdt][mperson].forEach((tsk) => {
        if (!stat[mperson]) stat[mperson] = [0];
        stat[mperson][0] += tsk[2];
      });
    }
  }

  for (const mperson in stat) {
    // 在职级表里并表
    for (const i in staffLv) {
      if (staffLv[i][0] == mperson) {
        stat[mperson].push(staffLv[i][1]);
        stat[mperson].push(stat[mperson][0] / stat[mperson][1]);
      }
    }

    // 在考勤里并表
    if (attendArr.length) {
      for (const i in attendArr) {
        if (attendArr[i][0] == mperson) {
          stat[mperson].push(attendArr[i][1]);
          stat[mperson].push(attendArr[i][2]);
          stat[mperson].push(
            ((attendArr[i][1] - attendArr[i][2]) / 16).toFixed(2) * 1
          );
        }
      }
    } else {
      stat_th.forEach((th, i) => {
        if (
          th == "应出工时" ||
          th == "正常工时" ||
          th == "出勤得分" ||
          th == "总得分"
        )
          stat_th.splice(i, 1);
      });
    }

    // 在PBC里并表
    if (pbcArr.length) {
      for (const i in pbcArr) {
        if (pbcArr[i][0] == mperson) {
          if (!pbcArr[i][1]) pbcArr[i][1] = 80;
          stat[mperson].push(pbcArr[i][1]);
          stat[mperson].push((pbcArr[i][1] - 85).toFixed(2) * 1);
        }
      }
    } else {
      stat_th.forEach((th, i) => {
        if (th == "质量" || th == "质量得分" || th == "总得分")
          stat_th.splice(i, 1);
      });
    }

    if (pbcArr.length && attendArr.length) {
      // 添加汇总列
      stat[mperson].push(
        (stat[mperson][2] + stat[mperson][5] + stat[mperson][7]).toFixed(2) * 1
      );
    }

    sort_arr.push([mperson, stat[mperson][8]]);
  }

  sort_arr.sort((a, b) => {
    return b[1] - a[1];
  });

  // 排名并表
  for (const mperson in stat) {
    sort_arr.forEach((staff, i) => {
      if (staff[0] == mperson) {
        stat[mperson].push(i + 1);
        stat[mperson].push(getComment(stat[mperson]));
      }
    });
  }
}

function meeting2excel() {
  let row_th = sheet.addRow();
  meeting_th.forEach((th) => {
    row_th.addCell().value = th;
  });

  for (const mdt in resultObj) {
    const row = sheet.addRow();
    const cell = row.addCell();
    cell.value = mdt;

    for (const mperson in resultObj[mdt]) {
      resultObj[mdt][mperson].forEach((tsk) => {
        const _r = sheet.addRow();
        const _c = _r.addCell();
        _c.value = mperson;
        tsk.forEach((item) => {
          const _item = _r.addCell();
          _item.value = item;
        });
      });
    }
  }
}

function stat2excel() {
  // 标题行
  let row_stat_th = sheet2.addRow();
  stat_th.forEach((th) => {
    row_stat_th.addCell().value = th;
  });

  // 添加stat统计中的 所有数据
  staffLv.forEach((staff) => {
    for (const ps in stat) {
      if (ps == staff[0]) {
        const _r = sheet2.addRow();
        _r.addCell().value = ps;

        stat[ps].forEach((val) => {
          _r.addCell().value = val;
        });
      }
    }
  });

  // 添加说明
  sheet2.addRow();

  for (const fn in formulaArr) {
    let _r = sheet2.addRow();
    _r.addCell().value = fn;
    _r.addCell().value = formulaArr[fn][0];
    _r.addCell().value = formulaArr[fn][1];
  }
}

function proj2excel() {
  // 标题行
  let row_stat_th = sheet3.addRow();
  let th = ["项目名", "未修正工时"];
  th.forEach((th) => {
    row_stat_th.addCell().value = th;
  });

  // 添加stat统计中的 所有数据
  for (const key in projectObj) {
    const _r = sheet3.addRow();
    _r.addCell().value = key;
    _r.addCell().value = projectObj[key];
  }
}

function getComment(score) {
  let scores = ["工作量/积极性/质量", score[2], score[5], score[7], score[8]];
  let comment = "";

  comments.forEach((comm, i) => {
    scores.forEach((score, j) => {
      if (!i || i != j) return false;
      if (score <= comm[1]) comment += comm[3] + comm[4];
      else if (score > comm[1] && score <= comm[2])
        comment += comm[3] + comm[5];
      else if (score > comm[2]) comment += comm[3] + comm[6];
    });
  });

  return comment;
}
