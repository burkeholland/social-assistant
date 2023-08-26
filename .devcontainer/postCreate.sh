#!/usr/bin/env bash

# Install the Azure Static Web Apps CLI
npm install -g @azure/static-web-apps-cli@1.1.3

# Run npm install to install dependencies
npm install

# Install the Azure Functions Core Tools
npm install -g azure-functions-core-tools@4 --unsafe-perm true

## Switch to the api directory and npm install
cd api
npm install