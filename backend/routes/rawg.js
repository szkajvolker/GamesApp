import express from "express";
import {
  getGameByGenre,
  getGameByPlatform,
  getGameById,
  getGames,
  getFeaturedGames,
} from "../controllers/game.controllers.js";

const router = express.Router();

router.get("/genre", getGameByGenre);
router.get("/platform", getGameByPlatform);
router.get("/", getGames);
router.get("/featured", getFeaturedGames);
router.get("/:id", getGameById);

export default router;
