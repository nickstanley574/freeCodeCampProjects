#!/bin/bash
set -e

BRANCH=$(git rev-parse --abbrev-ref HEAD --)

git push origin $BRANCH

echo -e "\n=== Build ===\n"

docker build -t filemetadata:latest .

echo -e "\n=== Tests ===\n"

echo "NO TESTS YET!!!"
sleep 3

echo -e "\n=== Push ===\n"

docker tag filemetadata registry.heroku.com/fcc-filemetadata-ns574/web
docker push registry.heroku.com/fcc-filemetadata-ns574/web
sleep 2

echo -e "\n=== Release ===\n"

heroku container:release web --app fcc-filemetadata-ns574

echo -e "Done."
