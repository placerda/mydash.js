#!/bin/bash
curl -G 'http://localhost:8086/query?pretty=true' --data-urlencode "db=mydash" --data-urlencode "q=DELETE FROM \"client_quality\""
curl -G 'http://localhost:8086/query?pretty=true' --data-urlencode "db=mydash" --data-urlencode "q=DELETE FROM \"system_quality\""
