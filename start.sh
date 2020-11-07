#!/bin/bash
wget https://github.com/nickstanley574/freeCodeCampProjects/archive/master.zip
unzip master.zip -d ./tmp
mv ./tmp/*/* .
markdown README.md > body.html
rm index.html

./start-a.sh

curl -s https://api.github.com/repos/nickstanley574/freeCodeCampProjects/git/refs/heads/master | jq -r .object.sha >> sha

httpd-foreground