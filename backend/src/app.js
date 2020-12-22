const { getCatalog, searchGame, shoppingCart, addGameToCart } = require('./routes/routes')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/catalog', getCatalog)

app.get('/searchGame/:searchValue', searchGame)

app.get('/shoppingCart', shoppingCart)

app.post('/addCart/:id', addGameToCart)

app.listen(4000, () => {
  console.log("API running...")
})