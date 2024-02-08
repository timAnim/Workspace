var fs = require('fs')
var parseAx = require("./parseAxure.js")
var htJson = require("./desc.json")
var attr = htJson.pages[0].attributes
var htData = attr["i_" + attr.resource_id].data.d
var htPageCommon = attr.page_common

// return console.log(htData,htPageCommon )

var { pages,
    sitemap,
    objects,
    styles,
    obj_data } = parseAx()


var cpEl = function () {
    return JSON.parse(JSON.stringify(htPageCommon["C8EA3EDC14600001D0C51942189D9000"]))
}

var cpA = function () {
    return JSON.parse(JSON.stringify(htData[0]))
}

var i = 0
var txt=''

for (const key in objects) {
    // {a5bda7422cef404d81cdd19d6f18340a:{scriptId: "u0"}}
    const id = objects[key].scriptId

    txt = obj_data.filter(obj => obj.id == key)[0].label
    var dom = styles["#" + id]
    var dom_label = styles["#" + id + "_div"]
    var dom_txt = styles["#" + id + "_text"]
    htData[i] = cpA()
    if (!dom_label || !dom) continue;
    // 元素的映射
    htData[i].p.height = parseInt(dom.height)
    htData[i].p.width = parseInt(dom.width)
    htData[i].p.tag = key
    htData[i].p.position.x = parseInt(dom.left) + parseInt(dom.width) / 2
    htData[i].p.position.y = parseInt(dom.top) + parseInt(dom.height) / 2
    htData[i].i = i
    htData[i].s["label.rotation"] = 0

    // 背景的映射
    htPageCommon[key] = cpEl()

    htPageCommon[key].a["body.border.color"].theme.default.value = dom_label["border-color"]
    htPageCommon[key].a["body.border.radius"].value = parseInt(dom_label["border-radius"])
    htPageCommon[key].a["body.border.style"].value = dom_label["border-style"]
    htPageCommon[key].a["body.border.width"].value = parseInt(dom_label["border-width"])

    htPageCommon[key].a["label.background.color"].theme.default.subList[0].rightValue = dom_label["background-color"]
    // htPageCommon[key].a["label.text"].subList[0].rightValue = txt

    htPageCommon[key].a["node.height"].value = parseInt(dom.height)
    htPageCommon[key].a["node.width"].value = parseInt(dom.width)
    htPageCommon[key].a["node.position.x"].value = parseInt(dom.left) + parseInt(dom.width) / 2
    htPageCommon[key].a["node.position.y"].value = parseInt(dom.top) + parseInt(dom.height) / 2
    htPageCommon[key].a["node.rotation"].value = 0
    htPageCommon[key].a["node.opacity"].value = 1

    i++
}

fs.writeFileSync("./output.json", JSON.stringify(htJson))

// console.log(htJson.pages[0].attributes)