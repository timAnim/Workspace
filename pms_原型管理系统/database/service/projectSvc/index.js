var fs = require('fs')
var services = {}

var svcList = fs.readdirSync(__dirname)
  .filter(_f => {
    return _f !== 'index.js' && /\.js$/.test(_f)
  })

svcList.map((_f, i) => {
  _f = _f.replace(/\.js$/, '')
  services[_f] = require('./' + _f)
})

module.exports = services