<h1 align="center">Welcome to list-ec2-security-groups 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

> A simple serverless API to list all the EC2 security groups for an account.

## Criteria

- [ ] Create a Node.js ES6 module to list all EC2 security groups in an AWS Account.
- [ ] Use this module in an AWS Lambda function.
- [ ] Make the Lambda function available via an AWS API Gateway endpoint.
- [ ] Make response [JSON:API 1.0](https://jsonapi.org/format/1.0/) compatible.
- [ ] Wrap the Lambda, API Gateway endpoint, and utility module in a Serverless application. [More info](https://serverless.com/framework/docs/providers/aws/events/apigateway#configuring-endpoint-types).
- [ ] Write a unit test for your module by mocking AWS EC2 API.
- [ ] Get a code coverage report for your test suite.
- [ ] Secure the endpoint using a custom [API Gateway Lambda Authoriser](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html)

## Install

```sh
yarn install
```

## Run locally

```sh
yarn start:local
```

## Run tests

```sh
yarn test
```

## Author

👤 **Irwin Razaghi <irwin@razaghi.com.au>**

* Github: [@irwin-r](https://github.com/irwin-r)