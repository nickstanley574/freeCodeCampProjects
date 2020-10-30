export PORT=3333
docker-compose down
docker build -t responsivewebdesign:latest .
docker-compose up -d
sleep 2
docker container ls