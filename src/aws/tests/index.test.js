const {
  DescribeRegionsCommand,
  DescribeSecurityGroupsCommand,
} = require("@aws-sdk/client-ec2-node");
const { afterEach, beforeEach } = require("mocha");
const { expect } = require("chai");
const rewire = require("rewire");
const sinon = require("sinon");

const aws = rewire("../index.js");

const {
  generateMockEffect,
  generateMockPrincipalId,
  generateMockRegions,
  generateMockResource,
  generateMockSecurityGroups,
} = require("./mocks");

describe("AWS Helper Functions", () => {
  let FakeEC2Client;
  let sendStub;

  before(() => {
    sendStub = sinon.stub();
    FakeEC2Client = function() {};
    FakeEC2Client.prototype.send = sendStub;
    // eslint-disable-next-line no-underscore-dangle
    aws.__set__("EC2Client", FakeEC2Client);
  });

  beforeEach(() => sendStub.reset());
  afterEach(() => sendStub.reset());

  describe("generatePolicy", () => {
    it("should create a valid policy object", () => {
      const principalId = generateMockPrincipalId();
      const effect = generateMockEffect();
      const resource = generateMockResource();

      const policy = aws.generatePolicy(principalId, effect, resource);

      expect(policy.principalId).to.equal(principalId);
      expect(policy).to.have.property("policyDocument");

      const { policyDocument } = policy;

      expect(policyDocument.Version).to.equal("2012-10-17");

      const [statement] = policyDocument.Statement;

      expect(statement.Action).to.equal("execute-api:Invoke");
      expect(statement.Effect).to.equal(effect);
      expect(statement.Resource).to.equal(resource);
    });
  });

  describe("getRegions", () => {
    describe("when a request succeeds", () => {
      it("should return a list of regions", async () => {
        const regions = generateMockRegions();

        sendStub.returns({ Regions: regions });

        const response = await aws.getRegions();

        expect(FakeEC2Client.prototype.send.calledOnce).to.equal(true);
        expect(
          FakeEC2Client.prototype.send.calledWithExactly(new DescribeRegionsCommand({}))
        ).to.equal(true);

        expect(response).to.have.lengthOf(regions.length);
        expect(response).to.eql(regions);
      });
    });

    describe("when a request fails", () => {
      it("should return a null value", async () => {
        sendStub.returns(undefined);

        const response = await aws.getRegions();

        expect(FakeEC2Client.prototype.send.calledOnce).to.equal(true);
        expect(
          FakeEC2Client.prototype.send.calledWithExactly(new DescribeRegionsCommand({}))
        ).to.equal(true);

        expect(response).to.equal(null);
      });
    });
  });

  describe("getRegionNames", () => {
    describe("when a request succeeds", () => {
      it("should return a list of region names", async () => {
        const regions = generateMockRegions();

        sendStub.returns({ Regions: regions });

        const response = await aws.getRegionNames();

        sinon.assert.calledOnce(FakeEC2Client.prototype.send);
        sinon.assert.calledWithExactly(
          FakeEC2Client.prototype.send,
          new DescribeRegionsCommand({})
        );

        expect(response).to.have.lengthOf(regions.length);
        expect(response).to.eql(regions.map(({ RegionName }) => RegionName));
      });
    });

    describe("when a request fails", () => {
      it("should return a null value", async () => {
        sendStub.returns(undefined);

        const response = await aws.getRegionNames();

        expect(FakeEC2Client.prototype.send.calledOnce).to.equal(true);
        expect(
          FakeEC2Client.prototype.send.calledWithExactly(new DescribeRegionsCommand({}))
        ).to.equal(true);

        expect(response).to.equal(null);
      });
    });
  });

  describe("getSecurityGroups", () => {
    describe("when a request succeeds", () => {
      it("should return a list of security groups for multiple regions", async () => {
        const regions = generateMockRegions();
        let securityGroups = [];

        sendStub.withArgs(new DescribeRegionsCommand({})).returns({ Regions: regions });

        sendStub.withArgs(new DescribeSecurityGroupsCommand({})).callsFake(() => {
          const mockSecurityGroupsForRegion = generateMockSecurityGroups();

          securityGroups = [...securityGroups, ...mockSecurityGroupsForRegion];

          return { SecurityGroups: mockSecurityGroupsForRegion };
        });

        const response = await aws.getSecurityGroups();

        sinon.assert.callCount(FakeEC2Client.prototype.send, regions.length + 1);
        expect(response).to.eql(securityGroups);
      });
    });

    describe("when the request to get all regions fails", () => {
      it("should return a null value", async () => {
        sendStub.withArgs(new DescribeRegionsCommand({})).returns(undefined);

        const response = await aws.getSecurityGroups();

        expect(response).to.equal(null);
      });
    });

    describe("when a request fails", () => {
      it("should return an empty array", async () => {
        sendStub
          .withArgs(new DescribeRegionsCommand({}))
          .returns({ Regions: generateMockRegions() });

        sendStub.withArgs(new DescribeSecurityGroupsCommand({})).returns(undefined);

        const response = await aws.getSecurityGroups();
        expect(response).to.have.lengthOf(0);
      });
    });
  });
});
