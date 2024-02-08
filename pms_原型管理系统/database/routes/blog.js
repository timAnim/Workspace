var express = require('express')
var router = express.Router()
var Blog = require('../model/blog.js')
var mongoose = require('mongoose')
var util = require('../public/src/util.js')
var jwt = require('jwt-simple')

router.post('/find', function (req, res, next) {
    var _id = req.body._id;
    var whereStr = _id ? {
        _id: _id
    } : {}
    Blog.find(whereStr, (err, result) => {
        if (err) return next(new Error('未查到'))
        util.send(res, result)
    })
});

router.post('/update', (req, res, next) => {
    var token = req.headers.token
    var payload = jwt.decode(token, 'ued');
    req.body.data.cuid = payload.uid
    req.body.data.author = req.body.data.author || payload.name
    req.body.data.cdate = new Date()

    var doc = new Blog(req.body.data)
    var _id = doc._id || new mongoose.Types.ObjectId()

    Blog.update({
        _id: _id
    }, doc, {
        upsert: true
    }, (err, result) => {
        if (err) return next(new Error('数据错误'))
        util.send(res, result)
    })
});

router.post('/remove', function (req, res, next) {
    var _id = req.body._id;
    Blog.remove({
        _id: _id
    }, (err, result) => {
        if (err) return next(new Error('数据错误'))
        util.send(res, result)
    })
});

module.exports = router;