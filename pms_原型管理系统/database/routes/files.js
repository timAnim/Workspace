var express = require('express')
var router = express.Router()
var path = require('path')
var serveStatic = require('serve-static')
const PATH = path.resolve(__dirname, '../public/files/')
var serve = serveStatic(PATH)

router.get('*', function (req, res, next) {
  var reg = /.*?api\/files\//
  req.url = req.originalUrl.replace(reg, '')

  serve(req, res, err => {
    res.send({
      code: 500,
      msg: '文件不存在'
    })
  })
})

module.exports = router