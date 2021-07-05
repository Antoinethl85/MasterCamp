const express = require('express')
const bcrypt = require('bcrypt')
const { Client } = require('pg')

const client = new Client({
 user: 'postgres',
 host: 'localhost',
 password: 'efreiAntoine',
 database: 'SITEBDD'
})

client.connect()
const router = express.Router()

router.post('/inscription', async (req,res)=>{
  
  const nom_organisme = req.body.nom_organisme
  const num_electeur = req.body.num_electeur
  const nom = req.body.nom
  const prenom = req.body.prenom
  const email = req.body.email
  const mot_de_passe = req.body.mot_de_passe
  const telephone = req.body.telephone
  

  const sql_mail = "SELECT * FROM register WHERE email=$1"

  const result_mail = await client.query({
      text: sql_mail,
      values: [email]
  })

  if (result_mail.rowCount == 1) {
      res.status(400).json({ message: "Cet élécteur est déjà inscrit" })
      return
  }

  const hash = await bcrypt.hash(mot_de_passe,10)
  
  const sql = "INSERT INTO public.register(nom_organisme, num_electeur, nom, prenom, email, mot_de_passe, telephone) VALUES ($1,$2,$3,$4,$5,$6,$7)"
  
  await client.query({
    text: sql,
    values:[nom_organisme,num_electeur,nom,prenom,email,hash,telephone]
  })
  
  res.send({message:'Inscrit!'})
})



router.post('/presentiel', async (req,res)=>{

  const nom = req.body.nom
  const prenom = req.body.prenom
  const num_electeur = req.body.num_electeur
  const telephone = req.body.telephone

  const sql = "INSERT INTO public.referencement_vote_presentiel(nom, prenom, num_electeur, telephone) VALUES ($1,$2,$3,$4) RETURNING *"

  await client.query({
    text: sql,
    values: [nom, prenom, num_electeur, telephone]
  })

  console.log("ok presentiel!")
})



router.post('/creer', async (req,res)=>{

  const organisme = req.body.organisme
  const nom_organisme = req.body.nom_organisme
  const nom_election = req.body.nom_election
  const nombre_candidats = req.body.nombre_candidats
  const duree = req.body.duree
  const date = req.body.date

  const sql = "INSERT INTO public.nouvelleelection(organsime, nom_organsime, nom_election, nombre_candidats, duree, date) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *"

  await client.query({
    text: sql,
    values: [nom, prenom, num_electeur, telephone]
  })

  console.log("ok creer!")
})



router.post('/candidat', async (req,res)=>{

  const nom = req.body.nom
  const prenom = req.body.prenom
  const num_candidat = req.body.num_candidat
  const photo_candidat = req.body.photo_candidat
  const description = req.body.description

  const sql = "INSERT INTO public.edit_candidat(nom, prenom, num_candidat, photo_candidat, description) VALUES ($1,$2,$3,$4,$5) RETURNING *"

  await client.query({
    text: sql,
    values: [nom, prenom, num_electeur, telephone]
  })

  console.log("ok candidat!")
})

module.exports = router
