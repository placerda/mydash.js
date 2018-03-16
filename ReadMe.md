- Requirements

Docker: https://www.docker.com/community-edition
Docker Compose: https://docs.docker.com/compose/install/

- Quick Start

1. Run the containers

docker-compose up --build

2. Configure grafana

Access the dashboard: http://localhost:3000 (admin/admin)

Point the database to influxdb
  host: influxdb:8086
  user: root/root

3. Access the player: http://localhost
