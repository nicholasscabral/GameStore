require("dotenv").config();

const knexDB = require("knex");
const config = require("./config");

let knex = null;
if (process.env.NODE_ENV === "test") {
  knex = knexDB(config.test);
} else {
  knex = knexDB(config.development);
}

module.exports = knex;
