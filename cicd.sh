docker build -t urlshortener:latest .
#!/bin/bash
set -e

echo
echo "=== Build ==="
echo
docker build -t freecodecamp-projects-ns574:latest .
echo
echo
echo "=== Push ==="
echo
heroku container:push web --app freecodecamp-projects-ns574
sleep 2
echo
echo "=== Release ==="
echo
echo "local:  $(cat .git/refs/remotes/origin/master)"
echo "github: $(curl -s https://api.github.com/repos/nickstanley574/freeCodeCampProjects/git/refs/heads/master | jq -r .object.sha)"
heroku container:release web --app freecodecamp-projects-ns574
sleep 1
heroku ps:restart --app freecodecamp-projects-ns574
echo
echo "Done."
