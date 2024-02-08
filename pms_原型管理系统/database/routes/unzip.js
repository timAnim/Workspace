/*
方法名：rar解压缩
参数：
 password
 zipFilePath
 tgtFilePath
例如：
 var password ="20170313",
 zipFilePath ="D:/test/18_20170313.rar",
 srcFilePath = "D:/test/18_20170313";
 cmdStr = "rar x -P20170313 D:\test\18_20170313.rar D:\test\18_20170313 -y"

 * */
var fs = require("fs");
var exec = require('child_process').exec;

exports.unrar = function (param, next) {
  console.log("param:", param);
  var cmdStr = "winrar x " + param.zipFilePath + " " + param.tgtFilePath + " -y";
  console.log("cmd:", cmdStr);
  fs.exists(param.tgtFilePath, function (exists) { //判断路径是否存在
    console.log(">> exists:", exists);
    try {
      if (exists) {
        exec(cmdStr, function (err, stdout, stderr) { //执行命令行
          next(true)
        });
      } else {
        fs.mkdir(param.tgtFilePath, function () { //创建目录
          exec(cmdStr, function (err, stdout, stderr) { //执行命令行
            next(true)
          });
        });
      }
    } catch (err) {
      next(false, err)
    }
  });
}