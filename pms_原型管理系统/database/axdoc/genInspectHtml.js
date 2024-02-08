// 加载模块
var fs = require('fs')
var path = require('path')
var cheerio = require('cheerio')
var Project = require('../model/project.js')
var generateHtml = require('./generateHtml.js')
const crawler = require('./crawler.js')
var table = '<table cellpadding="8"><tbody></tbody></table>'

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
        var $ = cheerio.load(table, {
          decodeEntities: false,
          xmlMode: true
        })
        $('table').attr({
          style: 'border-collapse: collapse;border:1px solid #e0e0e0;'
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
        var filename = `${proj.name}埋点需求列表.html`
        var dist = path.resolve(__dirname, '..\\public\\files\\output', filename)
        var distPath = path.join('api\\files\\output', filename)

        console.log('开始以流的方式保存:' + proj.name)
        fs.writeFileSync(dist, generateHtml($.html()))
        cb(distPath)
      })
  })

}

function addHeader($) {
  $('tbody').append(`
      <tr height = '44' style='background: #e0e0e0'>
        <td width='80'>模块ID</td>
        <td width='160'>模块名</td>
        <td width='80'>事件ID</td>
        <td width='320'>事件名</td>
        <td width='240'>事件类型</td>
      </tr>
    `)
}

function addPage($, page) {
  var _pageId = page.pageId.replace('P', 'p00')
  $('tbody').append(`
      <tr height = '44' style='background: #fafafa;'>
        <td>${ _pageId }</td>
        <td>${page.pageName}</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    `)
}

function addInteract($, item) {
  var arr = item.interactName.split('-')
  var _interactId = item.interactId.replace('P', 'p00').replace("C", '00')

  if (arr.length > 1) {
    item.func = arr[0]
    item.ev_type = arr[1]
    $('tbody').append(`
        <tr style= 'line-height: 32px; min-height:44px;'>
          <td></td>
          <td></td>
          <td>${ _interactId }</td>
          <td>${item.func}</td>
          <td>${item.ev_type}</td>
        </tr>
      `)
  }
}