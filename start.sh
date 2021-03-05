#!/bin/bash

mode=$@

if [[ $mode = "build" ]]; then
  docker-compose up --build
elif [[ $mode = "dev" ]]; then
  docker-compose -f docker-compose-dev.yml up --build
else
  echo "Wrong argument specified: $mode"
  echo "Type 'start.sh dev' to set DEVELOPMENT mode, or 'start.sh build' to set PRODUCTION mode"
  exit 1
fi

exit 0