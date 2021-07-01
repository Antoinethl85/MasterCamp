<h1>WorkVote - projet Master Camp</h1>



<h2>Sommaire</h2>
<p>1. Introduction
  <br>
  2. Description Globale
  <br>
  3. Développement
  <br>
  4. Initialisation
  <br>
  5. Setup Base de Données
  <br>
  6. Prérequis
  <br>
  7. Comment lancer l'application
  </p>
<h2><U>Introduction</U></h2>

<p>Projet du MASTERCAMP : Service de vote à distance. </p>
<p>Projet de fin d'année de L3 à EFREI Paris.</p>
<p> Ce projet a été conçu et développé par : Antoine THIELIN, Isaac CHARAF, Maxime BERTHIER, Guillaume ANDRE, Omar BOUKMAKH, Miguel VILLAGOMEZ.</p>


<h2>Desciption Globale</h2>
<p>Ce dernier est basé sur la conception et la mise en place d'une plateforme en ligne sécurisée modélisant des élections à distance. Nous utilisons la technique bockchain pour accentuer l'aspect de sécurité et pour exploiter cette technique naissante. Pour aboutir à un résultat le plus professionnel possible, nous avons utilisé les différentes technologie apprissent au cours de l'année dont la modélisation, la base de données ainsi que la programmation web. </p>
<p>Vous pouvez vérifier notre code ainsi que nos différents documments ici : https://github.com/Antoinethl85/MasterCamp</p>

<h2>Développement </h2>

<h3>Langages utilisés</h3>

<ul>
  <li>HTML5</li>
  <li>CSS</li>
  <li>JavaScript</li>
  <li>Nodejs 14.15.1</li>
  <li>Solidity 0.5.16</li>
  <li>Truffle 5.3.11</li>
  <li>web3 1.3.6</li>
</ul>

<h2>Initialisation </h2>

<p>-Database
  <br> 
  -Ethereum Blockchain</p>
  
<h2>Setup Base de Données </h2>
<p>Comme indiqué dans Initialisation, nous utiliserons un serveur de base de données MySQL. Pour la configuration de la base de données, vous devrez utiliser le fichier workvote.sql pour créer la base de données et les tables. Vous pouvez soit copier-coller le contenu du fichier dans la fenêtre de requête SQL, soit importer le fichier. Le fichier workvote.sql vous permettra d'avoir toutes les données nécessaires pour tester l'application.</p>

<h2>Prérequis</h2>

<p>Concernant la partie blockchain, vous devez tout d'abord avoir accès au shell et avoir l'application Ganache installée (https://www.trufflesuite.com/ganache).</p>
<p>Ensuite, vous allez devoir installer Truffle. Pour faire cela, rendez vous dans le shell et exécutez la commande :
<pre><code>npm install -g truffle </code></pre>
</p>

<p>Suite à cela vous devez créer un nouveau dossier et initialiser votre projet Truffle dedans. Pour faire cela, il faut simplement suivre les commandes suivantes :
<pre><code>mkdir Candidat
cd Candidat
truffle init
</code></pre>
</p>


<p>Vous devez voir dans votre dossier : deux fichiers .JSON, un fichier truffle-config.js, 3 dossiers (<strong>contracts</strong> contenant un fichier migration.sol, <strong>migration</strong> contenant un fichier 1_initial_migration et <strong>test</strong> contenant un fichier .gitkeep).</p>
<p>Ensuite, vous allez devoir installer la bibliothèque openzeppelin nécessaire au bon fonctionnement de notre code. Pour faire cela, il vous suffit d'exécuter la commande suivante dans le dossier créé précédemment :
<pre><code>npm install @openzeppelin/contracts</code></pre>
</p>

<p>Suite à cela, vous devez copier le fichier candidat.sol et le placer dans le dossier <strong>contracts</strong> et placer le fichier 2_deploy_contract.js dans le dossier <strong>migrations</strong>.</p>

<h2>Comment lancer l'application</h2>

<p>C'est chaud</p>
