<template>
  
  <div id="Inscription">
    <h1 class="titre">Créer un nouveau vote</h1>
    <br>
        <body>
            <form>
                <select id="statut-select" v-model="statut" class="element">
                    <option value="" disabled selected class="element">Organisme</option>
                    <option value="prive">Privé</option>
                    <option value="public">Public</option>
                </select>
                <input type="organisme" v-model="organisme" placeholder="Organisme" class="element"/>
                <input type="number" v-model="numElecteur" placeholder="Numéro d'électeur" class="element"/>
                <input type="nom" v-model="nom" placeholder="Nom" class="element"/>
                <input type="prenom" v-model="prenom" placeholder="Prénom" class="element"/>
                <input type="email" v-model="email" placeholder="Email" class="element"/>
                <input type="password" v-model="password" placeholder="Mot de passe" class="element"/>
                <input type="telephone" v-model="telephone" placeholder="Téléphone" class="element"/>
            
                <button type="submit" class="element" @click='creer(newVote)'>Soumettre</button>
                <br>
                <router-link class="lien" to='/candidat'>Enregistrer les candidats</router-link>
                <br>
            </form>
        </body>
    </div>
</template>

<script>
module.exports = {
  data () {
    return {
      newVote: {
        statut: '',
        organisme: '',
        numElecteur: 0,
        nom: '',
        prenom: '',
        email: '',
        password: '',
        telephone: ''
      }
    }
  },
  async mounted () {
  },
  methods: {
    creer(newVote){
      this.$emit('creer', this.newVote)
    }
  }
}
</script>

<style scoped>
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
    height: 420px;
    width: 500px;
    margin: 0 auto; 
}

form input{
    padding-left: 10px;
    border-radius: 20px;
    box-shadow: rgb(56, 56, 56);
}

form select{
  padding-left: 10px;
  border-radius: 20px;
  box-shadow: rgb(56, 56, 56);
}

button{
    width: 100%;
    text-align: center;
    height: 40px;
    border: 1px solid;
    background: black;
    color: #ffffff;
    font-style: oblique;
    border-radius: 15px; 
    font-family: 'Roboto', sans-serif;
}

.lien{
  width: 100%;
  text-align: center;
  border: 1px solid;
  background: black;
  color: #ffffff;
  font-style: oblique;
  border-radius: 15px; 
  font-family: 'Roboto', sans-serif;
}

.lien:hover{
  background-color: grey;
  color:white;
  font-weight: bolder;
  cursor: pointer;
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
</style>

