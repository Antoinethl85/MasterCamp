-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 30 juin 2021 à 13:16
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `workvote`
--

-- --------------------------------------------------------

--
-- Structure de la table `edit_candidat`
--

DROP TABLE IF EXISTS `edit_candidat`;
CREATE TABLE IF NOT EXISTS `edit_candidat` (
  `id_candidat` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `num_candidat` int(11) NOT NULL,
  `photo_candidat` text NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id_candidat`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `login`
--

DROP TABLE IF EXISTS `login`;
CREATE TABLE IF NOT EXISTS `login` (
  `id_electeur` int(11) NOT NULL AUTO_INCREMENT,
  `mot_de_passe` text NOT NULL,
  `email` text NOT NULL,
  PRIMARY KEY (`id_electeur`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `nouvelleelection`
--

DROP TABLE IF EXISTS `nouvelleelection`;
CREATE TABLE IF NOT EXISTS `nouvelleelection` (
  `id_election` int(11) NOT NULL AUTO_INCREMENT,
  `organisme` tinyint(1) NOT NULL,
  `nom_organisme` varchar(255) NOT NULL,
  `nom_election` varchar(255) NOT NULL,
  `nombre_candidats` int(11) NOT NULL,
  `duree` int(11) NOT NULL,
  `date` int(11) NOT NULL,
  PRIMARY KEY (`id_election`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `referencement_vote_presentiel`
--

DROP TABLE IF EXISTS `referencement_vote_presentiel`;
CREATE TABLE IF NOT EXISTS `referencement_vote_presentiel` (
  `id_vote` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `num_electeur` int(11) NOT NULL,
  `tel` int(11) NOT NULL,
  PRIMARY KEY (`id_vote`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `register`
--

DROP TABLE IF EXISTS `register`;
CREATE TABLE IF NOT EXISTS `register` (
  `id_electeur` int(11) NOT NULL AUTO_INCREMENT,
  `nom_organisme` varchar(255) NOT NULL,
  `num_electeur` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` text NOT NULL,
  `mot_de_passe` text NOT NULL,
  `tel` int(255) NOT NULL,
  PRIMARY KEY (`id_electeur`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
