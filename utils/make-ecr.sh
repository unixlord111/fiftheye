#!bash -x
set -e

aws cloudformation create-stack          \
    --stack-name fiftheye-ecr-$(date +%s) \
    --template-body file://ecr.cf
