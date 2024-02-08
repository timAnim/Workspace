const fs = require("fs");
const path = require("path");
const convert = require("xml-js");
const { Workbook, Topic, Marker, Zipper } = require("xmind");
const [workbook, marker] = [new Workbook(), new Marker()];

function json2xmind(json_path) {
  let obj = fs.readFileSync(json_path);
  obj = JSON.parse(obj);

  let fname = path.basename(json_path, ".json");

  const topic = new Topic({
    sheet: workbook.createSheet("sheet", fname),
  });

  const zipper = new Zipper({
    path: "./tmp",
    workbook,
    filename: fname,
  });

  let eles = obj.elements;

  for (let i = 0; i < eles.length; i++) {
    let ele = eles[i];
    // 属性是否是ele
    if (ele.name == "Comms") {
      // ele属性
      topic.on(topic.cid(fname)).add({ title: "Comms" });

      // Comms 里 elements 遍历
      if (ele && ele.elements) {
        ele = ele.elements;
        for (let j = 0; j < ele.length; j++) {
          let child = ele[j].elements[0];
          topic.on(topic.cid("Comms")).add({ title: child.name });

          if (child.elements[0].text) {
            topic
              .on(topic.cid(child.name))
              .add({ title: child.elements[0].text });
          }
        }
      }
    } else {
      // 非ele属性
      topic.on(topic.cid(fname)).add({ title: ele.name });
      if (ele.elements[0].text) {
        topic.on(topic.cid()).add({ title: ele.elements[0].text });
      }
    }
  }

  zipper.save().then((status) => status && console.log("Saved"));
}

if (!module.parent && process.argv[2]) json2xmind(process.argv[2]);
