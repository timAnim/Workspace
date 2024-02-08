var fs = require('fs');
var request = require('request');
var open = require('open');
var notify = require('../notify')


module.exports = function publish(cb) {
  const __config = global._config
  const __doc = __config.documents[__config.currentDocument]
  const CONTENT_TITLE = __doc.xlsx.contentTitle
  const BROWSE_URL = __config.wiki.browseUrl

  // wiki配置的常量
  const WIKI_URL = __config.wiki.url + '/' + __doc.xlsx.contentId

  const HEADERS = __config.wiki.headers

  console.log(HEADERS)
  console.log(WIKI_URL)

  if (!__doc.xlsx.contentId) {
    return notify('文档Id不能为空')
  }
  var html = require('./genXlsxHtml.js');
  request({
    url: WIKI_URL,
    method: "GET",
    json: true,
    headers: HEADERS,
  }, function(error, response, body) {
    if (error) {
      return console.log('problem with request: ' + error.message);
    } else if (body.statusCode && body.statusCode != 200) {
      return console.log(body.message);
    } else if (body.version) {
      push(html, body.version.number + 1)
    }
  });

  function push(html, version) {

    request({
      url: WIKI_URL,
      method: "PUT",
      json: true,
      headers: HEADERS,
      body: setBody(html, version),
    }, function(error, response, body) {
      if (error) {
        return console.log('problem with request: ' + error.message);
      }
      console.log(body)
      cb('发布成功')
      open(BROWSE_URL + __doc.xlsx.contentId)
    });
  }

  function setBody(html, version) {
    return {
      "version": {
        "number": version
      },
      "title": CONTENT_TITLE,
      "type": "page",
      "body": {
        "storage": {
          "value": html,
          "representation": "storage"
        }
      }
    }
  }
}