#!/bin/bash
set -e

echo
echo "=== Build ==="
echo
docker build -t urlshortener:latest .
echo
echo "=== Tests ==="
echo
rm -f ./.db/temp.sqlite
export PORT=4012
export NODE_ENV=test
docker-compose down
docker-compose up -d
node tests.js $PORT
#docker-compose down
echo
# echo "=== Push ==="
# echo
# heroku container:push web --app fcc-timestamp-ns574
# sleep 2
# echo
# echo "=== Release ==="
# echo
# heroku container:release web --app fcc-timestamp-ns574
echo
echo "Done."
