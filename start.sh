#!/bin/bash
wget https://github.com/nickstanley574/freeCodeCampProjects/archive/master.zip
unzip master.zip -d ./tmp
mv ./tmp/*/* .
markdown README.md > body.html
rm index.html

./start-a.sh

httpd-foreground