#!/usr/bin/env bash
if [ $1 ]
then
    for file in ./$1/app/*.scss
    do
    if test -f $file
    then
        resFile=`basename $file`
        sass --style compressed $file dist/$1/app/${resFile%.*}.css
        echo dist/$1/${resFile%.*}.css
    else
        echo $file 'dir'
    fi
    done
else
    echo '请指明文件夹路径'
fi