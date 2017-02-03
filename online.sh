#! /bin/bash


if [ $3 ]
then
    echo '切换到'$3
    git checkout $3
else
    echo '切换到master'
    git checkout master
fi
git pull

echo '开始构建'
./build.sh

echo '开始commit代码'

git commit -a -m $1

echo 'push'
if [ $3 ]
then
    git push origin $3
else
    git push origin master
fi

echo 'create tag'
git tag $2

echo 'push tag'
git push origin $2