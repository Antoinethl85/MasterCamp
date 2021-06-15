const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const { Client } = require('pg')
const session = require('express-session')

const client = new Client({
 user: 'postgres',
 host: '89.84.114.44',
 password: 'ouvre',
 database: 'ProjetTransverse'
})

/**const client = new Client({
  user: 'postgres',
  host: 'localhost',
  password: 'EnzoMorinPostgreSQLEFREI',
  database: 'ProjetWeb'
 })*/

client.connect()

router.post('/register', async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const nom = req.body.nom
  const prenom = req.body.prenom
  const role = req.body.type
  const matiere = req.body.matiere
  const classe = req.body.classe
  const sql = "SELECT * FROM users WHERE email=$1"
  const exist = await client.query({
    text: sql,
    values: [email]
  })
  .catch((error) => {
    console.error(error,'Promise error');
  });
  const num = exist.rowCount
  if (num>=1){
    res.status(400).json({ message: "User already registed"})
  } else {
    const hash = await bcrypt.hash(password, 10)
    await client.query({
      text: "INSERT INTO users (email,password,nom,prenom) VALUES ($1,$2,$3,$4)",
      values: [email, hash, nom, prenom]
    })
    await client.query({
      text: "INSERT INTO roles (role) VALUES ($1)",
      values: [role]
    })
    
    if (role === "prof"){
      await client.query({
        text: "INSERT INTO matiere (nom) VALUES ($1)",
        values: [matiere]
      })
      const matiereid = await client.query({
        text: "SELECT id FROM matiere WHERE nom = $1",
        values: [matiere]
      })
      const idprof = await client.query({
        text: "SELECT id FROM users WHERE email = $1 AND nom = $2 AND prenom = $3",
        values: [email, nom, prenom]
      })
      await client.query({
        text: 'INSERT INTO profliste ("idProf","idMatiere") VALUES ($1,$2)',
        values: [idprof.rows[0].id,matiereid.rows[0].id]
      })
    } else {
      const idEleve = await client.query({
        text: "SELECT id FROM users WHERE email = $1 AND nom = $2 AND prenom = $3",
        values: [email, nom, prenom]
      })

      const idclasse = await client.query({
        text: "SELECT id FROM classes WHERE nom = $1 ",
        values: [classe]
      })
      await client.query({
        text: 'INSERT INTO affectation ("idEleve","idClasse") VALUES ($2,$1)',
        values: [idclasse.rows[0].id,idEleve.rows[0].id]
      })
    }
    res.status(200).json({ message: "User successfully registed"})
  }
});





router.post('/login', async (req, res) => {
    if (req.session.userId == null ){
      const email = req.body.email
      const password = req.body.password
      const sql = "SELECT * FROM users JOIN roles ON users.id = roles.id WHERE email=$1"
      const exist = await client.query({
        text: sql,
       values: [email]
      })
      
      if (exist.rowCount == 0) {
        res.status(400).json({ message: "User does not exist"})
      } else {
        const hashed = exist.rows[0].password
        if (await bcrypt.compare(password, hashed)) {
          req.session.userId = exist.rows[0].id
          req.session.userRole = exist.rows[0].role
          res.status(200).json({message : "User successfully connected"})
      } else {
        res.status(400).json({ message: "Access Denied"})
      }
      }
      
    } else {
      res.status(401).json({ message: "Already connected"})
    }
  });


router.get('', async (req, res) => {
  if(req.session.userRole == 'eleve') {
    res.json({page:'/student'})
  } else if (req.session.userRole == 'prof') {
    res.json({page:'/prof'})
  } else {
    res.json({page:'/'})
  }
});


router.get('/register',async (req, res) => {
  const result = await client.query({
    text: "SELECT nom from classes",
    values:[]
  })
  res.send(result.rows)
})


router.get('/student',async (req, res) => {
  if(req.session.userRole != 'eleve') {
    res.send([false,req.session.userId])
  }
  else {
    res.send([true,req.session.userId])
  } 
})
router.get('/profid',async (req, res) => {
  if(req.session.userRole != 'prof') {
    res.send([false,req.session.userId])
  }
  else {
    res.send([true,req.session.userId])
  } 
})


router.get('/prof',async (req, res) => {
  const result = await client.query({
    text: "SELECT nom from classes",
    values:[]
  })
  res.send(result.rows)
})


router.get('/access',async (req, res) => {
  res.send(req.session.userRole)
})

router.get('/studentdata', async (req,res) => {
  if(req.session.userId != undefined) {
    const notes = await client.query({
      text: 'SELECT * from notes JOIN examens ON examens.id= "idExamen" JOIN matiere ON matiere.id = "idMatiere" where "idEleve" = $1 ORDER BY "idExamen" DESC LIMIT 3',
      values:[req.session.userId]
    })
    const classeid = await client.query({
      text: 'SELECT "idClasse" FROM affectation WHERE "idEleve" = $1 ',
      values:[req.session.userId]
    })
    const devoirs = await client.query({
      text: 'SELECT examens.id,matiere.nom,examens.date,examens.duree from examens JOIN classes ON classes.id = ANY("idClasses") JOIN matiere on "idMatiere" = matiere.id WHERE classes.id = $1 ORDER BY date',
      values:[classeid.rows[0].idClasse]
    })
    const infos = await client.query({
      text: 'SELECT users.nom, users.prenom, classes.nom as Classe from users JOIN affectation ON "idEleve" = users.id JOIN classes on classes.id = "idClasse" WHERE users.id = $1 LIMIT 3',
      values:[req.session.userId]
  })
    res.send([notes.rows,devoirs.rows,infos.rows])
  } else {
    res.status(404).send("ERROR")
  }
  
})




