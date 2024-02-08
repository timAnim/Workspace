var multiparty = require("multiparty");
var util = require("util");
var fs = require("fs");
var express = require("express");
var router = express.Router();
// var unzip = require("unzip2");
var unzip = require("./unzip");
var path = require("path");
var gm = require("gm");

const PATH = path.resolve(__dirname, "../public/files/image");
const RELA = "api/files/image";

router.post("/file", function(req, res, next) {
    var form = new multiparty.Form({
        uploadDir: PATH
    });

    form.parse(req, function(err, fields, files) {
        var inputFile = files.file[0];
        var size = 240;
        var uploadedPath = inputFile.path;
        var dstPath = PATH + "/" + inputFile.originalFilename;
        var resPath = RELA + "/" + inputFile.originalFilename;

        gm(dstPath)
            .resize(20, 20)
            .write(path.resolve(PATH + "/thumb.jpg"), function(err) {
                if (!err) console.log("done");
            });

        fs.rename(uploadedPath, dstPath, function(err) {
            if (err) {
                return next(err)
            }
            fs.unlink(path.resolve(uploadedPath), err => {
                console.log("cannot be del");
            });
            res.send({
                fields: fields,
                resPath: resPath
            });
        });
    });
});

/**
 *   此处用户上传原型和设计
 * 
 */

router.post("/zip", function(req, res, next) {
    const fPATH = path.resolve(__dirname, "../public/files");
    const fRELA = "api/files";

    var form = new multiparty.Form({
        uploadDir: fPATH
    });

    form.parse(req, function(err, fields, files) {
        // 获取参数
        var inputFile = files.file[0];
        var type = fields.type[0];
        var code = fields.code[0];
        if (!type || !code) {
            return next(new Error('缺少类型或项目代号'))
        }
        var dstName = code + ".zip";
        var uploadedPath = inputFile.path; //上传路径

        console.log(uploadedPath)

        // 路径配置
        var absDir = path.join(fPATH, type, code); //绝对路径
        var dstPath = path.join(absDir, dstName); //目标路径
        var unzipDir = path.join(fPATH, code + '_upload') //解压路径
        var unzipName = path.join(unzipDir, dstName); //解压文件名

        // 相对路径
        var relDir = fRELA + "/" + type + "/" + code; //相对路径
        var relPath = relDir + "/" + dstName;

        /*
          创建上传的文件夹
        */
        if (!fs.existsSync(unzipDir)) {
            fs.mkdirSync(unzipDir);
        }

        /* 
        上传的zip文件移动到目标文件夹
        文件名以代号命名, 方便下载
        */
        fs.renameSync(uploadedPath, unzipName, err => {
            err.message = '移动文件失败'
            return next(err)
        });

        /*
          解压到当前文件夹
        */
        var entrance = path.join(relDir, "index.html");
        unzip.unrar({
            zipFilePath: unzipName,
            tgtFilePath: unzipDir,
        }, (result, err) => {
            if (err) {
                err.message = '解压文件夹失败'
                return next(err)
            }
            /*
      解压完成后读取目标目录
      moveuper 不处理错误, 如果有错误 抛到外层处理
    */
            var zipFiles = fs.readdirSync(unzipDir);
            try {
                if (zipFiles.length < 3) { // 处理两层 压缩的情况
                    zipFiles.forEach(filename => {
                        var stat = fs.statSync(path.join(unzipDir, filename));
                        if (stat.isDirectory()) moveUpper(filename, unzipDir);
                    });
                }
                // 重新读取下加压好的文件夹
                zipFiles = fs.readdirSync(unzipDir);
                var reg = /index.html$/i
                var indexNum = 0
                zipFiles.forEach(filename => {
                    if (reg.test(filename)) indexNum++
                });
                if (!indexNum) {
                    var err = new Error('文件夹不含入口文件')
                    deleteFolder(unzipDir)
                    return next(err)
                }
            } catch (err) {
                deleteFolder(unzipDir)
                return next(err)
            }
            // 检测好了, 上传的文件没问题, 将原来的文件替换掉
            if (!fs.existsSync(absDir)) {
                fs.mkdirSync(absDir);
            }
            replaceFiles(unzipDir, absDir)
            res.send({
                code: 0,
                msg: "操作成功",
                data: {
                    resPath: relPath,
                    entrance: entrance,
                    type: type,
                }
            });
        });
    });

    /*
    replaceFiles 的错误 抛出到 catch 处理
    创建 文件夹 的错误也直接抛出去
    如果有文件则删除再新建
    */

    function replaceFiles(unzipDir, absDir) {
        if (fs.existsSync(absDir)) {
            deleteFolder(absDir)
            fs.mkdirSync(absDir);
        }

        var files = fs.readdirSync(unzipDir);
        files.forEach(file => {
            var curPath = path.join(unzipDir, file);
            var dstPath = path.join(absDir, file);
            fs.renameSync(curPath, dstPath, err => {
                console.log(err)
                err.message = '注意文件夹恢复失败'
                err.req = 'api/files/zip'
                return next(err)
            })
        });

        deleteFolder(unzipDir)
    }

    function deleteFolder(url) {
        if (fs.existsSync(url)) {
            var files = fs.readdirSync(url);
            files.forEach(file => {
                var curPath = path.join(url, file);
                if (fs.statSync(curPath).isDirectory()) deleteFolder(curPath);
                else fs.unlinkSync(curPath, err => {
                    throw err
                });
            });
            fs.rmdirSync(url);
        }
    };

    function moveUpper(filename, absDir) {
        var files = fs.readdirSync(path.join(absDir, filename));
        files.forEach(child => {
            var oPath = path.join(absDir, filename, child);
            var nPath = path.join(absDir, child);
            fs.renameSync(oPath, nPath, err => {
                throw err
            });
        });
    };
});

module.exports = router;