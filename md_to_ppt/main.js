let fs = require("fs")
let path = require("path")
let exec = require("child_process").exec
let args = process.argv.splice(2)


if (!args[0]) {
    process.stdin.resume()
    process.stdin.setEncoding("utf-8")
    process.stdout.write("请将md文件拖拽至此程序中执行")
    process.stdin.emit("end")
    return false
}

let file = args[0]
let filename = args[0].split("/")
filename = filename[filename.length - 1]

filename = filename.replace(".md", ".html")
let outpath = path.join(__dirname, filename)

// let str = "pandoc " + file + " -o " + outpath + " -t revealjs -s -V theme=sky"
let str = "pandoc " + file + " -o " + outpath + " -t revealjs -s"

exec(str, err => {
    if (err) console.log(err)
    let con = fs.readFileSync(outpath, "utf-8")
    con = con.replace(/https:\/\/unpkg.com\/reveal.js@\^4\//g, "./reveal.js")

    fs.writeFileSync(outpath, con)
    console.log('导出成功')
    process.stdin.emit("end")
})