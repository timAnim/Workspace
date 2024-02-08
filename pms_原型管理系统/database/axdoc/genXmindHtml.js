const fs = require("fs")
const path = require("path")
const child_process = require("child_process")

const cheerio = require('cheerio');
const crawler = require("./crawler")
const addXmindStyle = require("./addXmindStyle")
let DIST_PATH

// 全局设置
module.exports = genXmindHtml

function genXmindHtml(SRC_PATH) {
    crawler(SRC_PATH)
        .then(proj => {
            let res_arr = []
            res_arr.push({
                "id": "root",
                "isroot": true,
                "topic": "功能清单"
            })

            proj.proj_sitemap
                .filter(_tpc => _tpc.pageName == "功能需求")[0]
                .children
                .forEach(func => addChildren("root", func))

            function addChildren(parentid, _tpc) {
                let id = _tpc.id || genId()
                let topic = {
                    id,
                    parentid,
                    topic: _tpc.pageName.replace(/^p\d\d/, '')
                }

                res_arr.push(topic)

                if (!_tpc.children || !_tpc.children.length) return false
                _tpc.children.forEach(child => {
                    addChildren(id, child)
                })
            }

            function genId() {
                return Math.floor(Math.random() * 100000) + ''
            }

            let filename = `${proj.proj_info.proj_name}_页面架构.html`
            filename = filename.replace(/\(|\)|\s/ig, '_')
            DIST_PATH = path.join(SRC_PATH, '..', filename)

            fs.writeFileSync(DIST_PATH, addXmindStyle(res_arr))

            let cmd = "start " + DIST_PATH
            child_process.exec(cmd, (err, std, stderr) => {
                console.log(std)
            })
        })
}

if (!module.parent && process.argv[2]) genXmindHtml(process.argv[2])