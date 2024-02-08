var fs = require('fs');
var multiparty = require('multiparty')
var express = require('express');
var router = express.Router();
var AipOcrClient = require("baidu-aip-sdk").ocr
var AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;
var path = require('path');

// 设置APPID/AK/SK
const APP_ID = "10365123";
const API_KEY = "fQ1GtIsEyQazSyCbByW5yLOS";
const SECRET_KEY = "XmgxETU603nHr1ocpWXYKmSpvRrUnuXP";
const PATH = path.resolve(__dirname, '../public/files/')


var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY)
var imgClient = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);

router.post('/image', function (req, res, next) {
  clientHdl(req, res, next, 'generalBasic')

});

router.post('/receipt', function (req, res, next) {
  clientHdl(req, res, next, 'receipt')
})

router.post('/dish', function (req, res, next) {
  imgClientHdl(req, res, next, 'dishDetect')
})

router.post('/car', function (req, res, next) {
  imgClientHdl(req, res, next, 'carDetect')
})

router.post('/animal', function (req, res, next) {
  imgClientHdl(req, res, next, 'animalDetect')
})

router.post('/plant', function (req, res, next) {
  imgClientHdl(req, res, next, 'plantDetect')
})

function imgClientHdl(req, res, next, type) {
  var form = new multiparty.Form({
    uploadDir: PATH
  });

  form.parse(req, function (err, fields, files) {
    var inputFile = files.file[0];
    var uploadedPath = inputFile.path;
    var dstPath = PATH + inputFile.originalFilename;

    fs.rename(uploadedPath, dstPath, err => {
      if (err) {
        return next(err)
      }
      var image = fs.readFileSync(dstPath)
      var base64Img = new Buffer(image).toString('base64')

      imgClient[type](base64Img, {
          detect_direction: true
        })
        .then(function (result) {
          fs.unlinkSync(dstPath, err => {
            return next(err)
          })
          res.send({
            data: JSON.stringify(result)
          })
        })
        .catch(err => {
          next(err)
        })
    })
  })
}

function clientHdl(req, res, next, type) {
  var form = new multiparty.Form({
    uploadDir: PATH
  });

  form.parse(req, function (err, fields, files) {
    var inputFile = files.file[0];
    var uploadedPath = inputFile.path;
    var dstPath = PATH + inputFile.originalFilename;

    fs.rename(uploadedPath, dstPath, err => {
      if (err) {
        return next(err)
      }
      var image = fs.readFileSync(dstPath)
      var base64Img = new Buffer(image).toString('base64')

      client[type](base64Img, {
          detect_direction: true
        })
        .then(function (result) {
          fs.unlinkSync(dstPath, err => {
            return next(err)
          })
          res.send({
            data: JSON.stringify(result)
          })
        })
        .catch(err => {
          next(err)
        })
    })
  })
}

module.exports = router;