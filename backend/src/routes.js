const { Router } = require("express");
const router = Router();

const GameController = require("./controllers/GameController");
const AdminController = require("./controllers/AdminController");
const CartController = require("./controllers/CartController");

// Store routes
router.get("/cart", CartController.sync);
router.post("/cart/:game_id", CartController.add);
router.delete("/cart/:game_id", CartController.remove);
// router.get("/searchGame/:searchValue", searchGame);

// Game routes
router.get("/games", GameController.catalog);
router.post("/game", GameController.create);
router.get("/game", GameController.search);
router.delete("/game/:id", GameController.delete);
router.put("/game/:id", GameController.edit);
router.get("/game/:id", GameController.searchById);

// Admin routes
router.get("/admins", AdminController.index);
router.post("/admin", AdminController.register);
router.post("/admin/auth", AdminController.login);
router.delete("/admin/:id", AdminController.delete);
router.put("/admin/:id", AdminController.edit);

module.exports = router;
