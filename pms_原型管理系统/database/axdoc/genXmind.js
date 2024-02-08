const child_process = require("child_process")
const path = require("path")
const crawler = require("./crawler")
const { Workbook, Topic, Marker, Zipper } = require("xmind")
const { mainModule } = require("process")


module.exports = genXmind

function genXmind(SRC_PATH) {
    const [workbook, marker] = [new Workbook(), new Marker()]
    // 全局设置
    const DIST_DIR = "./",
        SHEETTITLE = "页面一",
        DICT = {
            staff_ba: "需求方",
            staff_leader: '架构师',
            staff_pm: '产品经理',
            staff_ixd: '交互设计',
            staff_qa: '测试',
            staff_dev: '开发',
            staff_cc: '相关人员',
            dt_pre: '预审',
            dt_proto: '需求设计',
            dt_dev: '开发启动',
            dt_test: '测试',
            dt_launch: '发布'
        },
        WB_THEME = "business"

    return crawler(SRC_PATH)
        .then(proj => {

            // 根节点的名称,成员,里程碑
            const root_th = proj.proj_info.proj_name
            const staffs = proj.proj_info.staff
            const stages = proj.proj_info.stage

            // 创建页签,设置样式主题
            const sheet = workbook.createSheet(SHEETTITLE, root_th)
            workbook.theme(SHEETTITLE, WB_THEME)

            // 创建根节点
            const topic = new Topic({ sheet })
            const root_id = topic.cid()

            // 初始化打包器
            // 在输入目录的同级输出

            let filename = `${proj.proj_info.proj_name}_INTRO.xmind`
            filename = filename.replace(/\(|\)|\s/ig, '_')
            DIST_PATH = path.join(SRC_PATH, '..', filename)

            const zipper = new Zipper({
                path: path.join(SRC_PATH, '..'),
                filename,
                workbook
            })

            // 添加项目简介
            topic
                .on(root_id)
                .add({ title: "简介" })
                .on(topic.cid())
                .add({ title: _t(proj.intro.background_des) })

            // 用户
            topic
                .on(root_id)
                .add({ title: "用户" })

            const usr_tid = topic.cid()
            proj.aim_scope.role_arr.forEach(role => {
                topic
                    .on(usr_tid)
                    .add({ title: role.role_th })
                    .on(topic.cid())
                    .add({ title: _t(role.role_des) })
            })

            // 概念
            topic
                .on(root_id)
                .add({ title: "概念" })

            const ccpt_tid = topic.cid()
            proj.intro.def_arr.forEach(def => {
                topic
                    .on(ccpt_tid)
                    .add({ title: _t(def.def_th) })
                    .on(topic.cid())
                    .add({ title: _t(def.def_des) })
            })

            // 功能列表
            topic
                .on(root_id)
                .add({ title: "功能需求" })

            const func_tid = topic.cid()
            proj.proj_sitemap
                .filter(_tpc => _tpc.pageName == "功能需求")[0]
                .children
                .forEach(func => addChildren(func_tid, func))

            var pid /*存父节点的id*/
            function addChildren(pid, _tpc) {
                topic
                    .on(pid)
                    .add({ title: _tpc.pageName.replace(/^p\d\d/, '') })

                if (!_tpc.children || !_tpc.children.length) return false

                pid = topic.cid()

                _tpc.children.forEach(child => {
                    addChildren(pid, child)
                })
            }

            function _t(txt) {
                return txt.replace(/<[^>]+>/ig, '') || "无"
            }

            // 人员分工
            topic
                .on(root_id)
                .add({ title: "人员分工" })

            const staff_tid = topic.cid()
            for (const key in staffs) {
                if (!DICT[key] || !staffs[key]) continue
                topic
                    .on(staff_tid)
                    .add({ title: DICT[key] })
                    .on(topic.cid())
                    .add({ title: staffs[key] })
            }

            // 计划
            topic
                .on(root_id)
                .add({ title: "项目计划" })

            const plan_tid = topic.cid()
            for (const key in stages) {
                if (!DICT[key] || !stages[key]) continue
                topic
                    .on(plan_tid)
                    .add({ title: DICT[key] })
                    .on(topic.cid())
                    .add({ title: stages[key] })
            }

            return zipper.save()
                .then(status => {
                    status && console.log("end")

                    let cmd = "start " + DIST_PATH
                    return child_process.exec(cmd, (err, std, stderr) => {
                        console.log(std)
                        return Promise.resolve()
                    })
                })
        })
}

if (!module.parent && process.argv[2]) genXmind(process.argv[2])