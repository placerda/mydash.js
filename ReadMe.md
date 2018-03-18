# mydash.js

This repository contains a mechanism to evaluate the efficiency, fairness and stability of adaptation rules implemented in the dash.js player.

## Architecture Overview

![Architecture Overview](docs/architecture.png?raw=true "Architecture Overview")

## Metrics Dashboard

DEMO: to-be-done

## Quick Start

- Requirements

The proposed solution is based on containers so you will need to install docker in your machine.

Docker: https://www.docker.com/community-edition

Docker Compose: https://docs.docker.com/compose/install/

- Procedure

1. Build and run the containers

cd docker

docker-compose up --build -d

2. Configure grafana

Access the dashboard: http://host_name:3000 (admin/admin)

If it's the first time accessing grafana, follow the wizard and point the
database to influxdb as shown in the following screen (influxdb user/password: root/root).

![Grafana config](docs/grafana-config.png?raw=true "Grafana config")

3. Import the dashboard

In the Grafana screen select create then click on Import.

![Importing the Dashboard](docs/importing01.png?raw=true "Importing the Dashboard")

Select the file ./config/dashboard.json to reuse a dashboard already created, then select the database (mydash) created in step 2 as shown in the following picture:

![Importing the Dashboard](docs/importing02.png?raw=true "Importing the Dashboard")

After importing the dashboard you will see it in Grafana, probably there will be no data in the charts because its the first time you use it.

![Metrics Dashboard](docs/dashboard.png?raw=true "Metrics Dashboard")

4. Access the player (http://host_name/) then load and play the video to see it working.

Other information:

- to stop the containers: docker-compose down
