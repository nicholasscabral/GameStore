const { Router } = require("express");
const router = Router();

const GameController = require("./controllers/GameController");
const AdminController = require("./controllers/AdminController");

// Store routes
// router.get("/shoppingCart", shoppingCart);
// router.post("/addCart/:id", addGameToCart);
// router.post("/deleteFromCart/:id", removeGameFromCart);
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

module.exports = router;
