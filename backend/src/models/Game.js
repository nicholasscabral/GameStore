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
    return await knex("catalog").where("id", id).del();
  }

  async findAll() {
    try {
      return await knex.select("*").from("catalog");
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
      return result.length > 0 ? result[0] : undefined;
    } catch (err) {
      console.log(err);
    }
  }

  async update(id, data) {
    try {
      const game = await this.findById(id);
      const { title, price, year, imgUrl } = data;

      if (!game) {
        return { status: false, message: "game does not exist" };
      } else {
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
      }
    } catch (err) {
      return { success: false, err: err };
    }
  }
}

module.exports = new Game();
