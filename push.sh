#!/bin/sh

git archive -o source.zip HEAD
aws s3 cp source.zip s3://$1/source.zip