const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Project = require('../model/project.js')
const Log = require('../model/log.js')
const jwt = require('jwt-simple');
const getSchedule = require('../axdoc/genSchedule')
const fs = require('fs')
const path = require('path')
const ROOT_PATH = path.resolve(__dirname, '../public/files/proto')

const {
    updateProject,
    getProjectList,
    getProjectOne,
    updatePid,
    publicProject,
    getProjectsSchedule
} = require('../service/projectSvc')

router.post('/find', (req, res, next) => {
    getProjectList()
        .then(data => res.send(data))
        .catch(err => next(err))
});

router.post('/findOne', (req, res, next) => {
    getProjectOne(req.body.code)
        .then(data => res.send(data))
        .catch(err => next(err))
});

router.post('/updatePid', (req, res, next) => {
    var projArr = req.body.projArr;
    var pid = req.body.pid
    updatePid(projArr, pid)
        .then(data => res.send({
            code: 0,
            data
        }))
        .catch(err => next(err))
});

router.post('/publicProject', (req, res, next) => {
    publicProject(req.body._id, req.body.isPublic)
        .then(data => res.send(data))
        .catch(err => next(err))
});

router.post('/insert', function(req, res, next) {
    var dirPath = path.resolve(ROOT_PATH, req.body.data.code)
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath)
    } else {
        return next(new Error('项目代号已存在'))
    }

    var token = req.headers.token
    req.body.data.stage = [{
        _id: new mongoose.Types.ObjectId(),
        date: req.body.data.start,
        title: '开始',
    }, {
        _id: new mongoose.Types.ObjectId(),
        date: req.body.data.end,
        title: '结束',
    }]

    var payload = jwt.decode(token, 'ued');
    req.body.data.cuid = payload.uid
    req.body.data.cuser = payload.name
    var _proj = new Project(req.body.data)

    _proj.save((err, result) => {
        if (err) return next(err)
        res.send({
            code: 0,
            data: result
        })
        new Log({
            proj_name: _proj.name,
            proj_code: _proj.code,
            item: '添加项目',
        }).save()
    })
});

router.post('/update', function(req, res, next) {
    updateProject(req.body.data)
        .then(data => res.send(data))
        .catch(err => next(err))
});

router.post('/remove', function(req, res, next) {
    Project.remove({
        code: req.body.code
    }, function(err, result) {
        if (err) {
            err.message = '删除项目失败'
            return next(err)
        }
        res.send({
            code: 0,
            data: result
        })
        var dirPath = path.resolve(ROOT_PATH, req.body.code)
        deleteFolder(dirPath)

        Log.remove({
            proj_code: req.body.code
        }, (err, result) => {
            console.log({ "err": err })
        })

        function deleteFolder(url) {
            if (fs.existsSync(url)) {
                var files = fs.readdirSync(url);
                files.forEach(file => {
                    var curPath = path.join(url, file);
                    if (fs.statSync(curPath).isDirectory()) deleteFolder(curPath);
                    else fs.unlinkSync(curPath, err => {
                        throw err
                    });
                });
                fs.rmdirSync(url);
            }
        }
    })
});

router.post('/staff/update', function(req, res, next) {
    Project.update({
            code: req.body.code
        }, {
            $set: {
                staff: req.body.staff
            }
        },
        (err, result) => {
            if (err) {
                err.message = '项目人员更新失败'
                return next(err)
            }
            res.send({
                code: 0,
                data: result
            })
        })
});

router.post('/staff/find', function(req, res, next) {
    Project.findOne({
        code: req.body.code
    }, (err, proj) => {
        if (err) {
            err.message = '项目人员查询失败'
            return next(err)
        }
        res.send({
            code: 0,
            data: proj.staff
        })
    })
});

