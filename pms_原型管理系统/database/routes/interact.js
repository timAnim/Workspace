var express = require('express');
var router = express.Router();
var Interact = require('../model/interact.js')
var mongoose = require('mongoose')
var util = require('../public/src/util.js');

router.post('/find', function (req, res, next) {
    var _id = req.body._id;
    var whereStr = _id ? {
        _id: _id
    } : {}
    Interact.find(whereStr, (err, result) => {
        if (err) return next(Error('未查到'))
        util.send(res, result)
    })
});

router.post('/update', (req, res, next) => {
    var doc = new Interact(req.body.data)
    var _id = doc._id || new mongoose.Types.ObjectId()

    Interact.update({
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
    Interact.remove({
        _id: _id
    }, (err, result) => {
        if (err) return next(new Error('数据错误'))
        util.send(res, result)
    })
});

module.exports = router;