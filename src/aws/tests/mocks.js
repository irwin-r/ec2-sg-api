/* istanbul ignore file */
const faker = require("faker");
const times = require("lodash/times");

const generateMockPrincipalId = () => faker.random.uuid();
const generateMockEffect = () => faker.random.word();
const generateMockResource = () => faker.random.uuid();

const generateMockPolicy = () => ({
  principalId: generateMockPrincipalId(),
  policyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect: generateMockEffect(),
        Resource: generateMockResource(),
      },
    ],
  },
});

const generateMockRegion = () => ({
  RegionName: `${faker.address.countryCode()}-${faker.random.word()}-${faker.random.number()}`,
});

const generateMockRegions = (regionsToCreate = faker.random.number({ min: 5, max: 10 })) =>
  times(regionsToCreate, generateMockRegion);

const generateMockSecurityGroup = () => ({
  Description: faker.lorem.words(),
  GroupName: faker.random.word(),
  OwnerId: faker.random.uuid(),
  GroupId: faker.random.uuid(),
  VpcId: faker.random.uuid(),
});

const generateMockSecurityGroups = (
  securityGroupsToCreate = faker.random.number({ min: 5, max: 10 })
) => times(securityGroupsToCreate, generateMockSecurityGroup);

module.exports = {
  generateMockEffect,
  generateMockPolicy,
  generateMockPrincipalId,
  generateMockRegion,
  generateMockRegions,
  generateMockResource,
  generateMockSecurityGroup,
  generateMockSecurityGroups,
};
