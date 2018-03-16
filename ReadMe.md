- Requirements

Docker: https://www.docker.com/community-edition

Docker Compose: https://docs.docker.com/compose/install/

- Quick Start

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
