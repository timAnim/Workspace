var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Palette = require('../model/palette.js')
var jwt = require('jwt-simple');

router.post('/upadd', function (req, res, next) {
  var token = req.headers.token
  var payload = jwt.decode(token, 'ued');
  if (req.body.data._id) {
    req.body.data.muser = payload.name
    req.body.data.mdate = new Date()
  } else {
    req.body.data.cuser = payload.name
    req.body.data.cuid = payload._id
    req.body.data._id = new mongoose.Types.ObjectId()
  }

  var whereStr = {
    _id: req.body.data._id
  }
  Palette.update(whereStr, {
    $set: req.body.data,
  }, {
    upsert: true,
  }, (err, result) => {
    if (err) return res.send({
      code: 50000
    })
    res.send({
      code: 0,
      data: result
    })
  })
});

router.post('/find', function (req, res, next) {
  var whereStr = {}
  if (req.body._id) whereStr = {
    _id: req.body._id
  }
  Palette.find(whereStr, (err, result) => {
    if (err) {
      next(new Error('未查到数据'))
      return false;
    }
    res.send({
      code: 0,
      data: result
    })
  })
});

router.post('/update', (req, res, next) => {
  var whereStr = {
    _id: req.body.data._id
  }
  Palette.update(whereStr, {
    $set: req.body.data
  }, (err, result) => {
    if (err) {
      next(new Error('未查到数据'))
      return false;
    }
    res.send({
      code: 0,
      data: result
    })
  })
});

router.post('/remove', (req, res, next) => {
  Palette.remove({
    _id: req.body._id
  }, (err, result) => {
    if (err) {
      next(new Error('未查到数据'))
      return false;
    }
    res.send({
      code: 0,
      data: result
    })
  })
});

router.post('/color/insert', function (req, res, next) {
  var whereStr = {
    _id: req.body._id
  }
  var type = Object.prototype.toString.call(req.body.colors)
  if (type !== '[object Array]') {
    next(new Error('请检查输入'))
    return false;
  }
  Palette.update(whereStr, {
    colors: req.body.colors
  }, (err, result) => {
    if (err) {
      next(new Error('未查到数据'))
      return false;
    }
    res.send({
      code: 0,
      data: true
    })
  })
});

router.post('/color/update', (req, res, next) => {
  var whereStr = {
    _id: req.body._id
  }
  Palette.update(whereStr, {
    $set: {
      colors: req.body.colors
    }
  }, (err, result) => {
    if (err) {
      next(new Error('未查到数据'))
      return false;
    }
    res.send({
      code: 0,
      data: result
    })
  })
});

router.post('/color/remove', (req, res, next) => {
  var whereStr = {
    _id: req.body._id
  }
  Palette.update(whereStr, {
    $pull: {
      colors: {
        _id: req.body._id
      }
    }
  }, (err, result) => {
    if (err) {
      next(new Error('未查到数据'))
      return false;
    }
    res.send({
      code: 0,
      data: result
    })
  })
});

module.exports = router;