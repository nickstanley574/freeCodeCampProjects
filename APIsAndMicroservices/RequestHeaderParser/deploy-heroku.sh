
#!/bin/bash
set -e

echo
echo "=== Build ==="
echo
docker build .
echo
echo "=== Tests ==="
echo
PORT=3001 docker-compose down
PORT=3001 docker-compose up -d
node tests.js 3001
PORT=3001 docker-compose down
echo
echo "=== Push ==="
echo
heroku container:push web --app fcc-header-parser-ns574
sleep 2
echo
echo "=== Release ==="
echo
heroku container:release web --app fcc-header-parser-ns574
echo
echo "Done."