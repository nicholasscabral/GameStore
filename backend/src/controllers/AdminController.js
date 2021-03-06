require("dotenv").config();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AdminController {
  async login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const admin = await Admin.findByUsername(username);

    if (!admin) {
      return res.status(404).send({ message: "Invalid username or password" });
    }

    var passwordMatches = await bcrypt.compare(password, admin.password);

    if (!passwordMatches) {
      return res.status(401).send({ message: "Invalid username or password" });
    }

    const token = await jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    if (!token) {
      return res.status(500).send({ message: "Internal server error." });
    }

    return res
      .status(200)
      .send({ success: true, token: token, loggedUser: admin.username });
  }

  async register(req, res) {
    const { username, email, password, passwordConfirm } = req.body;

    if (!username || !email || !password || !passwordConfirm) {
      return res.send(400).send({ message: "Invalid credentials" });
    }

    const emailAlreadyExist = await Admin.find(email);

    if (emailAlreadyExist) {
      return res.status(400).send({ message: "Email already in use" });
    }

    const usernameAlreadyExist = await Admin.findByUsername(username);

    if (usernameAlreadyExist) {
      return res.status(400).send({ message: "Username already in use" });
    }

    if (password != passwordConfirm) {
      return res.status(400).send({ message: "Passwords do not match" });
    }

    const success = await Admin.new(username, email, password);

    if (!success) {
      return res
        .status(500)
        .send({ success: false, message: "Internal server error" });
    }

    return res.status(201).send({ success: true, message: "Admin registered" });
  }

  async delete(req, res) {
    const id = req.params.id;

    await Admin.delete(id);

    res.status(200).send({ success: true, message: "Admin deleted" });
  }

  async index(req, res) {
    const admins = await Admin.findAll();

    if (admins) {
      return res.status(200).send(admins);
    }
  }

  async edit(req, res) {
    const id = req.params.id;
    const { username, email, password, passwordConfirm } = req.body;

    const user = await Admin.findById(id);

    // verificando se o usuario existe
    if (!user) {
      return res.status(404).send({ message: "this User does not exist" });
    }

    // verificando se o email ja esta em uso
    if (email) {
      const emailAlreadyExist = await Admin.find(email);

      if (emailAlreadyExist) {
        return res.status(403).send({ message: "Email already in use" });
      }
    }

    // verificando se o username ja esta em uso
    if (username) {
      const usernameAlreadyExist = await Admin.findByUsername(username);

      if (usernameAlreadyExist) {
        return res.status(403).send({ message: "Username already in use" });
      }
    }

    // se a senha for valida, a confirmação da senha tb deve ser valido
    if (password && !passwordConfirm) {
      return res
        .status(400)
        .send({ message: "passwordConfirm field is required" });
    } else if (password && passwordConfirm && password != passwordConfirm) {
      return res.status(400).send({ message: "Passwords do not match" });
    } else if (password == user.password) {
      return res
        .status(400)
        .send({ message: "enter a password different than yours" });
    }

    const editFields = {
      username,
      email,
      password,
    };

    const result = await Admin.update(id, editFields);

    if (!result.success) {
      return res.status(400).send({ err: result.err });
    }

    res.status(204).send({ message: "Admin info updated", success: true });
  }
}

module.exports = new AdminController();
