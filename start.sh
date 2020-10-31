#!/bin/bash
wget https://github.com/nickstanley574/freeCodeCampProjects/archive/master.zip
unzip master.zip -d ./tmp
mv ./tmp/*/* .
markdown README.md > index.html

cat <<EOT >> index.html
<footer>
    <p>
        Generated: $(date)<br>
        SHA: $(curl -s https://api.github.com/repos/nickstanley574/freeCodeCampProjects/git/refs/heads/master | jq -r .object.sha)
    </p>
</footer>
EOT

httpd-foreground