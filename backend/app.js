const express = require('express')
const mysql = require('mysql')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
dotenv.config({ path: './.env' })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
})

db.connect( err => {
  if (err) console.log(err)
  else console.log("DATABASE connected")
})

app.get('/catalog', (req, res) => {
  db.query('SELECT * FROM catalog', (err, results) => {
    if (err) return res.status(404).send("nenhum jogo encontrado")
    else return res.status(200).send(results)
  })
})

app.post('/addCart/:id', (req, res) => {
  const id = req.params.id

  db.query('SELECT * FROM catalog WHERE id = ?', id, (err, result) => {
    if (err) res.status(400).send({ success: false })
    else {
      const gameId = result[0].id

      db.query('INSERT INTO cart SET ?', {gameId: gameId}, (err, result) => {
        if (err) {
          console.log({error: err})
        }
        else return res.status(200).send({ success: true })
      })
    }    
  })
})

app.listen(4000, () => {
  console.log("API running...")
})