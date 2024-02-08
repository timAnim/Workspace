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
    if (err) {
      return cb(err)
    }
    console.log('已经查到proj:' + projId)
    proj = proj[0]
    crawler(proj)
      .then(pages => {
        const CONTENT_TITLE = proj.name + '埋点需求列表'
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

function addHeader(sheet) {
  var row = sheet.addRow()
  addCell(row, '模块ID', 'ffe0e0e0')
  addCell(row, '模块名', 'ffe0e0e0')
  addCell(row, '事件ID', 'ffe0e0e0')
  addCell(row, '事件名称', 'ffe0e0e0')
  addCell(row, '事件类型', 'ffe0e0e0')
  sheet.col(0).width = 10
  sheet.col(1).width = 20
  sheet.col(2).width = 10
  sheet.col(3).width = 20
  sheet.col(4).width = 40
  row.setHeightCM(1.6)
}

function addPage(sheet, page) {
  var row = sheet.addRow()
  var _pageId = page.pageId.replace('P', "p00")
  addCell(row, _pageId, 'fff5f5f5')
  addCell(row, page.pageName, 'fff5f5f5')
  addCell(row, '', 'fff5f5f5')
  addCell(row, '', 'fff5f5f5')
  addCell(row, '', 'fff5f5f5')
}

function addInteract(sheet, item) {
  var _interactId = item.interactId.replace('P', "p00").replace("C", "00")
  var arr = item.interactName.split('-')
  if (arr.length > 1) {
    item.func = arr[0]
    item.ev_type = arr[1]
    var row = sheet.addRow()
    addCell(row)
    addCell(row)
    addCell(row, _interactId)
    addCell(row, item.func)
    addCell(row, item.ev_type)
  }
}