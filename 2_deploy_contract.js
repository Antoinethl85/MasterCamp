const Migrations = artifacts.require("Migrations");
const Candidat = artifacts.require("Candidat");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Candidat);
};