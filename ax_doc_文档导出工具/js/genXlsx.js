// 加载模块
var fs = require('fs');
var path = require('path');
var output = require('better-xlsx')
const crawler = require('./crawler.js');
const child_process = require("child_process")


module.exports = genXlsx

function genXlsx(proj_path) {

    crawler(proj_path)
        .then(proj => {
            var pages = proj.pages
            var excel = new output.File()
            var sheet = excel.addSheet('shee1')
            addHeader(sheet)
                // 下面是excel
            pages.forEach(page => {
                addPage(sheet, page)
                if (page.interactList) {
                    page.interactList.forEach(interact => {
                        addInteract(sheet, interact)
                    })
                }
            })

            let filename = `${proj.proj_info.proj_name}_FML.xlsx`
            filename = filename.replace(/\(|\)|\s/ig, '_')
            DIST_PATH = path.join(proj_path, '..', filename)

            // 保存excel
            excel
                .saveAs()
                .pipe(fs.createWriteStream(DIST_PATH))
                .on('finish', () => {
                    let cmd = "start " + DIST_PATH
                    child_process.exec(cmd, (err, std, stderr) => {
                        console.log(std)
                    })
                    console.log('保存完毕:' + DIST_PATH)
                });
        })
}

if (!module.parent && process.argv[2]) genXlsx(process.argv[2])


function addCell(row, val, fgColor) {
    row.setHeightCM(0.8)
    var cell = row.addCell()
    cell.style.align.wrapText = true
    cell.style.align.v = 'center';
    cell.style.font.name = "微软雅黑"

    if (val) cell.value = val;
    if (fgColor) {
        cell.style.fill.patternType = "solid"
        cell.style.fill.fgColor = fgColor;
    }
    return cell
}

function setDescriptionStyle(row, res) {
    var lines = 0
    for (var m = res.length - 1; m >= 0; m--) {
        if (res.charAt(m) == '\n') {
            lines++
        }
    }
    lines = lines ? lines : 1
    row.setHeightCM(0.8 * lines)
}

function addHeader(sheet) {
    var row = sheet.addRow()
    addCell(row, 'ID', "00eeeeee")
    addCell(row, '页面名', "00eeeeee")
    addCell(row, '用例编号', "00eeeeee")
    addCell(row, '用例名', "00eeeeee")
    addCell(row, '用例说明', "00eeeeee")
    sheet.col(0).width = 5
    sheet.col(1).width = 20
    sheet.col(2).width = 10
    sheet.col(3).width = 30
    sheet.col(4).width = 60
    row.setHeightCM(0.8)
}

function addPage(sheet, page) {
    if (!page.pageId) return false
    var row = sheet.addRow()
    addCell(row, page.pageId, "00f5f5f5")
    addCell(row, page.pageName, "00f5f5f5")
    addCell(row, '', "00f5f5f5")
    addCell(row, '', "00f5f5f5")
    addCell(row, '', "00f5f5f5")
}

function addInteract(sheet, item) {
    var row = sheet.addRow()
    addCell(row)
    addCell(row)
    addCell(row, item.interactId)
    addCell(row, item.interactName)
    item.interactDes = item.interactDes.replace(/<\/p>/gi, '\n')
    item.interactDes = item.interactDes.replace(/<br\/>/gi, '\n')
    addCell(row, _t(item.interactDes))
    setDescriptionStyle(row, item.interactDes)
}

function _t(txt) {
    return txt.replace(/<[^>]+>/ig, '')
}