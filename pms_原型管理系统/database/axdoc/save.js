const fs = require('fs')
const path = require('path')
const jsonfile = require('jsonfile')
const CFG_PATH = path.resolve(__dirname, '../../config.json')

module.exports = function(_config) {
  if (!_config) {
    return false
  }
  if (global._config) {
  	global._config = _config
  }
  jsonfile.writeFileSync(CFG_PATH, _config, { spaces: 2 })
}