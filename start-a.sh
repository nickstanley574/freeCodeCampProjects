#!/bin/bash

curl -s https://api.github.com/repos/nickstanley574/freeCodeCampProjects/git/refs/heads/master | jq -r .object.sha >> sha

cat <<EOT >> index.html
<head>
    <title>FreeCodeCamp Projects | nickstanley574</title>
    <link rel="stylesheet" href="style.css">
</head>
EOT

cat body.html >> index.html

cat <<EOT >> index.html
<footer>
    <hr>
    <p>
        Generated: $(date)<br>
        SHA: $(cat sha)<br>
        © Nicholas Stanley
    </p>
</footer>
EOT