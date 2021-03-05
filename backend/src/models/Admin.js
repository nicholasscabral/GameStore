const knex = require("../database/connection");
const bcrypt = require("bcryptjs");

class Admin {
  async find(email) {
    try {
      const result = await knex("admin").where("email", email);

      return result.length > 0 ? true : false;
    } catch (err) {
      console.log(err);
    }
  }

  async new(username, email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 8);

      await knex("admin").insert({
        username: username,
        email: email,
        password: hashedPassword,
      });

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

module.exports = new Admin();
