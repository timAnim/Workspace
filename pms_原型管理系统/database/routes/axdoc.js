var express = require('express')
var router = express.Router()
const path = require("path")

const ROOT_PATH = path.join(__dirname, '../public/files/proto')


// 导出excel需求列表
var outputXlsx = require('../axdoc/genXlsx')
var xlsxHtml = require('../axdoc/genXlsxHtml')

// 导出docx的需求文档
var outputDocx = require('../axdoc/output-docx')
var docxHtml = require('../axdoc/genDocxHtml')

// 导出excel的埋点需求列表
var outputInspect = require('../axdoc/output-inspect')
var inspectHtml = require('../axdoc/genInspectHtml')

// 变更履历
var outputVersions = require('../axdoc/output-versions')
var versionsHtml = require('../axdoc/genVersionsHtml')

router.post('/output-xlsx', (req, res, next) => {
    var code = req.body.code
    var src_path = path.join(ROOT_PATH, code)
    console.log('收到导出xlsx的请求:' + code)
    outputXlsx(src_path, result => {
        console.log('已经生成文件:' + result)
        res.send(result)
    })
})

router.post('/gen-xlsx-html', (req, res, next) => {
    var code = req.body.code
    console.log('收到导出xlsxhtml的请求:' + code)

    var src_path = path.join(ROOT_PATH, code)

    xlsxHtml(code)
        .then(result => {
            res.send(result)
        }).catch(err => {
            res.send({
                code: 500,
                data: err
            })
        })
})


router.post('/gen-docx-html', (req, res) => {
    var code = req.body.code
    console.log('收到导出docxhtml的请求:' + code)

    var src_path = path.join(ROOT_PATH, code)

    docxHtml(src_path)
        .then(result => {
            console.log(result)
            res.send(result)
        }).catch(err => {
            res.send({
                code: 500,
                data: err
            })
        })
})

router.post('/output-docx', (req, res) => {
    var code = req.body.code
    console.log('收到导出docx的请求:' + code)
    outputDocx(code, result => {
        console.log('已经生成文件:' + result)
        res.send(result)
    })
})



router.post('/output-inspect', (req, res) => {
    var code = req.body.code
    console.log('收到导出inspect的请求:' + code)
    outputInspect(code, result => {
        console.log('已经生成文件:' + result)
        res.send(result)
    })
})

router.post('/gen-inspect-html', (req, res) => {
    var code = req.body.code
    console.log('收到导出inspecthtml的请求:' + code)
    inspectHtml(code, result => {
        console.log('已经生成文件:' + result)
        res.send(result)
    })
})

router.post('/output-versions', (req, res) => {
    var id = req.body.id
    console.log('收到导出versions的请求:' + id)
    outputVersions(id)
        .then(result => {
            console.log('已经生成文件:' + result)
            res.send(result)
        })
})

router.post('/gen-versions-html', (req, res) => {
    var id = req.body.id
    console.log('收到导出versionshtml的请求:' + id)
    versionsHtml(id)
        .then(result => {
            console.log('已经生成文件:' + result)
            res.send(result)
        })
})

module.exports = router