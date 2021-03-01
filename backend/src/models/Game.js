const db = require('../database/connection');
const Promise = require('bluebird');

const getQueryRes = async (query) => new Promise((resolve, reject) => {
  db.query(query,(err,res)=>{
    if(!err) {
      resolve(res);
    }
  })
}).catch(err => reject(err));

class Game {
  async new(title, price, year, imgUrl) {
    try {
      db.query('INSERT INTO catalog SET ?', {title: title, price: price, year: year, imgUrl: imgUrl}, 
      (err, result) => {
        return (result) ? true : false;
      })
    } catch (err) {
      console.log(err);
    }    
  } 

  async findAll() {
    try {
      return getQueryRes('SELECT * FROM catalog')

    } catch (err) {
      console.log(err);
    }
  }

  async find(title) {
    try {
      const results = getQueryRes(`SELECT * FROM catalog WHERE title LIKE '%${title}%'`)
      return results
      
    } catch (err) {
      console.log(err);
    }
  }

  async findOneByTitle(title) {
    try {
      const result = await getQueryRes(`SELECT * FROM catalog WHERE title = '${title}'`)
      return (result.length > 0) ? true : false

    } catch (err) {
      console.log(err)
    }
  }

  async findById(id) {
    
  }

}

module.exports = new Game();
