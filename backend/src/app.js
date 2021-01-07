const { 
  getCatalog, 
  searchGame,
  getGamebyId, 
  shoppingCart, 
  addGameToCart, 
  addGame, 
  removeGameFromCart,
  registerAdmin,
  loginAdmin
} = require('./routes/routes')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/catalog', getCatalog)

app.get('/searchGame/:searchValue', searchGame)

app.get('/getGame/:id', getGamebyId)

app.get('/shoppingCart', shoppingCart)

app.post('/addCart/:id', addGameToCart)

app.post('/', addGame)

app.post('/deleteFromCart/:id', removeGameFromCart)

app.post('/register-admin', registerAdmin)

app.post('/admin-auth', loginAdmin)

app.listen(4000, () => {
  console.log("API running...")
})