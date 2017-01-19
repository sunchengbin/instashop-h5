#! /bin/bash

echo '切换到master'
#git checkout master
git pull
echo '开始构建'
#./build.sh
echo '开始commit代码'
git commit -a -m $1
echo '开始push代码'
#git push origin master
echo '开始创建tag'
git tag $2
echo '开始push tag'
git push origin $2