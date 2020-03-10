#!/usr/bin/env bash
bucket_name=pcbflow.haydenhw.com
distribution_id=E3KM5KBTBIZ9RK

if [[ "$1" != --no-build ]]; then
    nvm use 8.16.2
    npm run build
fi

aws2 s3 sync build s3://$bucket_name
aws2 cloudfront create-invalidation \
    --distribution-id $distribution_id \
    --paths "/*"
