const knex = require('../database/connection');
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
      return await knex('catalog').insert({title, price, year, imgUrl});

    } catch (err) {
      console.log(err);
    }    
  } 

  async delete(id) {
    return await knex('catalog').where({id: id}).del()
  }

  async findAll() {
    try {
      return await knex.select('*').from('catalog')

    } catch (err) {
      console.log(err);
    }
  }

  async find(title) {
    try {
      return await knex('catalog').where('title', 'like', `${title}%`)
      
    } catch (err) {
      console.log(err);
    }
  }

  async findOneByTitle(title) {
    try {
      const result = await knex('catalog').where('title', title);
      return (result.length > 0) ? true : false

    } catch (err) {
      console.log(err)
    }
  }


}

module.exports = new Game();