router.post('/plan/insert', function(req, res, next) {
    var isArr = Object.prototype.toString.call(req.body.plan) === '[object Array]';
    var whereStr = {
        code: req.body.code
    }
    var handle = (err, result) => {
        if (err) {
            err.message = '计划插入失败'
            return next(err)
        }
        res.send({
            code: 0,
            data: true
        })
    }
    if (isArr) Project.update(whereStr, {
        plan: req.body.plan
    }, handle)
    else Project.update(whereStr, {
        $push: {
            plan: req.body.plan
        }
    }, handle)
});

router.post('/plan/update', function(req, res, next) {
    Project.findOne({
        code: req.body.code
    }, (err, proj) => {
        if (err) {
            err.message = '没查到'
            return next(err)
        }
        var n = 0
        for (var i = proj.plan.length - 1; i >= 0; i--) {
            if (proj.plan[i]._id == req.body.task._id) {
                proj.plan[i] = req.body.task
                n++
            }
        }
        if (!n) return res.send({
            code: 50000
        })
        proj.save(err => {
            if (err) res.send({
                code: 50000
            })
            res.send({
                code: 0,
                data: n
            })
        })
    })
});

router.post('/plan/remove', function(req, res, next) {
    Project.update({
            code: req.body.code
        }, {
            $pull: {
                plan: {
                    _id: req.body._id
                }
            }
        },
        (err, result) => {
            if (err) {
                err.message = '计划删除失败'
                return next(err)
            }
            res.send({
                code: 0,
                data: result
            })
        }
    )
});

router.post('/plan/find', function(req, res, next) {
    Project.findOne({
            code: req.body.code
        },
        (err, proj) => {
            if (err) {
                err.message = '没查到'
                return next(err)
            }
            var result = proj.plan.filter(item => {
                return item._id == req.body._id
            })
            if (result.length === 1) result = result[0]
            res.send({
                code: 0,
                data: result
            })
        })
});

router.post('/stage/insert', function(req, res, next) {
    var whereStr = {
        code: req.body.code
    }
    Project.update(whereStr, {
        $push: {
            stage: req.body
        }
    }, function(err, result) {
        if (err) {
            err.message = '里程碑更新失败'
            return next(err)
        }
        res.send({
            code: 0,
            data: result
        })
    })

    Project.findOne({
        code: req.body.code
    }, function(err, result) {
        new Log({
            proj_name: result.name,
            proj_code: result.code,
            item: '添加里程碑',
        }).save()
    })
});

router.post('/stage/update', function(req, res, next) {
    Project.findOne({
        code: req.body.code
    }, (err, proj) => {
        if (err) {
            err.message = '没查到'
            return next(err)
        }
        var n = 0
        for (var i = proj.stage.length - 1; i >= 0; i--) {
            if (proj.stage[i]._id == req.body.stage._id) {
                proj.stage[i] = req.body.stage
                n++
            }
        }
        if (!n) res.send({
            code: 50000
        })
        proj.save(err => {
            if (err) {
                err.message = '项目更新失败'
                return next(err)
            }
            res.send({
                code: 0,
                data: n
            })
        })
    })

    Project.findOne({
        code: req.body.code
    }, function(err, result) {
        new Log({
            proj_name: result.name,
            proj_code: result.code,
            item: '修改里程碑',
        }).save()
    })
});

router.post('/stage-remove', function(req, res, next) {
    var whereStr = {
        code: req.body.code
    }
    Project.update(whereStr, {
        $pull: {
            stage: {
                _id: req.body._id
            }
        }
    }, function(err, result) {
        if (err) {
            err.message = '项目更新失败'
            return next(err)
        }
        res.send({
            code: 0,
            data: result
        })
    })

    Project.findOne({
        code: req.body.code
    }, function(err, result) {
        new Log({
            proj_name: result.name,
            proj_code: result.code,
            item: '删除里程碑',
        }).save()
    })
});

router.post('/schedule/refresh', function(req, res, next) {
    getSchedule(req.body.code, result => {
        res.send({
            code: 0,
            data: result
        })
    })
});

router.post('/schedule/find', function(req, res, next) {
    getProjectsSchedule()
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            next(err)
        })
});

module.exports = router;