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
cat .git/refs/remotes/origin/master
heroku container:release web --app freecodecamp-projects-ns574
sleep 1
heroku ps:restart --app freecodecamp-projects-ns574
echo
echo "Done."
