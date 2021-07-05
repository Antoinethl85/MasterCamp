<template>
    <div class=general>
    <link rel="stylesheet" href="css/full.css">
    <link rel="stylesheet" href="css/Register.css">

    
    <h1 class="titre">Bienvenue</h1>
    <p class="titre">Créez votre compte et participez au vote!</p>
    <br>
    
    <div id="Inscription">
        <body>
          <form>
            <input type="organisme" v-model="organisme" placeholder="Organisme" class="element"/>
            <input type="number" v-model="numElecteur" placeholder="Numéro d'électeur" class="element"/>
            <input type="nom" v-model="nom" placeholder="Nom" class="element"/>
            <input type="prenom" v-model="prenom" placeholder="Prenom" class="element"/>
            <input type="email" v-model="email" placeholder="Email" class="element"/>
            <input type="password" v-model="password" placeholder="Mot de passe" class="element"/>
            <input type="telephone" v-model="telephone" placeholder="Téléphone" class="element"/>

            <button type="submit" class="element" @click='register(newUser)'>S'inscrire</button>
          </form>
        </body>
    </div>
  </div>
</template>

<script>
module.exports = {
    data() {
        return {
            newUser: {
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
    methods: {
        register(newUser){
            this.$emit('register', this.newUser)
        }
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
    height: 400px;
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
    color: white;
    font-weight: bolder;
    cursor: pointer;
}

</style>