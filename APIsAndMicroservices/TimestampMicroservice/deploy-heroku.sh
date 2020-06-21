#!/bin/bash
set -e

echo
echo "=== Build ==="
echo
docker build .
echo
echo "=== Tests ==="
echo
PORT=6000 docker-compose down
PORT=6000 docker-compose up -d
node tests.js 6000
PORT=6000 docker-compose down
echo
echo "=== Push ==="
echo
heroku container:push web --app fcc-timestamp-ns574
sleep 2
echo
echo "=== Release ==="
echo
heroku container:release web --app fcc-timestamp-ns574
echo
echo "Done."
