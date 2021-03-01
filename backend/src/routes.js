const { Router } = require('express');
const router = Router();

const GameController = require('./controllers/GameController')

// Store routes
router.get("/catalog", GameController.catalog);
// router.get("/shoppingCart", shoppingCart);
// router.post("/addCart/:id", addGameToCart);
// router.post("/deleteFromCart/:id", removeGameFromCart);
// router.get("/searchGame/:searchValue", searchGame);

// Game routes
router.post("/games", GameController.create);
router.get("/getGame", GameController.search)
router.post("/deleteGame/:id", GameController.delete);
router.post("/updateGame/:id", GameController.update);
// router.get("/getGame/:id", GameController.searchById);

// Admin routes
// router.post("/register-admin", registerAdmin);
// router.post("/admin-auth", loginAdmin);

module.exports = router;