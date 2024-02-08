var nj = require("jsnumpy");
const fs = require("fs");
const path = require("path");
const jsonrawtoxlsx = require('jsonrawtoxlsx');

const report_txt = fs
  .readFileSync(path.resolve(__dirname, "src", "report.txt"))
  .toString("utf8");

let report_flatten = report_txt.split(/[(\r\n)\r\n]+/);

// report_flatten = report_flatten.slice(0, 252);

let res_arr = arr1to2(report_flatten, 5);

const buffer = jsonrawtoxlsx(res_arr);
fs.writeFileSync('./2023-7月.xlsx', buffer, 'binary');

function arr1to2(arr, number) {
  var arr2 = [];
  let len = arr.length;
  for (let i = 0, j = 0; i < len; i += number, j++) {
    arr2[j] = arr.splice(0, number);
  }
  return arr2;
}


