// 加载模块
var fs = require('fs')
var path = require('path')
var cheerio = require('cheerio')
const crawler = require('./crawler.js')
const child_process = require("child_process")

var addXlsxStyle = require('./addXlsxStyle.js')
var table = '<table><tbody></tbody></table>'
let DIST_PATH

module.exports = genXlsx

function genXlsx(proj_path) {
    return crawler(proj_path)
        .then(proj => {

            var pages = proj.pages
            var $ = cheerio.load(table, {
                decodeEntities: false,
                xmlMode: true
            })

            addHeader($)

            pages.forEach(page => {
                addPage($, page)
                if (page.interactList) {
                    page.interactList.forEach((item, index) => {
                        addInteract($, item)
                    })
                }
            })

            // 在输入目录的同级输出
            let filename = `${proj.proj_info.proj_name}_FML.html`
            filename = filename.replace(/\(|\)|\s/ig, '_')
            DIST_PATH = path.resolve(__dirname, '../public/files/output', filename)



            fs.writeFileSync(DIST_PATH, addXlsxStyle($.html()))

            console.log(addXlsxStyle($.html()).length, DIST_PATH)

            return Promise.resolve("api/files/output/" + filename)

        }).catch(err => {
            console.log(err)
        })
}

if (!module.parent && process.argv[2]) genXlsx(process.argv[2])

function getDescriptionHeight(des) {
    var lines = 1
    for (var m = des.length - 1; m >= 0; m--) {
        if (des.charAt(m) == '\n') {
            lines++
        }
    }
    lines += Math.floor(des.length / 24)
}

function addHeader($) {
    $('tbody').append(`
      <tr height = '44' style='background: #e0e0e0'>
        <td width='64'>页面编号</td>
        <td width='160'>页面名</td>
        <td width='80'>用例编号</td>
        <td width='240'>用例名</td>
        <td width='320'>说明</td>
      </tr>
    `)
}

function addPage($, page) {
    if (!page.pageId) return false
    $('tbody').append(`
      <tr height = '44' style='background: #fafafa;'>
        <td>${page.pageId}</td>
        <td>${page.pageName}</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    `)
}

function addInteract($, item) {
    var ht = getDescriptionHeight(item.interactDes)
    $('tbody').append(`
      <tr style= 'line-height: 32px; min-height:44px;'>
        <td></td>
        <td></td>
        <td style='color:${item.finished ? "#bdbdbd" : ""}'>${item.interactId}</td>
        <td style='color:${item.finished ? "#bdbdbd" : ""}'>${item.interactName}</td>
        <td style='color:${item.finished ? "#bdbdbd" : ""}'>${item.interactDes}</td>
      </tr>
    `)

}