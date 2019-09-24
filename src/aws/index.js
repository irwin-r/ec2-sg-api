const {
  DescribeRegionsCommand,
  DescribeSecurityGroupsCommand,
  EC2Client,
} = require("@aws-sdk/client-ec2-node");

const flatten = require("../utils/flatten");

const generatePolicy = (principalId, effect, resource) => ({
  principalId,
  policyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect: effect,
        Resource: resource,
      },
    ],
  },
});

const getRegions = async () => {
  const ec2 = new EC2Client({});
  const command = new DescribeRegionsCommand({});

  const { Regions } = (await ec2.send(command)) || {};

  return Regions;
};

const getRegionNames = async () => {
  const regions = await getRegions();

  if (!Array.isArray(regions)) {
    return null;
  }

  // Pick the region names
  return regions.map(({ RegionName }) => RegionName);
};

const getSecurityGroupsForRegion = async region => {
  const ec2 = new EC2Client({ region });
  const command = new DescribeSecurityGroupsCommand({});

  const { SecurityGroups } = (await ec2.send(command)) || {};

  return SecurityGroups;
};

const getSecurityGroups = async () => {
  const regionNames = await getRegionNames();

  if (!Array.isArray(regionNames)) {
    return null;
  }

  // Let's grab all of the SG data concurrently
  const securityGroupsByRegion = await Promise.all(
    regionNames.map(getSecurityGroupsForRegion)
  );

  // We're doing Array.isArray here to filter out any potential non-array responses
  return flatten(securityGroupsByRegion.filter(Array.isArray));
};

module.exports = {
  generatePolicy,
  getSecurityGroups,
};
