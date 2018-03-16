# mydash.js

This repository contains code to help the evaluation of new adaptation rules implemented in the dash.js player

## Architecture Overview

![Architecture Overview](docs/architecture.png?raw=true "Architecture Overview")

## Metrics Dashboard

![Metrics Dashboard](docs/dashboard.png?raw=true "Metrics Dashboard")

## Quick Start

- Requirements

Docker: https://www.docker.com/community-edition

Docker Compose: https://docs.docker.com/compose/install/

- Procedure

1. Build and run the containers

cd docker

docker-compose up --build -d

2. Configure grafana

Access the dashboard: http://hostname:3000 (admin/admin)

If it's the first time, point the database to influxdb (user: root/root):

![Grafana config](docs/grafana-config.png?raw=true "Grafana config")


3. Access the player: http://hostname

Useful information:

- stop the containers: docker-compose down
