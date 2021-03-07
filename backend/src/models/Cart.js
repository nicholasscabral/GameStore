const knex = require("../database/connection");

class Cart {
  async add(id) {
    try {
      await knex("cart").insert({ game_id: id });

      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }

  async relate() {
    try {
      const cart_items = await knex("cart").select(["game_id"]);
      const ids = [];
      cart_items.map((item) => ids.push(item.game_id));

      let query_str = "SELECT * FROM catalog WHERE ";

      ids.forEach((id, idx) => {
        query_str = `${query_str} id=${id}`;
        if (idx + 1 < ids.length) {
          query_str = `${query_str} OR `;
        }
      });

      const result = await knex.raw(query_str);
      const cart_games = result[0];

      return cart_games.length > 0 ? cart_games : false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async remove(id) {
    try {
      await knex("cart").where("game_id", id).del();

      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }
}

module.exports = new Cart();
