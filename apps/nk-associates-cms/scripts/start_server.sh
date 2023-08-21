#!/bin/bash

export PATH=$PATH:/home/ubuntu/.npm-global/bin

# Give permission for everything in the directory
sudo chmod -R 777 /home/ubuntu/app

cd /home/ubuntu/app
sudo rm -rf /home/ubuntu/app/node_modules
yarn install
# yarn turbo build --filter=stixor-cms

# Navigate to your project directory and start the app
cd /home/ubuntu/app/apps/nk-associates-cms
pm2 kill
pm2 start ./scripts/pm2.sh --name nk-cms
