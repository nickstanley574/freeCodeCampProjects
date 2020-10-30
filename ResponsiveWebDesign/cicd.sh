docker build -t urlshortener:latest .
#!/bin/bash
set -e

echo
echo "=== Build ==="
echo
docker build -t responsivewebdesign:latest .
echo
echo
echo "=== Push ==="
echo
heroku container:push web --app fcc-responsivewebdesign-ns574
sleep 2
echo
echo "=== Release ==="
echo
heroku container:release web --app fcc-responsivewebdesign-ns574
echo
echo "Done."
