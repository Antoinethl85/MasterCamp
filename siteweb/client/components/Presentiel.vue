<template>
    <div class=general>
    
    <h1 class="titre">Référencement des votes en présentiel</h1>
    <p class="titre">Les votes effectués dans les bureaux de vote sont insérés ici afin de compléter la base de donée</p>
    <br>
    <p class="ita1">Entrez les informations du votant.</p>
    <p class="ita2">Veuillez compléter l'ensemble des champs ci-dessous.</p>

    <div id="Inscription">
        <body>
          <form>
            <input type="nom" v-model="nom" placeholder="Nom" class="element"/>
            <input type="prenom" v-model="prenom" placeholder="Prenom" class="element"/>
            <input type="number" v-model="numElecteur" placeholder="Numéro d'électeur" class="element"/>
            <input type="telephone" v-model="telephone" placeholder="Téléphone" class="element"/>

            <button type="submit" class="element" @click='presentiel(vote)'>Soumettre</button>
          </form>
        </body>
    </div>
  </div>
</template>
 
<script>
module.exports = {
  data () {
    return {
        vote: {
            nom: '',
            prenom: '',
            number: 0,
            telephone: 0
        }
    }
  },
  methods: {
    presentiel (vote) {
        this.$emit('presentiel', this.vote)
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
    box-shadow: white;
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
