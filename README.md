Migrated to Github on 07/07/2025. [See more](https://aws.amazon.com/blogs/devops/how-to-migrate-your-aws-codecommit-repository-to-another-git-provider/)

# Introduction
This Lambda function is a simple wrapper to fetch Reddit's api request.  
For now, it only: 
- Transform the request Headers with `Authorization` and `UserAgent`
- Transform response Headers to allow CORS policy
- And very basic error handling.

By using functions, we have separated a new layer for serverless apps, and also leave room for Request & Response transformation.
