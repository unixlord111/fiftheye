# Fiftheye msgcli App

## What does it do?
It connects to an S3 bucket and snags a JSON element.

## What are these other files?
file/dir             | description
---------------------|--------------------------------------------------------
msgcli               | The nodejs app
docker-compose.yml   | The docker compose file.
ecr.cf               | Cloudformation script for ECR.
msgcli-s3.cf         | Cloudformation script for the S3 buckets.
utils                | Various helpers. For example, invoking cloudformation and prepping the environment.
aws-info             | A file used by some of the utils to reference latest Cloudformation resources.
---------------------|--------------------------------------------------------

## How to run the program:
export AWS_ACCESS_KEY_ID=<access key>
export AWS_SECRET_ACCESS_KEY=<secret access key>
docker-compose run msgcli
