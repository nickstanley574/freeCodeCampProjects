#!/bin/bash
wget https://github.com/nickstanley574/freeCodeCampProjects/archive/master.zip
unzip master.zip -d ./tmp
mv ./tmp/*/* .
markdown README.md > body.html
rm index.html
curl -s https://api.github.com/repos/nickstanley574/freeCodeCampProjects/git/refs/heads/master | jq -r .object.sha >> sha


cat <<EOT >> index.html
<head>
    <title>FreeCodeCamp Projects | nickstanley574</title>
    <link rel="stylesheet" href="style.css">
</head>
EOT

cat body.html >> index.html

cat <<EOT >> index.html
<hr>
<footer>
    <p>
        Generated: $(date)<br>
        SHA: $(cat sha)
    </p>
</footer>
EOT

httpd-foreground