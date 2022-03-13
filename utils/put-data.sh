#!bash -x
set -e

. aws-info

node msgcli/upload.js s3://${MSGCLI_BUCKETNAME}/whatsup.json
