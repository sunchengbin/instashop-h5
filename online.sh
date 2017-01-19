#! /bin/bash

echo '切换到master'
#git checkout master
echo '开始构建'
#./build.sh
echo '开始commit代码'
git commit -a -m $1
echo '开始push代码'
git pull
git push origin 4.0
echo '开始创建tag'
echo '开始push tag'