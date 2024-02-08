var express = require('express');
var router = express.Router();
var Log = require('../model/log.js')

router.post('/find', function (req, res, next) {
  let skip = req.skip || 0
  let limit = req.limit || 10
  Log.find((err, result) => {
      if (err) {
        err.req('log/find')
        err.message = '查询日志失败'
        return next(err)
      }
      res.send({
        code: 0,
        data: result
      })
    }).skip(skip)
    .limit(limit)
    .sort({
      'date': -1
    })
});

module.exports = router;