#!/bin/bash

# Give permission for everything in the directory
sudo chmod -R 777 /home/ubuntu/app

cd /home/ubuntu/app
sudo rm -rf /home/ubuntu/app/node_modules
yarn install
# yarn turbo build --filter=stixor-cms

# Navigate to your project directory and start the app
cd /home/ubuntu/app/apps/nk-associates-cms
pm2 start yarn --interpreter bash --name stixor-cms -- start