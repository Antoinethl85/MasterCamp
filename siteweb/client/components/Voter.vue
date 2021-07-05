<template>
    <div>
        <h1>Election présidentielle 2022</h1>
        <br>
        <p>Veuillez bien sélectionner un seul candidat sous peine que votre vote ne soit pas pris en compte!</p>
        <form class="form">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7f/Marine_Le_Pen_%282017-03-24%29_01_cropped.jpg" loading="lazy" width="101" alt="">
        <label class="checkbox">
            <input type="checkbox" class="w-checkbox-input">
        </label>
        <p></p>
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Emmanuel_Macron_%28cropped%29.jpg" loading="lazy" width="101" alt="">
        <label class="checkbox">
            <input type="checkbox" class="w-checkbox-input">
        </label>
        <p></p>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJnRG53U9u1w0kIYwN8O3QOtlkAYQSQ2vHe-BXHGg6l8jNZiYqM1bSt8CG-8qoaLpfL-Q&usqp=CAU" loading="lazy" width="101" alt="">
        <label class="checkbox">
            <input type="checkbox" class="w-checkbox-input">
        </label>
        <br><br>
        <button type="submit" class="element">Soumettre votre vote</button>
        </form>
    </div>
</template>

<script>
module.exports = {
    data() {
        return {
            newUser: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        login(newUser){
            this.$emit('login' , this.newUser)
        }
    }
}

</script>

<style scoped>
form{
    width: 100%;
    padding: 10px;
    text-align: center;
}

* {
     box-sizing: border-box; 
}

button{
    width: 50%;
    text-align: center;
    height: 40px;
    border: 1px solid;
    background: black;
    color: white;
    font-style: oblique;
    border-radius: 15px; 
    font-family: 'Roboto', sans-serif;
}

button:hover{
    background-color: grey;
    color: white;
    font-weight: bolder;
    cursor: pointer;
}

h1{
    text-align: center;
    padding-top: 20px;
}

p{
    font-style: italic;
    text-align: center;
}
</style>