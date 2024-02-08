var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var Staff = require('../model/staff.js')
var util = require('../public/src/util.js');
const JWT_SECRET = 'ued';
const PSWD_INIT = '123456';

router.post('/find', (req, res, next) => {
    var _id = req.body._id;
    var whereStr = _id ? {
        _id: _id
    } : {}
    Staff.find(whereStr, (err, result) => {
        if (err) return next(new Error('未查到'))
        util.send(res, result)
    })
});

router.post('/findOne', (req, res, next) => {
    var uid = req.body.uid;
    var whereStr = uid ? {
        uid
    } : {}
    Staff.findOne(whereStr, (err, result) => {
        if (err) return next(new Error('未查到'))
        util.send(res, result)
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
    req.body.data.password = PSWD_INIT
    req.body.data.number = parseInt(req.body.data.number)
    if (!req.body.data.number) {
        delete req.body.data.number
    }

    new Staff(req.body.data).save((err, result) => {
        if (err) return next(new Error('插入失败'))
        util.send(res, result)
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

router.post('/modify-pswd', (req, res, next) => {

    var user = jwt.decode(req.headers.token, JWT_SECRET);

    Staff.findOne({
        uid: user.uid
    }, (err, user) => {
        if (err) return next(new Error('未查到'))

        user.comparePassword(req.body.data.old, (err, isMatch) => {
            if (err) return next(new Error('密码解析错误'))
            if (!isMatch) return util.send(res, false)

            user.save((err, result) => {
                if (err) return next(new Error('保存错误'))
                util.send(res, result)
            })
        });
    });
});

router.post('/login', (req, res, next) => {

    Staff.findOne({
        uid: req.body.uid
    }, (err, user) => {
        if (err) return next(new Error('未查到'))
        if (!user) return util.send(res, false)
        user.comparePassword(req.body.password, user._doc, function(err, isMatch) {
            if (err) return next(new Error('密码解析错误'))
            if (!isMatch) return util.send(res, false)
            var token = jwt.encode(user._doc, JWT_SECRET);
            res.send({
                code: 0,
                data: token,
                user: user,
            })
        });
    });
});

module.exports = router;