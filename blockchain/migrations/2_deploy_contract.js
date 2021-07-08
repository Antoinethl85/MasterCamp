const Migrations = artifacts.require("Migrations");
const Candidat2 = artifacts.require("Candidat2");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Candidat2);
};
