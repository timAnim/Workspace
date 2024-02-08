// 移动的位置
const x_dis = 20;
const y_dis = 0;

const fs = require("fs");
const fl = process.argv[2];
const path = require('path')
let src_str = fs.readFileSync(fl).toString("utf8");
var src_obj = JSON.parse(src_str);

let name = path.basename(fl)
let ext = path.extname(fl)
name = name.replace(ext, '')

movePos(src_obj, x_dis, y_dis);

fs.writeFileSync(name + "_out.xscene", JSON.stringify(src_obj));

function movePos(obj, dx, dy) {
  for (let ele in obj) {
    if (typeof obj == "object") {
      if (
        ele == "position" ||
        ele == "pos" ||
        ele == "targetPos" ||
        ele == "target"
      ) {
        obj[ele].x = obj[ele].x + dx;
      }
      if (ele == "points") {
        for (let i = 0; i < obj[ele].length; i++) {
          obj[ele][i].x += dx;
          obj[ele][i].y += dy;
        }
      }
      movePos(obj[ele], dx, dy);
    }
  }
}
