<template>
  <div>
    <div>
      <h1 class="sub-titre">WorkVote, c'est quoi ?</h1>
      <link rel="stylesheet" href="css/full.css">
      <section class="presentation">
        <article>
          <p class="text-presentation">
            WorkVote est une plateforme de vote en ligne <strong>hautement</strong> sécurisé et facile d'accès. 
            Vous pouvez participer à des élections officielles (présidentielles, régionales ...) ou bien créer une élection pour votre entreprise.
            <br><br>
            "Car l'opinion de chacun et chacune est important à la vie démocratique."
          </p>
        </article>
        <br>
        <article class="bouton-liens">
          <router-link to="/register" class="button">Inscription</router-link>
          <router-link to="/voter" class="button">Voter</router-link>
        </article>      
      </section>
    </div>
    <br>
    <div>
      <h2 class="sub-titre">Quelques annonces</h2>
      <article>
          <p class="text-presentation">
            Êtes-vous prêt à tenter l'aventure ? Télécharger WorkVote pour vos élections!
          <br>
          <button type="submit">Télécharger</button>
          </p>
        </article>
        <br>
        <article>
          <p>
          Abonnez-vous à notre newsletter pour être informé des dernières nouveautés!
          <br>
          <input type="email" v-model="Email" placeholder="email" class="element"/>
          <button type="submit">Envoyer</button>
          </p>
        </article>
        <br>
        <article>
          <p>
          Pour consulter l'ensemble du code source ainsi que les documents complémentaires (diagramme use cas, micro-planning ...),
          veuillez vous rendre sur notre github à l'adresse suivante : 
          <br>
          https://github.com/Antoinethl85/MasterCamp.git
          <br>
          </p>
        </article>
    </div>
  </div>
</template>

<style scoped>
.button{
  width: 100%;
  padding: 10px 10px;
  text-align: center;
  height: 40px;
  border: 1px solid;
  background:black;
  color: white;
  border-radius: 15px; 
  font-family: 'Roboto', sans-serif;
  text-decoration: none;
}

.button:hover{
  background-color: grey;
  color: white;
  font-weight: bolder;
  cursor: pointer;
}

h1{
  padding-top: 20px;
}

article {
  display: flex;
}

.article-img {
  flex: 1;
}

.article-img div {
  width: 100px;
  height: 100px;
  background-size: cover;
}

.article-content {
  flex: 3;
}

.article-title {
  display: flex;
  justify-content: space-between;
}

textarea {
  width: 100%;
}

button{
    text-align: center;
    height: 40px;
    width: 100px;
    border: 1px solid;
    background: black;
    color: white;
    font-style: oblique;
    border-radius: 15px;
    border-top-left-radius: 15px;
    font-family: 'Roboto', sans-serif;
    text-decoration: none;
}

button:hover{
  background-color: grey;
    color: white;
    font-weight: bolder;
    cursor: pointer;
}
</style>
