const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio');
const filename = path.resolve(__dirname, '../resources', 'xmind-template.html')


function addXmindStyle(mind_data) {
    var content = fs.readFileSync(filename)
    var $ = cheerio.load(content, {
        decodeEntities: false
    })

    mind_data = JSON.stringify(mind_data)
    console.log(mind_data)
    console.log(JSON.parse(mind_data))

    // mind_data = mind_data.replace(/\"/ig, "\'")
    // $('#inp-val').val(mind_data)

    return $.html()
}

if (require.main == module) {
    console.log(addXmindStyle('<div>测试</div>'))
}

module.exports = addXmindStyle