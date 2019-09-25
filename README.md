<h1>ec2-sg-api</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

> A simple serverless API to list all the EC2 security groups for an account.

## Criteria

- [x] Create a Node.js ES6 module to list all EC2 security groups in an AWS Account.
- [x] Use this module in an AWS Lambda function.
- [x] Make the Lambda function available via an AWS API Gateway endpoint.
- [x] Make response [JSON:API 1.0](https://jsonapi.org/format/1.0/) compatible.
- [x] Wrap the Lambda, API Gateway endpoint, and utility module in a Serverless application. [More info](https://serverless.com/framework/docs/providers/aws/events/apigateway#configuring-endpoint-types).
- [x] Write a unit test for your module by mocking AWS EC2 API.
- [x] Get a code coverage report for your test suite.
- [x] Secure the endpoint using a custom [API Gateway Lambda Authoriser](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html)

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

## Code Coverage

```sh
yarn coverage
```

File                 |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
---------------------|----------|----------|----------|----------|-------------------|
`All files`            |      `100` |      `100` |      `100` |      `100` |                   |
`aws`                 |      `100` |      `100` |      `100` |      `100` |                   |
`index.js`           |      `100` |      `100` |      `100` |      `100` |                   |
`handlers`            |      `100` |      `100` |      `100` |      `100` |                   |
`list.js`            |      `100` |      `100` |      `100` |      `100` |                   |
`middlewares`         |      `100` |      `100` |      `100` |      `100` |                   |
`errorMiddleware.js` |      `100` |      `100` |      `100` |      `100` |                   |
`index.js`           |      `100` |      `100` |      `100` |      `100` |                   |
`serializers`         |      `100` |      `100` |      `100` |      `100` |                   |
`index.js`          |      `100` |      `100` |      `100` |      `100` |                   |
`security-group.js`  |      `100` |      `100` |      `100` |      `100` |                   |
`utils`               |      `100` |      `100` |      `100` |      `100` |                   |
`errors.js`          |      `100` |      `100` |      `100` |      `100` |                   |

## Author

* Irwin Razaghi <irwin@razaghi.com.au>
* Github: [`@irwin-r`](https://github.com/irwin-r)