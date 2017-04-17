#! /bin/bash
echo "------监听sass文件更新并压缩-----"

sass --style compressed --watch first/app:dist/first/app;
