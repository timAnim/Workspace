var express = require('express');
var path = require('path');

var fs = require("fs");

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var projects = require('./routes/projects');
var staff = require('./routes/staff');
var log = require('./routes/log');
var upload = require('./routes/upload');
var interact = require('./routes/interact');
var blog = require('./routes/blog');
var workflow = require('./routes/workflow');
var ocr = require('./routes/ocr');
var palette = require('./routes/palettes');
var axdoc = require('./routes/axdoc');
var ptpreset = require('./routes/ptpreset');
var flowchart = require('./routes/flowchart');
var files = require('./routes/files');
var product = require('./routes/product');

var app = express();
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

app.set('views', path.join(__dirname, 'views'));
var ejs = require('ejs');
app.engine('html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

/*
  首先看是不是file 的get 请求, 定向到文件服务器
*/
app.get('/api/files/*', files)
app.get('/files/*', files)

/*
  其余所有的get 请求, 都定向到首页
*/
app.get('/', function(req, res, next) {
    const html = fs.readFileSync(path.resolve(__dirname, 'views/index.html'), 'utf-8')
    res.send(html)
})

app.use('/api/projects', projects);
app.use('/api/staff', staff);
app.use('/api/log', log);
app.use('/api/upload', upload);
app.use('/api/interact', interact);
app.use('/api/blogs', blog);
app.use('/api/workflow', workflow);
app.use('/api/ocr', ocr);
app.use('/api/palettes', palette);
app.use('/api/axdoc', axdoc);
app.use('/api/ptpreset', ptpreset);
app.use('/api/flowchart', flowchart);
app.use('/api/product', product);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404
    next(err)
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    if (!err) {
        err = new Error('UNCAUGHT_ERROR')
    }
    var now = new Date()
    err.ip = req.ip
    err.time = now.getHours() + ':' + now.getMinutes();

    // 用当天的日期当做 log 的文件名
    var filename = (now.getMonth() + 1) + '-' + now.getDate() + '.log'
    filename = path.resolve('./log', filename)
    var msg = `请求时间  ${err.time}\r\n请求的地址  ${err.req}\r\n错误的信息  ${err.message}\r\n访问的ip地址  ${err.ip}\r\n${err.stack.replace(/\s+/,'\r\n')}\r\n\r\n\r\n`

    var exists = fs.existsSync(filename)
    if (exists) {
        fs.appendFileSync(filename, msg)
    } else {
        fs.writeFileSync(filename, msg);
    }

    console.log(err.message)
    res.send({
            code: 5000,
            msg: err.message,
            data: msg
        })
        // render the error page
        // res.status(err.status || 500);
        // res.render('error');
});

module.exports = app;