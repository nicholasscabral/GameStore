const db = require('../database/db');
const Promise = require('bluebird')

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

module.exports = {
  getCatalog,
  searchGame,
  shoppingCart,
  addGameToCart
}