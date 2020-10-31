#!/bin/bash
set -xe
export PORT=3333
docker-compose down
docker build -t freecodecamp-projects-ns574:latest .
docker-compose up -d
sleep 2
docker container ls
echo "http://localhost:3333/"