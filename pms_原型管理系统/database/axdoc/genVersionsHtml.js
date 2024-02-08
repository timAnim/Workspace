// 加载模块
const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path')
const addStyle = require('./add-style.js')
const findOne = require('../service/productSvc/findOne.js')
const crawler = require('./crawler.js')
const opn = require('opn')
require('../util/dateFormat')

var dist,
  distPath,
  product,
  related,
  content,
  $;

function genVersionsHtml(id) {
	content = '<article></article>';
  $ = cheerio.load(content, {
    decodeEntities: false
  });
  return findOne(id)
    .then(res => {
      product = res.data
      related = product.projects
      var filename = product.name + '变更履历.html'

      dist = path.resolve(__dirname, '..\\public\\files\\output\\', filename)
      distPath = path.join('api\\files\\output', filename)
      createHtml()
      return Promise.resolve(distPath)
    })
}

function createHtml() {
  var outer = $('article')
  addCover(product.name)


  addH1('产品档案')
  createTable([
    ["产品名称", product.name],
    ["产品简介", product.description],
    ["相关资料", product.material],
    ["测试环境", product.develop],
    ["正式环境", product.product]
  ])

  related.forEach(proj => {
    addH1(proj.name)

    addPara('开始时间: &nbsp;&nbsp;' + proj.start.format('yyyy-MM-dd'))
    addPara('截止时间: &nbsp;&nbsp;' + proj.end.format('yyyy-MM-dd'))

    addH2('版本介绍')
    addPara(proj.description.replace(/\n/ig,'<br>'))
  })
  fs.writeFileSync(dist, addStyle($.html()))
}

function addCover(title, author) {
  $('article').append(`<div><img width="170" src="${path.join('../image', 'yutong_logo.png')}"/></div>`)
  addPara(title + '变更履历')

  var coverTable = [
  	['信息分类', '系统设计'],
  	['涉密等级', '内部公开'],
  	['责任机构', 'IT技术平台中心'],
  	['授权范围', '郑州宇通客车股份有限公司<br/>宇通集团本部'],
  	['涉密截止时间', '至文件废止日'],
  ]
  createTable(coverTable)
}

function createTable(con) {
  if (con.length < 1) {
    return false
  }
  var _con = `<div><table><tbody>`
  con.forEach((row, i) => {
    _con += '<tr>'
    row.forEach(col => {
      _con += `<td><p>${col}</p></td>`
    })
    _con += '</tr>'
  })
  _con += '</tobody></table></div>'
  $('article').append(_con)
}

function putPageBreak() {
  $('article').append(`</br></br>`)
}

function addH1(text) {
  $('article').append(`<h1>${text}</h1>`)
}

function addH2(text) {
  $('article').append(`
		<h2>${text}</h2>
	`)
}

function addH3(text) {
  $('article').append(`
				<h3>${text}</h3>
			`)
}

function addPara(text) {
  $('article').append(`
			<p>${text}</p>
		`)
}

function addLink(url, text) {
  $('article').append(`
			<p><a href='${url}' target='_blank'>${text})</a></p>
		`)
}


// 如果是命令行执行则直接运行
if (require.main === module) {
  genVersionsHtml('5c26f6c4ac1dd00a88e0fd0f')
    .then(data => opn(dist))
    .catch(err => console.log(err.message))
}

module.exports = genVersionsHtml