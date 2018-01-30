- Quick Start

1. Create Volumes

docker volume create influxdb
docker volume create grafana

2. Run the containers

backend
docker build -t placerda/mydash-backend .
docker run --name mydash-backend -p 8080:8080 -d placerda/mydash-backend

redis memory cache database
docker run --name mydash-redis -p 6379:6379 -d redis

time series database
docker run --name mydash-influxdb -p 8086:8086 -v influxdb:/var/lib/influxdb -d influxdb

grafana
docker run --name mydash-dashboard -d -p 3000:3000 -e "GF_SECURITY_ADMIN_PASSWORD=admin" -v grafana:/var/lib/grafana grafana/grafana

proxy (nginx)
docker run --name mydash-proxy -d -p 80:80 -v ~/mydash.js/client:/usr/share/nginx/html:ro -v ~/mydash.js/docker/nginx/nginx.conf:/etc/nginx/nginx.conf:ro nginx

or ./buildrun.sh

3. Create database

docker exec -it mydash-db /bin/bash

influx

create database mydash

show databases

quit

exit

4. Configure grafana

point to influxdb docker.for.mac.localhost:8086 user root/root

(using docker.for.mac.localhost because I'm using Mac)

5. Access the systems

dashboard: http://localhost:3000 (admin/admin)

player: http://localhost
