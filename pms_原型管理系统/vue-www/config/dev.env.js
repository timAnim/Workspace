var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var port = process.env.PORT || '80'
console.log(port)
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"//localhost:' + port + '/api"',
  WS_URL: '"ws://localhost:' + port + '"'
})
