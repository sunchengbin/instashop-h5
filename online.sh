#! /bin/bash

echo '切换到master'

if [ $3 ]
then
    git checkout $3
else
    git checkout master
fi
git pull

echo '开始构建'
./build.sh

echo '开始commit代码'

git commit -a -m $1

echo '开始push代码'
if [ $3 ]
then
    git push origin $3
else
    git push origin master
fi

echo '开始创建tag'
git tag $2

echo '开始push tag'
git push origin $2