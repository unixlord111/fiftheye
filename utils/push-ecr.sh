#!bash -x 
set -e

aws ecr-public get-login-password --region us-east-1 | \
   docker login --username AWS --password-stdin public.ecr.aws/s2k0e3i6
docker tag msgcli:latest public.ecr.aws/s2k0e3i6/msgcli:latest
docker push public.ecr.aws/s2k0e3i6/msgcli:latest
