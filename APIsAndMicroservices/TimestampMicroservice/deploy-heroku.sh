docker build .
heroku container:push web --app fcc-timestamp-ns574
sleep 2
heroku container:release web --app fcc-timestamp-ns574