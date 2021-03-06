const knex = require("../database/connection");
const bcrypt = require("bcryptjs");

class Admin {
  async findAll() {
    try {
      return knex("admin").select(["id", "username", "email"]);
    } catch (err) {
      console.log(err);
    }
  }

  async find(email) {
    try {
      const result = await knex("admin").where("email", email);

      return result.length > 0 ? true : false;
    } catch (err) {
      console.log(err);
    }
  }

  async findById(id) {
    try {
      const result = await knex("admin").where("id", id);

      return result.length > 0 ? result[0] : null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async findByUsername(username) {
    try {
      const result = await knex("admin").where("username", username);

      return result.length > 0 ? result[0] : null;
    } catch (err) {
      console.log(err);
      return null;
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

  async delete(id) {
    try {
      return await knex("admin").where("id", id).del();
    } catch (err) {
      console.log(err);
    }
  }

  async update(id, data) {
    try {
      const { username, email, password } = data;

      var editAdmin = {};

      if (username) {
        editAdmin.username = username;
      }

      if (email) {
        editAdmin.email = email;
      }

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 8);
        editAdmin.password = hashedPassword;
      }

      await knex("admin").where("id", id).update(editAdmin);
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false, err: err };
    }
  }
}

module.exports = new Admin();
