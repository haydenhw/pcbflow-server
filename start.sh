#!/usr/bin/env bash
. $(brew --prefix nvm)/nvm.sh && nvm use 8.16.2 && npm run concurrent
