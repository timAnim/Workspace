// 加载模块

const __config = require('../../config.json')
const __doc = __config.documents[__config.currentDocument]

console.log(__config.currentDocument)
console.log(__doc)