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
        SHA: $(cat sha)
    </p>
</footer>
EOT