var outputInspect = require('../axdoc/output-docx')
var [node, path, ...code] = process.argv

// router.post('/output-docx', (req, res) => {
//     var code = req.body.code
//     console.log('收到导出docx的请求:' + code)
//     outputDocx(code, result => {
//         console.log('已经生成文件:' + result)
//         res.send(result)
//     })
// })

console.log('收到导出outputInspect的请求:' + code)
outputInspect(code, result => {
    console.log('已经生成文件:' + result)
})