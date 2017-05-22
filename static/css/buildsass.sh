#! /bin/bash
echo 'build sass start'

./sasscompress.sh default
./sasscompress.sh first
./sasscompress.sh second

echo 'build sass end'