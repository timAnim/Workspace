const fs = require("fs")

const JSZip = require("jszip")

const { loadFromXMind, SnowbrushRenderer } = require("xmind-viewer")

return

new JSZip()
    .loadAsync("./功能逻辑图.xmind")
    .then(zip => {
        console.log(zip)
        loadFromXMind(zip)
            .then(data => {
                const renderer = new SnowbrushRenderer(data.sheets)
                return renderer.render({ sheetIndex: 0 })
            })
            .then(svg => {
                fs.writeFileSync("mind.svg", svg)
            })
    })