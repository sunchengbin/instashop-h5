#! /bin/bash

if [ $3 ]
then
    echo '切换到'$3
    git checkout $3
else
    echo '切换到master'
    git checkout master
fi
echo 'pull代码'
git pull

echo '开始构建'
#./build.sh

if [ $2 ]
then
    echo '开始commit代码'$2
    git commit -a -m $2
else
    echo '开始commit代码,tag'$1'上线'
    git commit -a -m 'tag'$1'上线'
fi

if [ $3 ]
then
    echo '开始push代码'$3
    git push origin $3
else
    echo '开始push代码master'
    git push origin master
fi

echo 'create tag'
#git tag $1

echo 'push tag'
#git push origin $1