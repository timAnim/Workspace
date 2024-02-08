# 字体图标库xbro

欢迎使用共济字体图标库, 请根据项目兼容情况选择 1.x版本, 2.0版本, 或多色图标

1.x与2.x内容命名不同, 两者不能兼容. 

## 图标库1.x打包

将svg图片文件放置于src文件夹中

```powershell
src/single_1.x/版本号_名称.svg
```

运行build_single_1x.bat文件打包

```powershell
build_single_1x.bat
```

## 图标库2.x打包

将svg图片文件放置于src文件夹中

```powershell
src/single_2.x/版本号_类型-功用-名称.svg
```

运行build_single_2x.bat文件打包

```powershell
build_single_2x.bat
```

## 多色图标打包

将svg图片文件放置于src文件夹中

```powershell
src/multi/版本号_功用-名称.svg
```

运行build_multi.bat文件打包

```powershell
build_multi.bat
```

## 图标发布

复制dist/内的全部内容到 D:\www\nginx-1.19.0\html\xdc\font（发布到 服务器）

```powershell
D:\www\nginx-1.19.0\html\xdc\font
```

