#!/usr/bin/env bash

SRC=/Users/hayden/MEGA/projects/PCBflow/pcbflow-server/
DEST=/home/ubuntu/projects/pcbflow-server/
SSH="ssh -i ~/.ssh/MyKeyPair.pem ubuntu@${EC2IP4}"

# create project folder and remove existing source files
$SSH "mkdir -p ${DEST}"

# scp project dir to ec2 projects dir
rsync -av -progress -e "ssh -i ~/.ssh/MyKeyPair.pem" --exclude='/.git' --filter="dir-merge,- .gitignore" \
 ${SRC} ubuntu@$EC2IP4:${DEST}

# cd into project dir
$SSH "cd ${DEST} && /bin/bash run.sh"
