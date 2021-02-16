#!/bin/bash

mode=$@

if [[ $mode = "build" ]]; then
  docker-compose up --build
elif [[ $mode = "dev" ]]; then
  docker-compose -f docker-compose-dev.yml up --build
fi

echo "Wrong argument specified: $mode"
echo "Type 'start.sh dev' to set DEVELOPMENT mode, or 'start.sh build' to set PRODUCTION mode"
exit 1