router.get('/profdata', async (req,res) => {
  if(req.session.userId != undefined) {

    const matiereid = await client.query({
      text: 'SELECT "idMatiere" FROM profliste WHERE "idProf" = $1 ',
      values:[req.session.userId]
    })
      const devoirs = await client.query({
        text: 'SELECT examens.id,matiere.nom,examens.date,examens.duree from examens JOIN matiere on "idMatiere" = matiere.id WHERE "idMatiere" = $1 ORDER BY date',
        values:[matiereid.rows[0].idMatiere]
    })
    const infos = await client.query({
      text: 'SELECT users.nom, users.prenom, matiere.nom as Matiere from users JOIN profliste ON "idProf" = users.id JOIN matiere on matiere.id = "idMatiere" WHERE users.id = $1',
      values:[req.session.userId]
    })
    const classes = await client.query({
      text: 'SELECT * FROM classes',
      values:[]
    })
    res.send([devoirs.rows,infos.rows,classes.rows])
  } else {
    res.status(404).send("ERROR")
  }
  
})

router.delete('', async (req, res) => {
  req.session.userId = undefined
  req.session.userRole= undefined
  res.status(200).json({message: "Deconnected"})
})



router.post('/prof', async (req, res) => {
  const date = req.body.date + " " + req.body.heure
  const duree = req.body.duree
  const classes = req.body.classes
  const matiere= req.body.matiere
  
  const matiereid = await client.query({
    text: 'SELECT id FROM matiere WHERE nom = $1',
    values:[matiere]
  })
  
  const classesall = await client.query({
    text: 'SELECT * FROM classes',
  })
  var classesnames = []
  for (let i =0; i< classesall.rows.length;i++){
    classesnames.push(classesall.rows[i].nom)
  }
  var classesids = []
  for (let i =0; i< classesnames.length;i++){
    if (classes.includes(classesnames[i])){
      classesids.push(classesall.rows[i].id)
    }
    
  }
  const envoi = await client.query({
    text:'INSERT INTO examens ("idMatiere","date","duree","idClasses") VALUES ($1,$2,$3,$4)',
    values:[matiereid.rows[0].id,date,duree,classesids]
  })
  res.send("Request Done")
})

router.post('/profdel', async (req,res) => {
  const envoi = await client.query({
    text:'DELETE FROM examens WHERE id = $1',
    values:[req.body.id]
  })
  res.send("Done")
})


router.post('/examdata', async (req,res) => {
  if(req.session.userId != undefined) {
      const devoirs = await client.query({
        text: 'SELECT examens.id,matiere.nom,examens.date,examens.duree from examens JOIN matiere on "idMatiere" = matiere.id WHERE examens.id = $1 ORDER BY date',
        values:[req.body.id]
    })
    const infos = await client.query({
      text: 'SELECT users.nom, users.prenom, matiere.nom as Matiere from users JOIN profliste ON "idProf" = users.id JOIN matiere on matiere.id = "idMatiere" WHERE users.id = $1',
      values:[req.session.userId]
    })
    const classes = await client.query({
      text: 'SELECT * FROM classes',
      values:[]
    })
    const classesselected = await client.query({
      text: 'SELECT classes.id, classes.nom FROM examens JOIN classes ON classes.id = ANY("idClasses") where examens.id = $1',
      values:[req.body.id]
    })


    res.send([devoirs.rows,classes.rows,classesselected.rows,infos.rows])
  } else {
    res.status(404).send("ERROR")
  }
  
})


router.patch('/prof', async (req,res) => {
  if(req.session.userId != undefined) {
    var classesids = []
    const idmatiere = await client.query({
      text: 'SELECT id FROM matiere WHERE nom = $1',
      values:[req.body.matiere]
    })
    console.log(req.body.classes)
    for (const value in req.body.classes){
      
      const idclasse = await client.query({
        text: 'SELECT id FROM classes WHERE nom = $1',
        values:[req.body.classes[value]]
      })
      classesids.push(idclasse.rows[0].id)
    }
    console.log(classesids)
    const modifdevoir = await client.query({
      text: 'UPDATE examens SET id = $1, date = $2, duree = $3 , "idClasses" = $4, "idMatiere" = $5 WHERE id = $1',
      values:[req.body.id,req.body.date, req.body.duree, classesids,idmatiere.rows[0].id]
    })
    console.log(req.body.id)
    res.send(modifdevoir)
  } else {
    res.status(404).send("ERROR")
  }
  
})

router.post('/profquest', async (req,res) => {
  var idexam = req.body.idExam
  var question = req.body.Question
  var reponse = req.body.Reponse
  var nbPoint = req.body.NbPoint
  console.log("test")
  const ajoutquestion = await client.query({
    text: 'INSERT INTO questions ("idExam","nbPoints","question","reponse") VALUES ($1,$2,$3,$4)',
    values:[idexam,nbPoint,question,reponse]
  })
  res.send("DONE")
})

router.get('/profquest', async(req,res) =>{
  const sql = "SELECT * FROM questions"
  const result = await client.query({
    text: sql
  })
  res.json(result.rows)
})

router.post('/deletequest', async(req,res) =>{
  const id = req.body.id
  const sql = " SELECT question FROM questions WHERE id = $1"
  const result = await client.query({
    text: sql,
    values: [id]
  })
  if (result.rows.length === 0) {
    console.log("la question n'existe pas")
    res.status(401).json({message : "la question n'existe pas"})
  }
  else{
    const sql2 = "DELETE FROM questions WHERE id = $1"
    const result = await client.query({
      text: sql2,
      values: [id]
    })
    console.log("la question a bien été supprimée")
    res.status(201).json({message: "la question a bien été supprimée"})
  }
})

module.exports = router
