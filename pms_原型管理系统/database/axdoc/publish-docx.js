var fs = require('fs');
var request = require('request');
var open = require('open');


module.exports = function () {
  const __config = global._config
  const __doc = __config.documents[__config.currentDocument]
  const CONTENT_TITLE = __doc.docx.contentTitle
  const BROWSE_URL = __config.wiki.browseUrl

  // wiki配置的常量
  const WIKI_URL = __config.wiki.url + '/' + __doc.contentId
  const HEADERS = __config.wiki.headers
  if (!__doc.contentId) {
    return cb('文档Id不能为空')
  }
  var html = require('./genDocxHtml.js');
  request({
    url: WIKI_URL,
    method: "GET",
    json: true,
    headers: HEADERS,
  }, function (error, res, body) {
    if (error) {
      return console.log('problem with request: ' + error.message);
    }
    console.log('cur version' + body.version.number)
    // push(html, body.version.number + 1)
  });


  function push(version) {
    request({
      url: WIKI_URL,
      method: "PUT",
      json: true,
      headers: HEADERS,
      body: setBody(html, version),
    }, function (error, response, body) {
      if (error) {
        return console.log('problem with request: ' + error.message);
      }
      open(BROWSE_URL + __doc.contentId)
      console.log('published')
    });
  }

  function setBody(version) {
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