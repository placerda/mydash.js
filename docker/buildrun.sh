#!/bin/bash
if [[ $1 == "stop" ]]; then
  docker stop mydash-proxy
  docker stop mydash-backend
  docker stop mydash-redis
  docker stop mydash-influxdb
  docker stop mydash-dashboard
  docker stop mydash-metrics
  docker ps
else
  #nginx (reverse proxy)
  docker stop mydash-proxy
  docker rm mydash-proxy
  docker run --name mydash-proxy -d -p 80:80 -v ~/mydash.js/client:/usr/share/nginx/html:ro -v ~/mydash.js/docker/nginx/nginx.conf:/etc/nginx/nginx.conf:ro nginx

  #node backend
  docker stop mydash-backend
  docker rm mydash-backend
  cd backend
  docker build -t placerda/mydash-backend .
  cd ..
  docker run --name mydash-backend -p 8080:8080 -d placerda/mydash-backend

  #redis memory cache database
  docker stop mydash-redis
  docker rm mydash-redis
  docker run --name mydash-redis -p 6379:6379 -d redis

  #time series database
  docker stop mydash-influxdb
  docker rm mydash-influxdb
  docker run --name mydash-influxdb -p 8086:8086 -v influxdb:/var/lib/influxdb -d influxdb

  #grafana
  docker stop mydash-dashboard
  docker rm mydash-dashboard
  docker run --name mydash-dashboard -d -p 3000:3000 -e "GF_SECURITY_ADMIN_PASSWORD=admin" -v grafana:/var/lib/grafana grafana/grafana

  #node metrics
  docker stop mydash-metrics
  docker rm mydash-metrics
  cd metrics
  docker build -t placerda/mydash-metrics .
  cd ..
  docker run --name mydash-metrics -d placerda/mydash-metrics

  docker ps
fi
