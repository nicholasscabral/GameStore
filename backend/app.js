const express = require('express')
const app = express()
const mysql = require('mysql')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

dotenv.config({ path: './.env' })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

app.listen(4000, () => {
  console.log("API running...")
})