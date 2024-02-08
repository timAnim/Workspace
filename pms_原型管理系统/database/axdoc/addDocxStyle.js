const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio');
const filename = path.resolve(__dirname, 'docx-template.html')


function addStyle(article) {
    var content = fs.readFileSync(filename)
    var $ = cheerio.load(content, {
        decodeEntities: false
    })
    $('.content').append(article)
    return $.html()
}

if (require.main == module) {
    console.log(addStyle('<div>测试</div>'))
}

module.exports = addStyle