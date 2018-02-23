# instashop项目

## 技术栈
+ php
+ php smarty 模板
+ require.js 模块化
+ r.js 打包工具
+ handlebars.js js模板
+ zepto.js
+ sass [https://www.sass.hk/] [http://sass-lang.com/guide]
+ flexible.js 移动端适配方案

## 本地开发环境
+ php-fpm
+ nginx
+ nodejs

## 全局上线和构建
```
js和css的构建 ./build.sh
一步上线 ./online.sh
```

## js构建

```
进入 /static/js
关于js的压缩
1:首先搭建环境需要安装node.js
2:首先进入通过命令js进入js文件夹
(压缩的配置,如果新加入了js模块需要在js文件夹下面的build.js中配入模块命名和路径(和js/base/require-config.js中的模块配置路径相似))
3:执行node compress app(整个文件夹的压缩)
4:执行node compress app/test.js(单个文件的压缩)
5:压缩好的文件都会在dist文件夹看到(具体页面可以直接引用压缩后的js文件)
```

## css构建

```
进入 /static/css

sass的压缩方法
全量
执行 ./sasscompress.sh second
单文件
执行 ./sasscompress.sh second address

纯css的压缩方法
1:首先搭建环境需要安装node.js
2:首先进入通过命令css进入css文件夹
3:执行node compress app(整个文件夹的压缩)
4:执行node compress app/test.css(单个文件的压缩)
5:压缩好的文件都会在dist文件夹看到(具体页面可以直接引用压缩后的css文件)

```
