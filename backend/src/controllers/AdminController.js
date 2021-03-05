const Admin = require("../models/Admin");

class AdminController {
  async login(req, res) {}

  async register(req, res) {
    const { username, email, password, passwordConfirm } = req.body;

    if (!username || !email || !password || !passwordConfirm) {
      return res.send(400).send({ message: "Invalid credentials" });
    }

    if (password != passwordConfirm) {
      return res.status(400).send({ message: "Passwords do not match" });
    }

    const emailAlreadyExist = await Admin.find(email);

    if (emailAlreadyExist) {
      return res.status(400).send({ message: "Email already in use" });
    }

    const success = await Admin.new(username, email, password);

    if (!success) {
      return res
        .status(500)
        .send({ success: false, message: "Internal server error" });
    }

    return res.status(201).send({ success: true, message: "Admin registered" });
  }
}

module.exports = new AdminController();
