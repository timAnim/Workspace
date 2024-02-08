var router = require('express').Router();
var PtPreset = require('../model/ptpreset.js');
var Staff = require('../model/staff.js')

var mongoose = require('mongoose')
var jwt = require('jwt-simple');

router.post('/find', function(req, res, next) {
    var uid = req.body.uid;
    var whereStr = uid ? {
        uid: uid
    } : {}
    PtPreset.find(whereStr, (err, result) => {
        if (err) return next(Error('未查到'))
        res.send({
            code: 0,
            msg: "操作成功",
            data: result
        })
    })
});

router.post('/mylist', function(req, res, next) {
    var uid = req.body.uid;
    var whereStr = uid ? {
        cuid: uid
    } : {}

    PtPreset.find(whereStr, (err, result) => {
        if (err) return next(new Error('未查到'))
        res.send({
            code: 0,
            msg: "操作成功",
            data: result
        })
    })
});

router.post('/upsert', (req, res, next) => {
    var preset = req.body.data

    var payload = jwt.decode(req.headers.token, 'ued')
    if (!payload.uid) return next(new Error('请登录'))

    preset.cuid = payload.uid
    preset.cuser = payload.name
    preset.cdate = new Date()

    if (!preset._id) {
        preset._id = new mongoose.Types.ObjectId()
        preset = new PtPreset(preset)
    }

    PtPreset.update({
        _id: preset._id
    }, preset, {
        upsert: true
    }, (err, result) => {
        if (err) return next(new Error('创建主题失败'))
        res.send({
            code: 0,
            msg: "操作成功",
            data: result
        })
    })
});

router.post('/remove', function(req, res, next) {
    var _id = req.body.data;
    PtPreset.remove({
        _id: _id
    }, (err, result) => {
        if (err) return next(new Error('未找到样式表'))
        res.send({
            code: 0,
            msg: "操作成功",
            data: result
        })
    })
});

router.post('/set', function(req, res, next) {
    var ptId = req.body.ptId ? req.body.ptId : null;

    var token = req.headers.token
    var payload = jwt.decode(token, 'ued');
    var uid = payload.uid
    Staff.updateOne({
        uid
    }, {
        $set: {
            ptpreset: ptId
        }
    }, (err, result) => {
        if (err) return next(Error('未查到'))
        res.send({
            code: 0,
            msg: "操作成功",
            data: result
        })
    })
});

module.exports = router;