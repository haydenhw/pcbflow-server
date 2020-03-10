#!/usr/bin/env bash

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [[ -z $1 ]]; then
  echo "Please enter a commit message"
  exit 1
fi

git add . &&
git commit -m "$1" &&
git push origin CURRENT_BRANCH

ssh -A -i ~/.ssh/MyKeyPair.pem ubuntu@$ec2ip4 /bin/bash <<EOF
    cd /home/ubuntu/portfolio/PCBflow &&
    git fetch origin $CURRENT_BRANCH
    git checkout $CURRENT_BRANCH
    git pull origin $CURRENT_BRANCH &&
    yarn &&
    pm2 stop ecosystem.config.js --env production
    pm2 start ecosystem.config.js --env production
    pm2 save
EOF
