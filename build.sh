#! /bin/bash

if [ $# -eq 0 ]
then
    echo 'js start compress'
    cd static/js/
    node compress app

    echo 'css start compress'
    cd ../css
    node compress app

    echo 'change timestamp'
    cd ../../
    node js-version html
    node js-version html/templates
    node js-version html/act
    node js-version html/router
    node js-version html/act/domainfirst
    node js-version html/act/domainsecond
    node js-version html/act/bargain
else
    echo 'change timestamp'
    if [ $1 ]
    then
        node js-version $1
    else
        node js-version html
        node js-version html/templates
        node js-version html/act
        node js-version html/router
        node js-version html/act/domainfirst
        node js-version html/act/domainsecond
        node js-version html/act/bargain
    fi

    echo 'js start compress'
    cd static/js/

    if [ $2 ]
    then
        node compress $2
    else
        node compress app
    fi

    echo 'css start compress'
    cd ../css

    if [ $3 ]
    then
        node compress $3
    else
        node compress app
    fi
fi
echo 'compress end'