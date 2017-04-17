#!/usr/bin/env bash
if [ $1 ]
then
    if [ $2 ]
    then
        echo ./$1/app/$2.scss
        if test -f ./$1/app/$2.scss
        then
            sass --style compressed ./$1/app/$2.scss dist/$1/app/$2.css
            echo dist/$1/app/$2.css
        else
            echo ./$1' folder not exist'
        fi
    else
        if test -d ./$1/app
        then
            for file in ./$1/app/*.scss
            do
            if test -f $file
            then
                resFile=`basename $file`
                sass --style compressed $file dist/$1/app/${resFile%.*}.css
                echo dist/$1/${resFile%.*}.css
            else
                echo $file 'is dir'
            fi
            done
        else
            echo ./$1' folder not exist'
        fi
    fi
else
    echo '请指明文件夹路径'
    echo 'example: ./sasscompress.sh first'
fi