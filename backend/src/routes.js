const { Router } = require('express');
const router = Router();

const GameController = require('./controllers/GameController')

// Store routes
router.get("/games", GameController.catalog);
// router.get("/shoppingCart", shoppingCart);
// router.post("/addCart/:id", addGameToCart);
// router.post("/deleteFromCart/:id", removeGameFromCart);
// router.get("/searchGame/:searchValue", searchGame);

// Game routes
router.post("/game", GameController.create);
router.get("/game", GameController.search);
router.delete("/game/:id", GameController.delete);
router.put("/game/:id", GameController.edit);
router.get("/game/:id", GameController.searchById);

// Admin routes
// router.post("/register-admin", registerAdmin);
// router.post("/admin-auth", loginAdmin);

module.exports = router;