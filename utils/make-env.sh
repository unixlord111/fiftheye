#!bash -x
set -e

aws cloudformation create-stack      \
   --stack-name fiftheye-$(date +%s) \
   --capabilities CAPABILITY_IAM     \
   --template-body file://msgcli-s3.cf  
