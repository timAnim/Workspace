var fs = require('fs')
var express = require('express')
var router = express.Router()
var path = require('path')

const PATH = path.resolve(__dirname, '../public/files/flowchart')
const RELA = 'api\\files\\flowchart\\'
router.post('/', function (req, res, next) {
  const namespace = req.body.namespace
  const dstPath = path.join(PATH, namespace)
  const relaPath = path.join(RELA, namespace)

  if (!fs.existsSync(dstPath)) {
    return res.send({
      code: 404,
      msg: '项目不存在'
    })
  }
  var imgArr = []
  var files = fs.readdirSync(dstPath)

  files.forEach(file => {
    var reg = /.svg$|.jpg$|.png$|.jpeg$|.pdf$/ig
    var curPath = path.join(dstPath, file)
    if (reg.test(curPath)) {
      imgArr.push(relaPath + '\\' + file)
    }
  })
  res.send({
    imgArr
  })
})

module.exports = router