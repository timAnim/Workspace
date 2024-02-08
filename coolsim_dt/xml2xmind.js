const fs = require("fs");
const convert = require("xml-js");
const { Workbook, Topic, Marker, Zipper } = require("xmind");
const [workbook, marker] = [new Workbook(), new Marker()];

const topic = new Topic({
  sheet: workbook.createSheet("rack_scene", "rack_scene"),
});
const zipper = new Zipper({ path: "./tmp", workbook, filename: "MyFirstMap" });

const xml = fs.readFileSync("./rack_scene/Package.xml").toString("utf8");

let res = convert.xml2json(xml, { compact: false, spaces: 2 });
let cid = "";

// cs对象，elements，[0]
findNameInEles(JSON.parse(res).elements[0], cid);

function findNameInEles(obj, _cid) {
  if (obj.name == "Comm") {
    // 一、去elements 里找Name属性
    let mName = findValByKey(obj, "Name");

    // 二、新建一个node节点
    mName = mName.elements[0].text;
    topic.on(topic.cid(_cid)).add({ title: mName });
    _cid = mName;

    let mVal = findValByKey(obj, "Value");
    if(mVal){
        mVal = mVal.elements[0].text;
        topic.on(topic.cid(_cid)).add({ title: mVal });
    }
  }

  //   三、去elements里找 Comms属性
  let comms = findValByKey(obj, "Comms");

  if (comms && comms.elements) {
    // 四、Comms 里 elements 遍历
    comms = comms.elements;

    console.log(comms);
    for (let i = 0; i < comms.length; i++) {
      findNameInEles(comms[i], _cid);
    }
  }
}

function findValByKey(eles, key) {
  eles = eles.elements;
  for (let i = 0; i < eles.length; i++) {
    if (eles[i].name == key) {
      return eles[i];
    }
  }
}

zipper
  .save()
  .then((status) => status && console.log("Saved ./tmp/MyFirstMap.xmind"));
