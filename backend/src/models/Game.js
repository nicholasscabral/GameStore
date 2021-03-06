const knex = require("../database/connection");

class Game {
  async new(title, price, year, imgUrl) {
    try {
      return await knex("catalog").insert({ title, price, year, imgUrl });
    } catch (err) {
      console.log(err);
    }
  }

  async delete(id) {
    try {
      return await knex("catalog").where("id", id).del();
    } catch (err) {
      console.log(err);
    }
  }

  async findAll() {
    try {
      return await knex("catalog").select("*");
    } catch (err) {
      console.log(err);
    }
  }

  async find(title) {
    try {
      return await knex("catalog").where("title", "like", `${title}%`);
    } catch (err) {
      console.log(err);
    }
  }

  async findOneByTitle(title) {
    try {
      const result = await knex("catalog").where("title", title);
      return result.length > 0 ? true : false;
    } catch (err) {
      console.log(err);
    }
  }

  async findById(id) {
    try {
      const result = await knex("catalog").where("id", id);

      return result.length > 0 ? result[0] : null;
    } catch (err) {
      console.log(err);
    }
  }

  async update(id, data) {
    try {
      const { title, price, year, imgUrl } = data;

      var editGame = {};

      if (title) {
        editGame.title = title;
      }

      if (price) {
        editGame.price = price;
      }

      if (year) {
        editGame.year = year;
      }

      if (imgUrl) {
        editGame.imgUrl = imgUrl;
      }

      await knex("catalog").where("id", id).update(editGame);
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false, err: err };
    }
  }
}

module.exports = new Game();
