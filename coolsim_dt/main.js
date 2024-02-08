var convert = require("xml-js");
let fs = require("fs");

let xml = fs.readFileSync("./blank_scene/Package.xml").toString("utf8");

var result1 = convert.xml2json(xml, { compact: false, spaces: 2 });

let xml2 = fs.readFileSync("./rack_scene/Package.xml").toString("utf8");

var result2 = convert.xml2json(xml2, { compact: false, spaces: 2 });

let res = {};
let attrName = "";
let attrVal = "";
let attrObj = "";

findNameInEles(JSON.parse(result2), res);

// 原始数据，结果对象，结果对象的父
function findNameInEles(obj, _res) {
  for (const key in obj) {
    // 结果对象的child属性
    if (key === "name" && obj[key] === "Name") {
      attrName = obj.elements[0].text;
    }

    if (key === "name" && obj[key] === "Value") {
      attrVal = obj.elements[0].text;
    }

    if (key === "elements") {
      attrObj = obj[key];
    }
  }
  _res.child = {};
  _res.key = attrName;
  _res.val = attrVal;
  for (let i = 0; i < attrObj.length; i++) {
    if (!attrObj[i].name) continue;
    findNameInEles(attrObj[i], _res.child);
  }
}
setTimeout(function () {
  fs.writeFileSync("./rack_key.json", JSON.stringify(res));
}, 6000);

// fs.writeFileSync("./blank_scenc.json", result1);
// fs.writeFileSync("./rack_scene.json", result2);
