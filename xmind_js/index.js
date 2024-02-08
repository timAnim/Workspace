const { Workbook, Topic, Marker, Zipper } = require("xmind")

const [workbook, marker] = [new Workbook(), new Marker()]

const topic = new Topic({
    sheet: workbook.createSheet("功能逻辑图", "功能逻辑图")
})
workbook.theme("功能逻辑图", "business")

const zipper = new Zipper({
    path: "./",
    workbook,
    filename: "功能逻辑图"
})

topic.add({
    title: "一级有备注"
})

topic.on(topic.cid( /*此处默认是最近添加的一个topic*/ ))
    .add({
        title: "subtitle 1",
    })
    .add({
        title: "subtitle 2",
    })
    .note("this is a note")
    .on(topic.cid("subtitle 1"))
    .marker(marker.week("fri"))
    .summary({
        title: "sum",
        edge: topic.cid("subtitle 2")
    })

zipper.save()
    .then(status => status && console.log("end"))