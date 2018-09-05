#!/usr/bin/env bash

sonar-scanner \
  -Dsonar.projectKey=bikeservice \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=27671b1e86cc14bc9103dffd60bab8ed5adb4b80
