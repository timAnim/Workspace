var fs = require("fs");
var path = require("path");
var express = require("express");
var router = express.Router();
var output = require("better-xlsx");
var jwt = require("jwt-simple");

router.post("/generate-week-report", (req, res) => {
  const PATH = path.resolve(__dirname, "../public/files/output/");
  const RELA = "api/files/output/";
  var dstPath, resPath, excel, reqData, cuser;

  // 获取用户的姓名
  var token = req.headers.token;
  if (token) {
    var payload = jwt.decode(token, "ued");
    cuser = payload.name;
  } else {
    cuser = "";
  }

  // 设置文件的名称
  var filename = `W${req.body.week}_${req.body.start}至${
    req.body.end
  }_周工作总结_${cuser}.xlsx`;

  // 边框颜色
  var border = function (cell) {
    cell.style.border.top = "thin";
    cell.style.border.topColor = "ff9e9e9e";
    cell.style.border.left = "thin";
    cell.style.border.leftColor = "ff9e9e9e";
    cell.style.border.bottom = "thin";
    cell.style.border.bottomColor = "ff9e9e9e";
    cell.style.border.right = "thin";
    cell.style.border.rightColor = "ff9e9e9e";
  };

  var h1Style = new output.Style();
  h1Style.align.v = "center";
  h1Style.align.h = "center";
  h1Style.font.size = 18;

  var h2Style = new output.Style();
  h2Style.align.v = "center";
  h1Style.align.h = "center";
  h2Style.font.color = "ffffff";
  h2Style.font.bold = true;
  h2Style.fill.patternType = "solid";
  h2Style.fill.bgColor = "ff000000";
  h2Style.fill.fgColor = "009e9e9e";

  var pStyle = new output.Style();
  pStyle.align.v = "center";
  pStyle.align.h = "left";

  var getDataSync = function () {
    var getData = new Promise((resolve, reject) => {
      dstPath = path.join(PATH, filename);
      resPath = RELA + filename;
      reqData = req.body.data;
      resolve();
    });
    return getData;
  };

  var generateFile = function () {
    var printDoc = new Promise((resolve, reject) => {
      excel = new output.File();
      const nsheet = excel.addSheet("第" + req.body.week + "周");
      // 下面是excel
      const row_1 = nsheet.addRow();
      const row_2 = nsheet.addRow();
      const row_3 = nsheet.addRow();
      row_1.setHeightCM(1);
      row_2.setHeightCM(1);
      row_3.setHeightCM(1);

      const cell_1_1 = row_1.addCell();
      const cell_1_2 = row_1.addCell();
      const cell_1_3 = row_1.addCell();
      const cell_1_4 = row_1.addCell();

      cell_1_1.value = req.body.start + "至" + req.body.end + "周工作总结";
      cell_1_1.hMerge = 2;
      cell_1_1.vMerge = 1;
      cell_1_1.style = h1Style;

      cell_1_4.value = "第" + req.body.week + "周";
      cell_1_4.style = pStyle;

      const cell_2_1 = row_2.addCell();
      const cell_2_2 = row_2.addCell();
      const cell_2_3 = row_2.addCell();
      const cell_2_4 = row_2.addCell();

      cell_2_4.value = cuser;
      cell_2_4.style = pStyle;

      const cell_3_1 = row_3.addCell();
      const cell_3_2 = row_3.addCell();
      const cell_3_3 = row_3.addCell();
      const cell_3_4 = row_3.addCell();

      cell_3_1.value = "本周项目";
      cell_3_2.value = "完成状态";
      cell_3_3.value = "下周计划";
      cell_3_4.value = "存在问题";

      cell_3_1.style = h2Style;
      cell_3_2.style = h2Style;
      cell_3_3.style = h2Style;
      cell_3_4.style = h2Style;

      for (var i = reqData.length - 1; i >= 0; i--) {
        const row_task = nsheet.addRow();
        row_task.setHeightCM(1);

        const cell_1 = row_task.addCell();
        cell_1.value = reqData[i].project;
        cell_1.style = pStyle;

        // 第二行
        const cell_2 = row_task.addCell();
        cell_2.value = reqData[i].state;
        cell_2.style = pStyle;

        // 第二行
        const cell_3 = row_task.addCell();
        cell_3.value = reqData[i].plan;
        cell_3.style = pStyle;

        const cell_4 = row_task.addCell();
        cell_4.value = reqData[i].problem;
        cell_4.style = pStyle;

        var cols = nsheet.cols;
        var rows = nsheet.rows;
        for (var c = cols.length - 1; c >= 0; c--) {
          nsheet.col(c).width = 30;
          if (c === 1 || c === 3) nsheet.col(c).width = 15;
          for (var r = rows.length - 1; r >= 0; r--) {
            border(nsheet.cell(r, c));
          }
        }
      }
      resolve();
    });
    return printDoc;
  };

  var writeXlsxSync = () => {
    var writeXlsx = new Promise((resolve, reject) => {
      excel
        .saveAs()
        .pipe(fs.createWriteStream(dstPath))
        .on("finish", () => {
          resolve();
        });
    });
    return writeXlsx;
  };

  getDataSync()
    .then(() => {
      return generateFile();
    })
    .then(() => {
      return writeXlsxSync();
    })
    .then(() => {
      res.send({
        resPath: resPath
      });
    })
    .catch(err => {
      next(err)
    })
});

module.exports = router;