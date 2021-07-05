<template>
    <div class=general>
    
    <h1 class="titre">Référencement des candidats</h1>
    <br>
    <p class="ita1">Entrez les informations des candidats.</p>
    <p class="ita2">Veuillez compléter l'ensemble des champs ci-dessous et soumettre le formulaire pour chaque candidat.</p>
    <br>

    <div id="Inscription">
        <body>
          <form>
            <input type="nom" v-model="nom" placeholder="Nom" class="element"/>
            <input type="prenom" v-model="prenom" placeholder="Prenom" class="element"/>
            <input type="number" v-model="numCandidat" placeholder="Numéro du candidat" class="element"/>
            <input type="telephone" v-model="photo" placeholder="Photo du candidat (lien http uniquement)" class="element"/>
            <input type="description" v-model="description" placeholder="Description du candidat" class="element"/>

            <button type="submit" class="element" @click='candidat(newCandidat)'>Soumettre</button>
          </form>
        </body>
    </div>
  </div>
</template>

<script>
module.exports = {
  data () {
    return {
        newCandidat: {
            nom: '',
            prenom: '',
            numCandidat: 0,
            photo: '',
            description: ''
        }
    }
  },
  methods: {
    candidat(newCandidat) {
        this.$emit('candidat', this.newCandidat)
    },
  }
}
</script>
 
<style scoped>
#adminInscription{
    display: none;
}
  
h1{
    text-align: center;
    padding-top: 50px;
}

p{
    text-align: center;
    padding-bottom: 10px;
}

form{
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: black;
    border-radius: 18px;
    height: 250px;
    width: 500px;
    margin: 0 auto; 
}

form input{
    padding-left: 10px;
    border-radius: 20px;
    box-shadow: rgb(56, 56, 56);
}

button{
    width: 100%;
    text-align: center;
    height: 40px;
    border: 1px solid;
    background:black;
    color: white;
    font-style: oblique;
    border-radius: 15px; 
    font-family: 'Roboto', sans-serif;
}

label{
    text-align: center;
    font-weight: bold;
    color: cornsilk;
}


button:hover{
    background-color: grey;
    color:white;
    font-weight: bolder;
    cursor: pointer;
}

.ita1, .ita2{
  font-style: italic;
}
</style>
