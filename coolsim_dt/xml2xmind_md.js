const fs = require("fs");
const convert = require("xml-js");
const { Workbook, Topic, Marker, Zipper } = require("xmind");
const [workbook, marker] = [new Workbook(), new Marker()];

const topic = new Topic({
  sheet: workbook.createSheet("rack_scene", "rack_scene"),
});
const zipper = new Zipper({ path: "./tmp", workbook, filename: "byMdAlg" });

const xml = fs.readFileSync("./rack_scene/Package.xml").toString("utf8");

let res = convert.xml2json(xml, { compact: false, spaces: 2 });

// cs对象，elements，[0]
findNameInEles(JSON.parse(res).elements, "");

function findNameInEles(eles, _cid) {
  for (let i = 0; i < eles.length; i++) {
    let ele = eles[i];
    let obj = {};
    // 如果是comm对象，组装成obj
    if (ele.name == "Comm") {
      for (let j = 0; j < ele.elements.length; j++) {
        let key = ele.elements[j].name;
        switch (key) {
          case "Name":
            obj.name = ele.elements[j].elements[0].text;
            break;

          case "Value":
            obj.value = ele.elements[j].elements[0].text;
            break;

          case "Comms":
            obj.elements = ele.elements[j].elements;
            break;

          default:
            break;
        }
      }
    }
    if (obj.name && obj.name != _cid) {
      topic.on(topic.cid(_cid)).add({ title: obj.name });
      if (obj.value) topic.on(topic.cid()).add({ title: obj.value });
    }
    if (obj.elements) {
      findNameInEles(obj.elements, obj.name);
    }
  }
}

zipper
  .save()
  .then((status) => status && console.log("Saved ./tmp/byMdAlg.xmind"));
