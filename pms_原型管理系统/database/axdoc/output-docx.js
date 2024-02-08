// 加载模块
var fs = require('fs');
var path = require('path');
var { Document, Packer, Paragraph, TextRun, BorderStyle, WidthType } = require("docx")
var sizeOf = require('image-size')
var Project = require('../model/project.js')


module.exports = function(projId, cb) {
  var crawler = require('./crawler.js')
    console.log(projId)
  Project.find({
    code: projId
  }, (err, proj) => {
    console.log('已经查到proj:' + projId)
    proj = proj[0]
    crawler(proj)
      .then(pages => {
        const RESOURCE = path.resolve(__dirname, '../public/files/image')

        const doc = new Document({
          creator: proj.cuser,
          title: proj.name,
          description: "A brief example of using docx",
        });

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

        // addImage(path.join(RESOURCE, 'yutong_logo.png'))

        addHeader(proj.name + '需求文档')
        var date = new Date()
        date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
        createTable([
          [{
            val: "信息分类:",
          }, {
            val: '系统设计',
          }],
          [{
            val: "责任人:",
          }, {
            val: proj.cuser,
          }],
          [{
            val: "起草:",
          }, {
            val: proj.cuser,
          }],
          [{
            val: "创建时间:",
          }, {
            val: date,
          }],
        ])
        doc.createParagraph("").pageBreak();
        // 此处分页

        addH1('变更履历')
        addH1('项目背景')
        createTable([
          [{
            val: "所属产品",
          }, {
            val: proj.name,
          }],
          [{
            val: "所属模块",
          }, {
            val: 'UED模块',
          }],
        ])

        addH1('名词解释')
        addH1('系统功能')

        pages.forEach(page => {
          // 此处分页
          doc.createParagraph("").pageBreak();
          addH2(page.url.replace('.html', '').toUpperCase()) // H2页面标题
          // 原型图
          var cover = path.resolve(__dirname, '..\\public\\files\\proto\\', proj.code, 'images', page.url.replace('html', 'png'))
          try {
            addImage(cover)
          } catch (err) {
            console.log('图片没有' + page.url)
          }
          var table = [
            [{
              val: "编号",
            }, {
              val: "交互",
            }],
          ]
          if (page.interactList) {
            // 添加交互的清单
            page.interactList.forEach(interact => {
              table.push([{
                val: interact.interactId,
              }, {
                val: interact.interactName,
              }])
            })
            createTable(table)

            // 添加交互的说明
            page.interactList.forEach(interact => {
              // 文字处理换行
              interact.interactDes = interact.interactDes.replace(/<br\/>/g, '\n')
              addH3(interact.interactId.toUpperCase() + interact.interactName)
              addPara(interact.interactDes)
            })
          }
        })
        var filename = `${proj.name}需求文档.docx`
        var dist = path.resolve(__dirname, '..\\public\\files\\output', filename)
        if (fs.existsSync(dist)) {
          fs.unlinkSync(dist);
        }
        var distPath = path.join('\\api\\files\\output', filename)

        console.log('开始保存:' + filename)

        const packer = new Packer();

        packer.toBuffer(doc).then((buffer) => {
          fs.writeFileSync(dist, buffer);
          cb(distPath)
        });

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

        function addImage(url) {
          var dim = sizeOf(url)
          doc.createImage(fs.readFileSync(url), 600, dim.height * 600 / dim.width);
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

      })
  })

}