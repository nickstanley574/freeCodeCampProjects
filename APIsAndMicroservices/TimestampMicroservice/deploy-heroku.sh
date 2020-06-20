docker build .
heroku container:push web --app fcc-timestamp-ns574
heroku container:release web --app fcc-timestamp-ns574