// 加载模块
var fs = require('fs');
var path = require('path');
var docx = require('docx');
const { HeadingLevel, WidthType, TableRow, Paragraph, BorderStyle, TextRun, PageBreak, Packer } = require('docx');
// var sizeOf = require('image-size')
// var Project = require('../model/project.js')

const doc = new docx.Document({
    creator: "proj.cuser",
    title: "proj.name",
    description: "A brief example of using docx",
})

function outputDocx(proj, cb) {
    var crawler = require('./crawler.js')
    crawler(proj)
        .then(result => {
            console.log(result)
            var pages = result.pages
            var global_var = result.proj_info
            const RESOURCE = path.resolve(__dirname, '../public/files/image')

            const doc = new docx.Document({
                creator: proj.cuser,
                title: proj.name,
                description: "A brief example of using docx",
            });

            // doc.Styles.createParagraphStyle("Normal", "Normal")
            //     .font("Microsoft YaHei UI")
            //     .next("Normal")
            //     .color("424242")
            //     .spacing({ before: 22, after: 44 })
            //     .quickFormat()
            //     .size(22)

            // doc.Styles.createParagraphStyle("Title", "Title")
            //     .basedOn("Normal")
            //     .next("Normal")
            //     .quickFormat()
            //     .color("000000")
            //     .size(64)
            //     .spacing({ before: 3600, after: 3600 });

            // doc.Styles.createParagraphStyle("Heading1", "Heading 1")
            //     .basedOn("Normal")
            //     .next("Normal")
            //     .quickFormat()
            //     .color("1b5e8f")
            //     .size(56)
            //     .spacing({ before: 2400, after: 120 });

            // doc.Styles.createParagraphStyle("Heading2", "Heading 2")
            //     .basedOn("Normal")
            //     .next("Normal")
            //     .quickFormat()
            //     .color("1b5e8f")
            //     .size(48)
            //     .spacing({ before: 1800, after: 88 });

            // doc.Styles.createParagraphStyle("Heading3", "Heading 3")
            //     .basedOn("Normal")
            //     .next("Normal")
            //     .quickFormat()
            //     .color("1b5e8f")
            //     .size(28)
            //     .spacing({ before: 800, after: 56 });

            // doc.Styles.createParagraphStyle("Highlight", "Highlight")
            //     .basedOn("Normal")
            //     .next("Normal")
            //     .color("000000")
            //     .quickFormat()
            //     .size(22)
            //     .bold()

            // doc.Styles.createParagraphStyle("List", "List")
            //     .basedOn("Normal")
            //     .quickFormat()
            //     .spacing({ before: 22, after: 22 })

            // const numberedAbstract = doc.Numbering.createAbstractNumbering();
            // numberedAbstract.createLevel(0, "decimal", "%1. ", "left");

            // const letterNumbering = doc.Numbering.createConcreteNumbering(numberedAbstract);
            // const letterNumbering1 = doc.Numbering.createConcreteNumbering(numberedAbstract);
            // letterNumbering1.overrideLevel(0, 5);

            // addImage(path.join(RESOURCE, 'yutong_logo.png'))

            addHeader(proj.name + '需求文档')
                // doc.addSection({
                //   headers: {
                //     default: new Header({
                //       children: [new Paragraph("共济科技")]
                //     })
                //   }
                // })
            var date = new Date()
            date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
            createTable([
                    [{
                        val: "文档版本号:",
                    }, {
                        val: '1.0',
                    }, {
                        val: '文档编号',
                    }, {
                        val: "projId",
                    }],
                    [{
                        val: "文档密级：",
                    }, {
                        val: '机密',
                    }, {
                        val: '归属部门/项目',
                    }, {
                        val: "产品设计部",
                    }],
                    [{
                        val: "产品名",
                    }, {
                        val: 'KE、GU',
                    }, {
                        val: '子系统名：',
                    }, {
                        val: "",
                    }],
                    [{
                        val: "编写人",
                    }, {
                        val: proj.cuser,
                    }, {
                        val: "编写日期",
                    }, {
                        val: date,
                    }],
                ])
                // 此处分页
                // doc.addSection({
                //     children: [
                //         new docx.Paragraph({
                //             children: [
                //                 new TextRun(""),
                //                 new PageBreak()
                //             ]
                //         })
                //     ]
                // })

            addH1('项目修订记录')
            createTable([
                [{
                    val: "版本号",
                }, {
                    val: '修订人',
                }, {
                    val: '修订日期',
                }, {
                    val: '修订描述',
                }, {
                    val: '影响章节',
                }],

                [{
                    val: "v1.0",
                }, {
                    val: proj.cuser,
                }, {
                    val: date,
                }, {
                    val: '初稿',
                }, {
                    val: '',
                }],
            ])
            addH1('需求背景')
            createTable([
                [{
                    val: "需求名称",
                }, {
                    val: proj.name,
                }],
                [{
                    val: "需求来源",
                }, {
                    val: '工程部',
                }],
                [{
                    val: "用户反馈",
                }, {
                    val: global_var.url_zentao,
                }],
                [{
                    val: "用户预期",
                }, {
                    val: '',
                }],
            ])

            addH1('用户角色')
            createTable([
                [{
                    val: "角色名称",
                }, {
                    val: '角色描述',
                }],
                [{
                    val: "运维人员",
                }, {
                    val: '满足运维要求',
                }],
            ])

            addH1('影响范围')
            createTable([
                [{
                    val: "产品型号",
                }, {
                    val: 'KE\\GU',
                }],
                [{
                    val: "软件版本",
                }, {
                    val: 'V300R003',
                }],
                [{
                    val: "功能模块",
                }, {
                    val: '',
                }],
            ])

            addH1('功能详述')
            pages.forEach(page => {
                // 此处分页
                doc.addSection({
                    children: [
                        new docx.Paragraph({
                            children: [
                                new TextRun(""),
                                new PageBreak()
                            ]
                        })
                    ]
                })
                addH2(page.url.replace('.html', '').toUpperCase()) // H2页面标题
                    // 原型图
                try {
                    var cover = path.resolve(__dirname, '..\\public\\files\\proto\\', proj.code, 'images', page.url.replace('html', 'png'))
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
            var dist = path.resolve('\\\\192.168.1.203\\proto_shared\\output', filename)
            if (fs.existsSync(dist)) {
                fs.unlinkSync(dist);
            }
            var distPath = path.join('http:\/\/192.168.1.203\/output\/', filename)

            console.log('开始保存:' + filename)

            Packer.toBuffer(doc)
                .then(buffer => {
                    fs.writeFileSync(dist, buffer);
                    cb(distPath)
                }).catch(err => {
                    console.log(err)
                })

            function addHeader(text) {

                doc.addSection({
                    children: [new docx.Paragraph({
                        text,
                    })]
                })
            }

            function addH1(text) {
                doc.addSection({
                    children: [new docx.Paragraph({
                        text,
                        heading: HeadingLevel.HEADING_1
                    })]
                })
            }

            function addH2(text) {
                doc.addSection({
                    children: [new docx.Paragraph({
                        text,
                        heading: HeadingLevel.HEADING_2
                    })]
                })
            }

            function addH3(text) {
                doc.addSection({
                    children: [new docx.Paragraph({
                        text,
                        heading: HeadingLevel.HEADING_3
                    })]
                })
            }

            function addPara(text) {
                doc.addSection({
                    children: [new docx.Paragraph({
                        text
                    })]
                })
            }

            function addImage(url) {
                var dim = sizeOf(url)
                doc.createImage(fs.readFileSync(url), 600, dim.height * 600 / dim.width);
            }

            function createTable(tbody) {
                var m = tbody.length
                var n = tbody[0].length

                var table_rows = []
                for (var i = m - 1; i >= 0; i--) {

                    var row_children = []
                    for (var j = n - 1; j >= 0; j--) {
                        (function(i, j) {
                            row_children.push(new docx.TableCell({
                                children: [
                                    new docx.Paragraph({ text: tbody[i][j].val })
                                ],
                                borders: {
                                    top: {
                                        style: BorderStyle.SINGLE,
                                        size: 1,
                                        color: "#e0e0e0"
                                    },
                                    bottom: {
                                        style: BorderStyle.SINGLE,
                                        size: 1,
                                        color: "#e0e0e0"
                                    },
                                    left: {
                                        style: BorderStyle.SINGLE,
                                        size: 1,
                                        color: "#e0e0e0"
                                    },
                                    right: {
                                        style: BorderStyle.SINGLE,
                                        size: 1,
                                        color: "#e0e0e0"
                                    },
                                }
                            }))
                        })(i, j)
                        var row = new docx.TableRow({
                            children: row_children
                        })
                    }
                    table_rows.push(row)
                }

                var table = new docx.Table({
                    rows: table_rows,
                    width: {
                        size: n,
                        type: WidthType
                    }
                })


                doc.addSection({
                    children: [table]
                })
            }

        })

}

module.exports = outputDocx