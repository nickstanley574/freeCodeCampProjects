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
heroku container:release web --app freecodecamp-projects-ns574
./heroku-restart.sh
echo
echo "Done."
