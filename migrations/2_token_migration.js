const CandidatToken = artifacts.require("Candidat");

module.exports = function (deployer) {
  deployer.deploy(CandidatToken);
};