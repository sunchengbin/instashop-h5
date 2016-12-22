#! /bin/bash
cd static/js/
echo 'js start compress'
node compress app
cd ../css
echo 'css start compress'
node compress app
echo 'end'
