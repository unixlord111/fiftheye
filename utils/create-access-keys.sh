#!bash -x
set -e

. aws-info

jqfilter='.AccessKey | "AWS_SECRET_ACCESS_KEY=\(.SecretAccessKey)\nAWS_ACCESS_KEY_ID=\(.AccessKeyId)"'
aws iam create-access-key  --user-name ${MSGCLI_USERNAME} | jq -r "$jqfilter"
