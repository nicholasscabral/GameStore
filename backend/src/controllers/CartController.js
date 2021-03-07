const Cart = require("../models/Cart");

class CartController {
  async add(req, res) {
    const game_id = req.params.game_id;

    if (!game_id) {
      return res.status(400).send({ message: "game_id is required" });
    }

    const result = await Cart.add(game_id);

    if (!result.success) {
      return res.status(500).send({ message: "Internal server error" });
    }

    res.status(200).send({ message: "Game added to cart", success: true });
  }

  async sync(req, res) {
    const results = await Cart.relate();

    if (!results) {
      return res.status(500).send({ message: "Internal server error" });
    }

    res.status(200).send(results);
  }

  async remove(req, res) {
    const game_id = req.params.game_id;

    if (!game_id) {
      return res.status(400).send({ message: "game_id is required" });
    }

    const result = await Cart.remove(game_id);

    if (!result.success) {
      return res.status(500).send({ message: "Internal server error" });
    }

    res.status(200).send({ message: "Game removed from cart" });
  }
}

module.exports = new CartController();
