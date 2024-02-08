// 加载模块
const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path')
const addStyle = require('./addDocxStyle.js')
const crawler = require('./crawler.js')
const child_process = require("child_process")

// 为Date对象的原型链 增加方法
require('./dateFormat.js')

const IMAGE_PATH = 'images'

const LOGO_PATH = path.join(__dirname, '../public/files/image/xbrother_logo.png')

var page_id_regex = new RegExp("[封面|简介|术语定义|目标与范围|非功能性需求]")


var DIST_PATH,
    SRC_PATH, // 项目的绝对路径
    $ // html 文档

module.exports = genDocx

function genDocx(_src_path) {



    SRC_PATH = _src_path
    $ = cheerio.load('<article></article>', {
        decodeEntities: false
    })

    return crawler(SRC_PATH)
        .then(proj => {

            let filename = `${proj.proj_info.proj_name || "项目"}_PRD.html`
            filename = filename.replace(/\(|\)|\s/ig, '_')
            DIST_PATH = path.join(SRC_PATH, '../../output', filename)
            createHtml(proj)
            return Promise.resolve("api/files/output/" + filename)
        })
}

function createHtml({ pages, proj_info, revision_arr, intro, aim_scope, logical_concept_arr, nfr_arr }) {

    addCover()

    if (checkPage('简介')) {
        addH1('简介')
        addH2('项目背景')
        addPara(intro.background_des)
    }

    if (checkPage('术语定义')) {
        addH2('术语定义')
        intro.def_arr.forEach(def => {
            addH3(def.def_th)
            addPara(def.def_des)
        })
    }

    if (checkPage('目标与范围')) {
        addH1('目标与范围')
        addH2('目标')
        addPara(aim_scope.aim_des)
        addH2('范围')
        addPara(aim_scope.scope_des)
        addH2('逻辑概念')
        logical_concept_arr.forEach(logical_concept => {
            addH3(logical_concept.logical_concept_th)
            addPara(logical_concept.logical_concept_des)
        })
    }

    addH1('系统功能')

    var img_url
    pages.forEach(page => {
        if (!page.pageId) return false
            // 此处分页
        addH2(page.pageId + page.pageName) // H2页面标题
            // 原型图
        img_url = path.join(SRC_PATH, IMAGE_PATH, page.url.replace('html', 'png'))

        if (fs.existsSync(img_url)) addLink(img_url)

        if (page.interactList) {

            addH3("用例列表")
            var table = [
                    ["编号", "用例"],
                ]
                // 添加交互的清单
            page.interactList.forEach(interact => {
                table.push([interact.interactId, interact.interactName])
            })
            createTable(table)

            addH3("用例说明")
                // 添加交互的说明
            page.interactList.forEach(interact => {
                // 文字处理换行
                addH4(interact.interactId.toUpperCase() + interact.interactName)
                addPara(interact.interactDes)
            })
        }
    })



    if (checkPage('非功能性需求')) {
        addH1('非功能性需求')
        nfr_arr.forEach(nfr => {
            addH2(nfr.nfr_th)
            addPara(nfr.nfr_des)
        })
    }

    fs.writeFileSync(DIST_PATH, addStyle($.html()))

    function addCover() {

        $('article').append(`<div class='cover'><img style="width:280px" src="${getImg(LOGO_PATH)}"/></div>`)
        addPara(proj_info.proj_name || "项目" + '需求规格说明书')

        for (const key in proj_info.stage) {
            var val = proj_info.stage[key]
            val = new Date(val).format('yyyy-MM-dd') + " " + key
        }
        var coverTable = [
            ['信息分类', '系统设计'],
            ['涉密等级', '内部公开'],
            ['责任人', proj_info.author || "-"],
            ['起草人', proj_info.author || "-"],
            ['授权范围', '深圳市共济科技有限公司'],
            ['涉密截止时间', '至文件废止日'],
        ]
        createTable(coverTable)

        addPara('相关负责人')
        createTable([
            ['原始需求地址', proj_info.url_story || "-", proj_info.staff.staff_ba || "-"],
            ['任务地址', proj_info.url_task || "-", proj_info.staff.staff_leader || "-"],
            ['需求规格文档', proj_info.url_prd || "-", proj_info.staff.staff_pm || "-"],
            ['原型地址', proj_info.url_proto || "-", proj_info.staff.staff_ixd || "-"],
            ['项目管理地址', proj_info.url_project || "-", proj_info.staff.staff_leader || "-"],
            ['测试用例', proj_info.url_qa || "-", proj_info.staff.staff_qa || "-"],
        ])
        if (revision_arr.length && revision_arr[0][0]) {
            addPara('版本修订记录')
            createTable(revision_arr)
        }
    }


    function checkPage(name) {
        var res = false
        pages.forEach(page => {
            if (page.pageName == name) res = true
        })
        return res
    }
}

function createTable(con) {
    if (con.length < 1) {
        return false
    }
    var _con = `<div><table><tbody>`
    con.forEach((row, i) => {
        _con += '<tr>'
        row.forEach(col => {
            _con += `<td><p>${col}</p></td>`
        })
        _con += '</tr>'
    })
    _con += '</tobody></table></div>'
    $('article').append(_con)
}

function addH1(text) {
    $('article').append(`<h1>${text}</h1>`)
}

function addH2(text) {
    $('article').append(`
		<h2>${text}</h2>
	`)
}

function addH3(text) {
    $('article').append(`
				<h3>${text}</h3>
			`)
}

function addH4(text) {
    $('article').append(`
				<h4>${text}</h4>
			`)
}

function addPara(text) {
    $('article').append(`
			<p>${text}</p>
		`)
}

function addLink(link_url) {
    $('article').append(`
			<p><img src='${getImg(link_url)}'></p>
		`)
}

var buffer, img

function getImg(img_url) {
    img = fs.readFileSync(img_url)
    buffer = new Buffer.from(img, 'binary')
    return 'data: image/png;base64,' + buffer.toString('base64')
}


if (!module.parent && process.argv[2]) genDocx(process.argv[2])