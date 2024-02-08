var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var Staff = require('../model/staff.js')
var util = require('../public/src/util.js');
const JWT_SECRET = 'ued';
const PSWD_INIT = '123456';

router.post('/find', (req, res, next) => {
  var uid = req.body.uid;
  var whereStr = uid ? {
    uid
  } : {}
  Staff.find(whereStr, (err, result) => {
    if (err) return next(new Error('未查到'))
    res.send({
      code: 0,
      msg: "操作成功",
      data: result
    })
  })
});

router.post('/findAdmin', (req, res, next) => {
  var whereStr = {
    isadmin: true
  }
  Staff.find(whereStr, (err, result) => {
    if (err) return next(new Error('未查到'))
    res.send({
      code: 0,
      msg: "操作失败",
      data: result
    })
  })
});


router.post('/insert', (req, res, next) => {
  var staff = req.body.data

  Staff.updateOne({
    uid: staff.uid
  }, {
    $set: staff
  }, {
    upsert: true
  }, (err, result) => {
    if (err) return next(new Error('插入失败'))
    res.send({
      code: 0,
      msg: "操作成功",
      data: result
    })
  })
});

router.post('/remove', (req, res, next) => {
  Staff.remove({
    uid: req.body.uid
  }, (err, result) => {
    if (err) return next(new Error('删除失败'))
    util.send(res, result)
  })
});

router.post('/update', (req, res, next) => {
  Staff.update({
    uid: req.body.data.uid
  }, {
    $set: {
      isadmin: req.body.data.isadmin
    }
  }, (err, result) => {
    if (err) return next(new Error('更新失败'))
    res.send({
      code: 0,
      msg: "操作成功",
      data: result
    })
  })
});

module.exports = router;