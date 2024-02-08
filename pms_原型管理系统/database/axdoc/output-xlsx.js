// 加载模块
var fs = require('fs');
var path = require('path');
var output = require('better-xlsx')
var Project = require('../model/project.js')
const crawler = require('./crawler.js')

module.exports = function (projId, cb) {
  Project.find({
    code: projId
  }, (err, proj) => {
    console.log('已经查到proj:' + projId)
    proj = proj[0]
    crawler(proj)
      .then(pages => {
        const CONTENT_TITLE = proj.code
        console.log('开始导出xlsx的文件:' + CONTENT_TITLE)

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

        var filename = `${CONTENT_TITLE}.xlsx`
        var dist = path.resolve(__dirname, '..\\public\\files\\output', filename)
        var distPath = path.join('\\api\\files\\output', filename)

        console.log('开始以流的方式保存:' + CONTENT_TITLE)

        // 保存excel
        excel
          .saveAs()
          .pipe(fs.createWriteStream(dist))
          .on('finish', () => {
            console.log('保存完毕:' + dist)
            cb(distPath)
          });
      })
  })
}

function addCell(row, val, fgColor) {
  row.setHeightCM(0.8)
  var cell = row.addCell()
  cell.style.align.wrapText = true
  cell.style.align.v = 'center';
  cell.style.fill.patternType = 'solid'

  if (val) cell.value = val;
  if (fgColor) {
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
  addCell(row, 'ID', 'ffe0e0e0')
  addCell(row, '页面名', 'ffe0e0e0')
  addCell(row, '编号', 'ffe0e0e0')
  addCell(row, '交互名', 'ffe0e0e0')
  addCell(row, '交互说明', 'ffe0e0e0')
  sheet.col(0).width = 5
  sheet.col(1).width = 20
  sheet.col(2).width = 10
  sheet.col(3).width = 20
  sheet.col(4).width = 40
  row.setHeightCM(1.6)
}

function addPage(sheet, page) {
  var row = sheet.addRow()
  addCell(row, page.pageId, 'fff5f5f5')
  addCell(row, page.pageName, 'fff5f5f5')
  addCell(row, '', 'fff5f5f5')
  addCell(row, '', 'fff5f5f5')
  addCell(row, '', 'fff5f5f5')
}

function addInteract(sheet, item) {
  var row = sheet.addRow()
  addCell(row)
  addCell(row)
  addCell(row, item.interactId)
  addCell(row, item.interactName)
  item.interactDes = item.interactDes.replace(/<br\/>/gi, '\n')
  addCell(row, item.interactDes)
  setDescriptionStyle(row, item.interactDes)
}