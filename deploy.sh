#!/usr/bin/env bash

deploy() {
    cd /home/ubuntu/portfolio/PCBflow &&
    git pull origin $1 &&
    yarn &&
    pm2 stop ecosystem.config.js --env production 
    pm2 start ecosystem.config.js --env production
    pm2 save
}

if [[ -z $1 ]]; then
  echo "Please enter a commit message"
  exit 1
fi  

git add . && 
git commit -m "$1" &&
git push origin $(git rev-parse --abbrev-ref HEAD)

# TODO the -A option is not secure. Come up with a different solution
# try this https://itnext.io/how-to-auto-deploy-your-app-with-one-command-12f9ac00d34a
ssh -A -i ~/.ssh/MyKeyPair.pem ubuntu@$ec2ip4 "$(typeset -f deploy); deploy $(git rev-parse --abbrev-ref HEAD)"

