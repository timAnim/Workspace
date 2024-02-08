var gulp = require('gulp')
var iconfont = require('gulp-iconfont')
var iconcss = require('gulp-iconfont-css')
var template = require('gulp-template')
var rename = require('gulp-rename')
const svgstore = require("gulp-svgstore")
const svgmin = require("gulp-svgmin")
var fs = require('fs')
var path = require('path')
const cheerio = require("cheerio")


// 将单色图标打包
gulp.task('single_1.x', () => genFont("xbro", "1.x"))
gulp.task('single_dist_1.x', () => distHtml("xbro", "1.x"))

// 将单色图标打包
gulp.task('single_2.x', () => genFont("xb", "2.x"))
gulp.task('single_dist_2.x', () => distHtml("xb", "2.x"))


function genFont(name, version) {
    // 此处仅打包字体，默认是按照版本号+名字排序
    return gulp.src(['./src/single_' + version + '/*.svg'])
        // 去掉版本号
        .pipe(rename(function(fl) {
            fl.basename = fl.basename.split("_")[1]
        }))
        // 打包css
        .pipe(iconcss({
            fontName: name,
            targetPath: "./" + name + ".css",
            fontPath: './'
        }))
        // 打包字体
        .pipe(iconfont({
            fontName: name,
            prependUnicode: true,
            fontHeight: 1024,
            formats: ['ttf', 'eot'],
            normalize: true,
            timestamp: Math.round(Date.now() / 1000),
            metadata: "共济科技版权所有",
        }))
        // 放到目标目录
        .pipe(gulp.dest('./dist/single_' + version))
}

function distHtml(name, version) {
    var icons = fs.readdirSync('./src/single_' + version)
    var versions = []
    var arr = []
    icons.map(function(icon) {
        arr.push({
            ver: icon.split("_")[0],
            name: icon.split("_")[1].replace(/\.\w+$/, '')
        })
    })

    arr.sort((a, b) => {
        return a.name.localeCompare(b.name)
    })

    arr.map(function(item, i) {
        versions[i] = item.ver
        icons[i] = item.name
    })

    return gulp.src('./template/single_' + version + '/index.html')
        .pipe(template({ name, version, icons, versions }))
        .pipe(gulp.dest('./dist/single_' + version))
}


// 将多个SVG合并成一个
gulp.task("multi", () => {
    return gulp
        .src("src/multi/*.svg")
        .pipe(svgmin(file => {
            const prefix = path.basename(file.relative, path.extname(file.relative))
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest("dist/multi"))
})

// 将多色图标打包
gulp.task('multi_dist', () => {
    var arr = fs.readdirSync("./src/multi")
    var icons = []
    arr.map(function(icon) {
        icons.push(icon.replace(".svg", ''))
    })

    icons.sort((a, b) => {
        return a.localeCompare(b)
    })

    var svgstr = fs.readFileSync("./dist/multi/multi.svg", "utf-8")

    var $ = cheerio.load(svgstr)
    $('svg').attr("style", "position:absolute;height:0;width:0;")

    svgstr = $('svg').parent().html()

    return gulp.src('./template/multi/index.html')
        .pipe(template({ icons, svgstr }))
        .pipe(gulp.dest('./dist/multi'))
})

gulp.task("multi_js", () => distScipt())

function distScipt() {
    var svgstr = fs.readFileSync("./dist/multi/multi.svg", "utf-8")

    var $ = cheerio.load(svgstr)
    $('svg').attr("style", "position:absolute;height:0;width:0;")

    svgstr = $('svg').parent().html()
    return gulp.src('./template/multi/multi_cl_svg.js')
        .pipe(template({ svgstr }))
        .pipe(gulp.dest('./dist/multi'))
}

gulp.task('single_1.x', gulp.series(['single_1.x', 'single_dist_1.x']))
gulp.task('single_2.x', gulp.series(['single_2.x', 'single_dist_2.x']))
gulp.task('multi', gulp.series(['multi', 'multi_dist', 'multi_js']))