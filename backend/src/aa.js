const db = require('../database/db');
const Promise = require('bluebird')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config({ path: './.env' })

function getCatalog(req, res) {
  db.query('SELECT * FROM catalog', (err, results) => {
    if (err) return res.status(404).send("nenhum jogo encontrado")
    else return res.status(200).send(results)
  })
}

function searchGame(req, res) {
  const { searchValue } = req.params

  db.query('SELECT * FROM catalog WHERE title LIKE ?', `%${searchValue}%`, (err, results) => {
    if (err) return res.status(500).send(err)
    else return res.status(200).send({ success: true, results: results })
  })
}

function getGamebyId(req, res) {
  const id = req.params.id

  db.query('SELECT * FROM catalog WHERE id = ?', id, (err, result) => {
    if (err) return res.status(500).send(err)
    else return res.status(200).send(result)
  })
}

function deleteGame(req, res) {
  const id = req.params.id

  db.query('DELETE FROM catalog WHERE id = ?', id, (err, result) => {
    if (err) return res.status(500).send({ success: false, error: err })
    else return res.status(200).send({ success: true, message: "Game deleted successfully"})
  })
}

function updateGame(req, res) {
  console.log(req.body)
  const id = req.params.id
  const { imgUrl, title, price, year } = req.body
  const defaultQuery = 'UPDATE catalog SET '
  let query = defaultQuery
  const queryData = []

  if (imgUrl) {
    console.log(imgUrl)
    query += 'imgUrl=?, '
    queryData.push(imgUrl)
  }

  if (title) {
    console.log(title)
    query += 'title=?, '
    queryData.push(title)
  }
  
  if (price) {
    console.log(price)
    query += 'price=?, '
    queryData.push(price)
  }

  if (year) {
    query += 'year=?, '
    queryData.push(year)
  }

  if (query === defaultQuery) res.sendStatus(500)
  else {
    query = query.trim()
    query = query.slice(0, query.length - 1)
    query = query + ' WHERE id=?'
    queryData.push(id)

    db.query(query, queryData, (err, result) => {
      if (err) {
        console.log(err)
        res.sendStatus(400)
      }
      else {
        console.log(result)
        return res.status(200).send("DADOS ATUALIZADOS")
      }
    })
  }
}

async function shoppingCart(req, res) {
  const games = await getQueryRes('SELECT * FROM cart')

  let query_str = 'SELECT * FROM catalog WHERE ';

  games.forEach(({gameId}, idx) => {
    query_str =`${query_str} id=${gameId}`
    if((idx + 1) < games.length) {
      query_str =`${query_str} OR `  
    }
  })

  db.query(query_str, (err, result) => {
    res.send(result)
  })
}

function addGameToCart(req, res) {
  const id = req.params.id

  db.query('SELECT * FROM catalog WHERE id = ?', id, (err, result) => {
    if (err) res.status(400).send({ success: false })
    else {
      const gameId = result[0].id
      db.query('SELECT COUNT(id) AS count FROM cart WHERE gameId = ?', gameId, (err, result) => {
        console.log(result[0].count);
        if (result[0].count === 0) {
          db.query('INSERT INTO cart SET ?', {gameId: gameId}, (err, result) => {
            if (err) console.log({error: err})
            else return res.status(200).send({ success: true })
          })
        } else return res.status(200).send({ success: false })
      })
    }    
  })
}

const getQueryRes = async (query) => new Promise((resolve, reject) => {
  db.query(query,(err,res)=>{
    if(!err) {
      resolve(res);
    }
  })
}).catch(err => reject(err));

function addGame(req, res) {
  const { title, price, year, imgUrl } = req.body;

  db.query('INSERT INTO catalog SET ?', {title: title, price: price, year: year, imgUrl: imgUrl}, (err, result) => {
    if (err) return res.status(500).send(err);
    else return res.status(200).send({message: 'JOGO CADASTRADO', success: true});
  })
}

function removeGameFromCart(req, res) {
  const gameId = req.params.id;

  db.query('DELETE FROM cart WHERE gameId = ?', gameId, (err, result) => {
    if (err) console.log(err)
    else return res.status(200).send({ success: true });
  })
}

async function registerAdmin(req, res) {
  const { username, email, password, passwordConfirm } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({ message: "Invalid credencials"})
  }

  if (password !== passwordConfirm) {
    return res.status(400).send({ message: "Passwords do not match"})
  }

  const result = await getQueryRes(`SELECT * FROM admin WHERE email = "${email}"`)

  if (result.length > 0) {
    return res.status(400).send({success: false, message: "Email already in use"})
  }
  else {
    const hashedPassword = await bcrypt.hash(password, 8)

    db.query("INSERT INTO admin SET ?", { username: username, email: email, password: hashedPassword }, (err, result) => {
      if (err) return res.status(500).send({ message: "Internal server error" })
      else return res.status(200).send({ success: true, message: "Admin registered" })
    })
  }
}

async function loginAdmin(req, res) {
  const { username, password } = req.body

  if (!username || !password) return res.status(400).send({ message: 'Invalid credencials'})

  const result = await getQueryRes(`SELECT * FROM admin WHERE username = "${username}"`)
  const admin = result[0]

  var passwordMatches = await bcrypt.compare(password, admin.password)

  if (passwordMatches) {
    jwt.sign({id: admin.id, username: admin.username}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    }, (err, token) => {
      if (err) return res.status(500).send(err)
      else return res.status(200).send({success: true, token: token, loggedUser: admin.username})
    })
  } else {
    return res.status(401).send({ message: "username or password incorrect" })
  }
}

module.exports = {
  getCatalog,
  searchGame,
  getGamebyId,
  deleteGame,
  updateGame,
  shoppingCart,
  addGameToCart,
  addGame,
  removeGameFromCart,
  registerAdmin,
  loginAdmin
}