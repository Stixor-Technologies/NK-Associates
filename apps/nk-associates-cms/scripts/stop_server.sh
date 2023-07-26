#!/bin/bash
# Check if the app is running and stop it
if pm2 describe app > /dev/null; then
  pm2 delete app
  pm2 kill
fi
