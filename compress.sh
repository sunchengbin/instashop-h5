#! /bin/bash
echo 'js start compress'
cd static/js/

if [ $1 ]
then
    node compress $1
else
    node compress app
fi

echo 'css start compress'
cd ../css

if [ $2 ]
then
    node compress $2
else
    node compress app
fi
echo 'end'
