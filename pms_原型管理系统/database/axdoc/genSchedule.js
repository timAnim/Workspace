// 加载模块
var fs = require('fs')
var path = require('path')

// 全局变量
var root_path = path.resolve(__dirname, "..\\public\\files\\proto")
    // 数据库操作
var Project = require('../model/project.js')
var mongoose = require('mongoose');


module.exports = (code, cb) => {
    try {
        console.log('开始爬:' + code)
        const ROOT_PATH = path.resolve(root_path, code)
        return initSitemap(ROOT_PATH, code)
    } catch (err) {
        cb(null, err)
    }
    // 遍历所有页面
    function initSitemap(doc_url, code) {
        doc_url = path.resolve(doc_url, 'data', 'document.js')
        var con = fs.readFileSync(doc_url)
        var tmp = new Date().valueOf() + '.js'
        var tmp_url = path.resolve(__dirname, tmp)
        fs.writeFileSync(tmp_url, con)
        global.$axure = {}
        global.$axure.loadDocument = _doc => {
            var set = initStage(_doc.globalVariables, code)
            return initStaff(_doc.globalVariables, code, set)
        }
        require(tmp_url)
        fs.unlinkSync(tmp_url)
    }

    // 创建stage
    function initStage(vals, code) {
        vals.dt_story = vals.dt_story || vals.dt_proto
        if (vals.dt_story && vals.dt_design && vals.dt_debug && vals.dt_test && vals.dt_launch) {
            var stages = [{
                _id: new mongoose.Types.ObjectId(),
                date: new Date(vals.dt_story),
                title: '原型',
            }, {
                _id: new mongoose.Types.ObjectId(),
                date: new Date(vals.dt_design),
                title: '设计',
            }, {
                _id: new mongoose.Types.ObjectId(),
                date: new Date(vals.dt_debug),
                title: '联调',
            }, {
                _id: new mongoose.Types.ObjectId(),
                date: new Date(vals.dt_test),
                title: '测试',
            }, {
                _id: new mongoose.Types.ObjectId(),
                date: new Date(vals.dt_launch),
                title: '发版',
            }]

            var plans = [{
                _id: new mongoose.Types.ObjectId(),
                start: new Date(vals.dt_story),
                end: new Date(vals.dt_design),
                name: 'UI设计',
                prio: 'regular',
            }, {
                _id: new mongoose.Types.ObjectId(),
                start: new Date(vals.dt_design),
                end: new Date(vals.dt_debug),
                name: '程序开发',
                prio: 'regular',
            }, {
                _id: new mongoose.Types.ObjectId(),
                start: new Date(vals.dt_debug),
                end: new Date(vals.dt_test),
                name: '联调',
                prio: 'regular',
            }, {
                _id: new mongoose.Types.ObjectId(),
                start: new Date(vals.dt_test),
                end: new Date(vals.dt_launch),
                name: '测试',
                prio: 'regular',
            }]
            return {
                stage: stages,
                plan: plans,
                start: new Date(vals.dt_story),
                end: new Date(vals.dt_launch),
            }
        } else {
            return {}
        }
    }

    // 创建人员列表
    function initStaff(vals, code, set) {
        var staffs = [].concat(
            vals.ba.split(/[;|；]/ig),
            vals.qa.split(/[;|；]/ig),
            vals.dev.split(/[;|；]/ig),
            vals.ui.split(/[;|；]/ig),
            vals.author.split(/[;|；]/ig),
        )

        var proms = [],
            name;
        for (var i = staffs.length - 1; i >= 0; i--) {
            name = staffs[i].trim()
            if (name) {
                // proms.push(Ldap.findUserinfoIndistinctPrior(name, 1, 0, '90126703'))
            }
        }
        return Promise.all(proms)
            .then(data => {
                var res = []
                data.forEach(_d => {
                    if (_d.data) {
                        res.push(_d.data[0])
                    }
                })
                set.staff = res

                Project.updateOne({
                        code: code
                    }, {
                        $set: set
                    },
                    (err, result) => {
                        if (err) {
                            cb(null, err)
                        } else if (cb) {
                            cb(result)
                        }
                    })
            }).catch(err => {
                cb(null, err)
            })
    }
}