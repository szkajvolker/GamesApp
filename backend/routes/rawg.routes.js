import express from "express";
import {
  getGameByGenre,
  getGameByPlatform,
  getGameById,
  getGames,
  getFeaturedGames,
  getScreenShots,
  getGameTrailer,
} from "../controllers/game.controllers.js";

const router = express.Router();

router.get("/genre", getGameByGenre);
router.get("/platform", getGameByPlatform);
router.get("/", getGames);
router.get("/featured", getFeaturedGames);
router.get("/:id/screenshots", getScreenShots);
router.get("/:id/gametrailer", getGameTrailer);
router.get("/:id", getGameById);

export default router;
