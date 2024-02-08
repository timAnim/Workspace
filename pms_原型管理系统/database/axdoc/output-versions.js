// 加载模块
var fs = require('fs');
var path = require('path');
var { Document, Packer, Paragraph, TextRun, BorderStyle, WidthType } = require("docx")
var sizeOf = require('image-size')
const findOne = require('../service/productSvc/findOne.js')
const RESOURCE = path.resolve(__dirname, '../public/files/image')
require('../util/dateFormat')
var doc,
  dist,
  distPath;


// 如果是命令行执行则直接运行
if (require.main === module) {
  outputVersions('5c26f6c4ac1dd00a88e0fd0f')
    .then(res => {
      console.log(res)
    })
}

module.exports = outputVersions

function outputVersions(productId, cb) {
  return findOne(productId)
    .then((res) => {
      var product = res.data
      var related = product.projects
      var filename = product.name + '变更履历.docx'

      doc = new Document({
        creator: 'yutong',
        title: filename,
        description: product.description,
      });
      initDocStyle(doc)

      dist = path.resolve(__dirname, '..\\public\\files\\output\\', filename)
      distPath = path.join('api\\files\\output', filename)

      // addImage(path.join(RESOURCE, 'yutong_logo.png'))

      addHeader(product.name + '需求文档')

      addH1('产品档案')
      createTable([
        [{val:"产品名称"}, {val:product.name}],
        [{val:"产品简介"}, {val:product.description}],
        [{val:"相关资料"}, {val:product.material}],
        [{val:"测试环境"}, {val:product.develop}],
        [{val:"正式环境"}, {val:product.product}]
      ])

      console.log('related is ' + related.length)
      related.forEach(proj => {

        addH1(proj.name)

        addPara('时间:  ' + proj.start.format('yyyy-MM-dd') +' 至 ' + proj.end.format('yyyy-MM-dd'))
        addPara('版本介绍:')

        var arr = proj.description.split(/<br>|\n/ig)
        arr.forEach(p=>{
          addPara(p)
        })
      })

      if (fs.existsSync(dist)) {
        fs.unlinkSync(dist);
      }
      console.log('开始保存:' + filename)

      const packer = new Packer();

      return packer.toBuffer(doc)
    })
    .then(buffer => {
      fs.writeFileSync(dist, buffer);
      return Promise.resolve(distPath)
    })
}

function initDocStyle(doc) {
  doc.Styles.createParagraphStyle("Normal", "Normal")
    .font("Microsoft YaHei UI")
    .next("Normal")
    .color("424242")
    .spacing({ before: 22, after: 44 })
    .quickFormat()
    .size(22)

  doc.Styles.createParagraphStyle("Title", "Title")
    .basedOn("Normal")
    .next("Normal")
    .quickFormat()
    .color("000000")
    .size(64)
    .spacing({ before: 3600, after: 3600 });

  doc.Styles.createParagraphStyle("Heading1", "Heading 1")
    .basedOn("Normal")
    .next("Normal")
    .quickFormat()
    .color("1b5e8f")
    .size(56)
    .spacing({ before: 2400, after: 120 });

  doc.Styles.createParagraphStyle("Heading2", "Heading 2")
    .basedOn("Normal")
    .next("Normal")
    .quickFormat()
    .color("1b5e8f")
    .size(48)
    .spacing({ before: 1800, after: 88 });

  doc.Styles.createParagraphStyle("Heading3", "Heading 3")
    .basedOn("Normal")
    .next("Normal")
    .quickFormat()
    .color("1b5e8f")
    .size(28)
    .spacing({ before: 800, after: 56 });

  doc.Styles.createParagraphStyle("Highlight", "Highlight")
    .basedOn("Normal")
    .next("Normal")
    .color("000000")
    .quickFormat()
    .size(22)
    .bold()

  doc.Styles.createParagraphStyle("List", "List")
    .basedOn("Normal")
    .quickFormat()
    .spacing({ before: 22, after: 22 })

  const numberedAbstract = doc.Numbering.createAbstractNumbering();
  numberedAbstract.createLevel(0, "decimal", "%1. ", "left");

  const letterNumbering = doc.Numbering.createConcreteNumbering(numberedAbstract);
  const letterNumbering1 = doc.Numbering.createConcreteNumbering(numberedAbstract);
  letterNumbering1.overrideLevel(0, 5);

  console.log('document is inited')
}

function addHeader(text) {
  doc.createParagraph(text).title().style("Title").center();
}

function addH1(text) {
  doc.createParagraph(text).heading1().style("Heading 1");
}

function addH2(text) {
  doc.createParagraph(text).heading2().style("Heading 2");
}

function addH3(text) {
  doc.createParagraph(text).heading3().style("Heading 3");
}

function addPara(text) {
  doc.createParagraph(text).style("Normal");
}

function addList(text) {
  doc.createParagraph(text).style("List");
}

function addImage(url) {
  var dim = sizeOf(url)
  doc.createImage(fs.readFileSync(url), 200, dim.height * 200 / dim.width);
}

function createTable(tbody) {
  var m = tbody.length
  var n = tbody[0].length
  var table = doc.createTable(m, n).setWidth(WidthType.PERCENTAGE, "100%")

  for (var i = m - 1; i >= 0; i--) {
    for (var j = n - 1; j >= 0; j--) {
      (function(i, j) {
        var val = tbody[i][j].val
        table
          .getCell(i, j)
          .addContent(new Paragraph(val))
          .CellProperties.Borders.addTopBorder(BorderStyle.SINGLE, 1, "#e0e0e0")
          .addBottomBorder(BorderStyle.SINGLE, 1, "#e0e0e0")
          .addStartBorder(BorderStyle.SINGLE, 1, "#e0e0e0")
          .addEndBorder(BorderStyle.SINGLE, 1, "#e0e0e0");
      })(i, j)
    }
  }
}