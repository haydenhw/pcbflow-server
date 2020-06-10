#!/usr/bin/env bash

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
REMOTE_APP_PATH=/home/ubuntu/portfolio/postgres-pcbflow/api
#if output=$(git status --porcelain) && [ -z "$output" ]; then
#  # Working directory clean
#else
#  # Uncommitted changes
#fi

if [[ -z "$1" ]]; then
  echo "Please enter a commit message"
  exit 1
fi

if [[ "$1" != "--skip-commit" ]]; then
    git add . &&
    git commit -m "$1"
fi

git push origin $CURRENT_BRANCH

ssh -A -i ~/.ssh/MyKeyPair.pem ubuntu@$EC2IP4 /bin/bash <<EOF
    cd $REMOTE_APP_PATH &&
    git checkout $CURRENT_BRANCH
    git pull origin $CURRENT_BRANCH &&
    yarn &&
    pm2 reload ecosystem.config.js --env production
EOF
