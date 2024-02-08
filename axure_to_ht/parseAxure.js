// 加载模块
var fs = require('fs')
var path = require('path')
const PROJ_PATH = "./ax_output"

module.exports = proj => {
    var pages = [],
        sitemap = [],
        global_var = {},
        objects = {},
        obj_data = []
    initSitemap()
    initObjects()
    var styles = getStyles()

    return {
        pages,
        sitemap,
        objects,
        styles,
        obj_data
    }
    /* 
       初始化文档的结构, 并将目录扁平化
    */
    function initSitemap() {
        doc_url = path.resolve(PROJ_PATH, 'data', 'document.js')
        var con = fs.readFileSync(doc_url, err => {
            err.req = '非法的Axure导出文档'
            throw err
        })
        /*
          此处需要执行下 document文档, 所以读文件内容, 重新加载一遍
          todo: 寻找可以每次都执行的方式
        */
        var tmp = new Date().valueOf() + '.js'
        var tmp_url = path.resolve(__dirname, tmp)
        fs.writeFileSync(tmp_url, con, err => {
            err.req = '写入临时文件失败'
            throw err
        })
        // 重写$axure里面的loadDocument 方法, 用户获取document文档中的结构
        global.$axure = {}
        global.$axure.loadDocument = _doc => {
            sitemap = _doc.sitemap.rootNodes
            global_var = _doc.globalVariables
            sitemap.forEach(page => {
                flatten(page)
            })
            fs.writeFileSync("./ax_doc.json", JSON.stringify(_doc))
        }
        // 载入document文档, 获取目录结构
        require(tmp_url)
        fs.unlinkSync(tmp_url, err => {
            err.req = '删除临时文件失败'
            throw err
        })
    }

    // 页面扁平化递归
    function flatten(page) {
        if (page.type === 'Wireframe') {
            pages.push({
                pageName: page.pageName,
                pageId: '',
                url: page.url,
                page_original: page.pageName
            })
        }

        if (page.children) {
            page.children.forEach(child => {
                flatten(child)
            })
        }
    }

    // 解析页面
    function initObjects() {
        doc_url = path.resolve(PROJ_PATH, 'files', 'axpage', 'data.js')
        var con = fs.readFileSync(doc_url, err => {
            err.req = '非法的Axure导出文档'
            throw err
        })
        /*
          此处需要执行下 document文档, 所以读文件内容, 重新加载一遍
          todo: 寻找可以每次都执行的方式
        */
        var tmp = new Date().valueOf() + '.js'
        var tmp_url = path.resolve(__dirname, tmp)
        fs.writeFileSync(tmp_url, con, err => {
            err.req = '写入临时文件失败'
            throw err
        })
        // 重写$axure里面的loadDocument 方法, 用户获取document文档中的结构
        global.$axure = {}
        global.$axure.loadCurrentPage = _doc => {
            objects = _doc.objectPaths
            obj_data = _doc.page.diagram.objects
            fs.writeFileSync("./ax_page.json", JSON.stringify(_doc))
        }
        // 载入document文档, 获取目录结构
        require(tmp_url)
        fs.unlinkSync(tmp_url, err => {
            err.req = '删除临时文件失败'
            throw err
        })
    }

    function getStyles() {
        var css2json = require("./css2json.js")
        var css_url = path.resolve('./ax_output', 'files', 'axpage', 'styles.css')
        var css = fs.readFileSync(css_url).toString()
        return css2json(css)
    }
}