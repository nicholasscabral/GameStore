const { Router } = require('express');
const router = Router();

import { GameController } from './controllers/GameControllers'

const gameController = new GameController();

router.get("/catalog", getCatalog);
router.get("/searchGame/:searchValue", searchGame);
router.get("/getGame/:id", getGamebyId);
router.get("/shoppingCart", shoppingCart);
router.post("/addCart/:id", addGameToCart);
router.post("/addGame", gameController.create);
router.post("/deleteGame/:id", deleteGame);
router.post("/updateGame/:id", updateGame);
router.post("/deleteFromCart/:id", removeGameFromCart);
router.post("/register-admin", registerAdmin);
router.post("/admin-auth", loginAdmin);

export { router }