#! /bin/bash

echo '切换到master'
git checkout 4.0
git pull
echo '开始构建'
#./build.sh
echo '开始commit代码'
git commit -a -m $1
echo '开始push代码'
git push origin 4.0
echo '开始创建tag'
git tag $2
echo '开始push tag'
git push origin $2