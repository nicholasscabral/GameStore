const db = require('../database/connection');

class Game {
  async new(title, price, year, imgUrl) {
    try {
      db.query('INSERT INTO catalog SET ?', {title: title, price: price, year: year, imgUrl: imgUrl}, 
      (err, result) => {
        return (result.status === 200) ? true : false;
      })
    } catch (err) {
      console.log(err);
    }    
  }

  async search(title) {
    try {
      db.query('SELECT * FROM catalog WHERE title LIKE ?', {title: title},
      (err, results) => {
        return (results.length > 0) ? results : [];
      })
    } catch (err) {
      console.log(err);
    }
  }

  
}

export { Game };
