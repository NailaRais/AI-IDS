const IntrusionDetection = artifacts.require("IntrusionDetection");

module.exports = function (deployer) {
  deployer.deploy(IntrusionDetection);
};
