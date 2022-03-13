#!bash -x
set -e

. aws-info

node msgcli/main.js s3://${MSGCLI_BUCKETNAME}/whatsup.json
