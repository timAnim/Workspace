// 加载模块
var fs = require('fs')
var path = require('path')
var cheerio = require('cheerio')

// 全局变量
var page_id_regex = "^[P|p]\\d\\d"
var des_label = "interact-des"
const PROTO_URL = "\\\\192.168.3.202\\proto_shared"
const url_arr = ["url_story", "url_task", "url_prd", "url_proto", "url_project", "url_qa", "proj_name", "author", "mobile"]
const staff_arr = ["staff_ba", "staff_leader", "staff_pm", "staff_ixd", "staff_qa", "staff_cc"]
const dt_arr = ["dt_pre", "dt_proto", "dt_dev", "dt_test", "dt_launch"]
const aim_scope_arr = ["aim_des", "scope_des"]


module.exports = proj => {
  var pages = [],
    sitemap = [],
    global_var = {},
    proj_info = {},
    revision_arr = [],
    intro = {},
    aim_scope = {},
    logical_concept_arr = [],
    nfr_arr = []

  intro.def_arr = []
  aim_scope.role_arr = []
  proj_info.staff = {}
  proj_info.stage = {}
  revision_arr[0] = []

  function crawler(resolve, reject) {
    initSitemap(proj)
    initInteract(proj)
    resolve({ pages, proj_info, revision_arr, intro, aim_scope, logical_concept_arr, nfr_arr })
  }

  /* 
     初始化文档的结构, 并将目录扁平化
  */
  function initSitemap(proj) {
    doc_url = path.resolve(proj.abs_path, 'data', 'document.js')
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
    }
    // 载入document文档, 获取目录结构
    require(tmp_url)
    fs.unlinkSync(tmp_url, err => {
      err.req = '删除临时文件失败'
      throw err
    })
  }

  /* 
   获取页面的data
*/
  function getPageData(page) {
    doc_url = path.resolve(proj.abs_path, 'files', page.page_original, 'data.js')
    if (!fs.statSync(doc_url)) return false
    // 读取文档信息
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
    global.$axure.loadCurrentPage = _data => {
      page.annotations = _data.page.annotations
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
    var PAGE_ID_REGEX = new RegExp(page_id_regex)
    // if (page.type === 'Wireframe' && PAGE_ID_REGEX.test(page.pageName)) {
    if (page.type === 'Wireframe') {
      if (PAGE_ID_REGEX.test(page.pageName)) { // 编号的页面
        pages.push({
          pageName: page.pageName.substring(3),
          pageId: page.pageName.substring(0, 3),
          url: page.url,
          page_original: page.pageName
        })
      } else { // 未编号的页面 不加入到 功能详情
        pages.push({
          pageName: page.pageName,
          pageId: '',
          url: page.url,
          page_original: page.pageName
        })
      }
    }

    if (page.children) {
      page.children.forEach(child => {
        flatten(child)
      })
    }
  }

  // 获取文档信息
  function getInfo($) {
    var nodes = []
    url_arr.forEach(prop => {
      nodes = $(`div[data-label=${prop}]`)
      if (nodes.length) {
        nodes.each(function (node) {
          var val = $(this).find('.text span').text();
          proj_info[prop] = val
        })
      }
    })

    staff_arr.forEach(prop => {
      nodes = $(`div[data-label=${prop}]`)
      if (nodes.length) {
        nodes.each(function (node) {
          var val = $(this).find('.text span').text();
          proj_info.staff[prop] = val
        })
      }
    })

    dt_arr.forEach(prop => {
      nodes = $(`div[data-label=${prop}]`)
      if (nodes.length) {
        nodes.each(function (node) {
          var val = $(this).find('.text span').text();
          proj_info.stage[prop] = val
        })
      }
    })

    aim_scope_arr.forEach(prop => {
      nodes = $(`div[data-label=${prop}]`)
      if (nodes.length) {
        nodes.each(function (node) {
          aim_scope[prop] = getDes($, this)
        })
      }
    })

    // 获取用户角色列表
    nodes = $(`div[data-label=role_des]`);
    if (nodes.length) {
      nodes.each(function (node) {
        var role_th = $(this).next().find('.text span').text();
        var role_des = getDes($, this)
        aim_scope.role_arr.push({
          role_th,
          role_des
        })
      })
    }

    // 初始化 历史版本信息
    nodes = $(`div[data-label=revision_des] > div`)
    if (nodes.length) {
      var val,
        m = 0,
        n = 0
      nodes.each(function (node, i) {
        val = $(this).find('.text span').text()
        if (!revision_arr[m]) revision_arr[m] = []
        revision_arr[m][n] = val || ''
        n++
        if (n > 5) {
          m++
          n = 0
        }
      })
    }

    // 初始化 简介信息
    nodes = $(`div[data-label=background_des]`)
    if (nodes.length) {
      nodes.each(function (node) {
        intro.background_des = getDes($, this)
      })
    }

    // 获取术语定义列表
    nodes = $(`div[data-label=def_des]`);
    if (nodes.length) {
      nodes.each(function (node) {
        var def_th = $(this).next().find('.text span').text();
        var def_des = getDes($, this)
        intro.def_arr.push({
          def_th,
          def_des
        })
      })
    }

    // 获取逻辑概念列表
    nodes = $(`div[data-label=logical_concept_des]`);
    if (nodes.length) {
      nodes.each(function (node) {
        var logical_concept_th = $(this).next().find('.text span').text();
        var logical_concept_des = getDes($, this)
        logical_concept_arr.push({
          logical_concept_th,
          logical_concept_des
        })
      })
    }

    // 获取非功能需求列表
    nodes = $(`div[data-label=nfr_des]`);
    if (nodes.length) {
      nodes.each(function (node) {
        var nfr_th = $(this).next().find('.text span').text();
        var nfr_des = getDes($, this)
        nfr_arr.push({
          nfr_th,
          nfr_des
        })
      })
    }
  }

  function getDes($, html) {
    var descriptions = $(html).find('.text span')
    var des = ''

    descriptions.each((id, ele) => {
      if ($(ele).text().replace(/(^\s*)|(\s*$)/g, "")) {
        des += '<p>' + $(ele).text().replace(/(^\s*)|(\s*$)/g, "") + '</p>'
      }
    })
    return des
  }

  // 获取用例字段信息
  function initInteract(proj) {
    pages.forEach(page => {
      var page_url = path.resolve(proj.abs_path, page.url);
      var html = fs.readFileSync(page_url)
      var $ = cheerio.load(html, {
        decodeEntities: false
      });

      getInfo($)
      getPageData(page)


      // 获取交互列表
      var nodes = $(`div[data-label=${des_label}]`);
      nodes.each(function (node) {
        var interactName = $(this).next().find('.text span').text()
        var interactDes = getDes($, this)

        page.interactList = page.interactList || []
        if (page.pageId) {
          page.interactList.push({
            interactId: page.pageId + interactName.substring(0, 3),
            interactName: interactName.substring(3),
            interactDes,
          });
        }
      });
    })
  }

  return new Promise(crawler)
}