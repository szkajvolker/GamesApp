import GameCache from "../models/GameCache.js";

export const getGames = async (req, res) => {
  const {
    search,
    page = 1,
    page_size = 40,
    genres = "",
    platforms = "",
  } = req.query;
  const cacheKey = `games_${search}_${genres}_${platforms}_${page}_${page_size}`;
  const cached = await GameCache.findOne({ cacheKey });
  if (cached) {
    const filteredResults = Array.isArray(cached.data.results)
      ? cached.data.results.filter(
          (game) =>
            !game.tags?.some((tag) => tag.name?.toLowerCase() === "nsfw")
        )
      : cached.data.results;
    return res.status(200).json({
      message: "from cache",
      data: filteredResults,
      count: cached.data.count,
      next: cached.data.next,
    });
  }
  let url = `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&page=${page}&page_size=${page_size}`;
  if (search) url += `&search=${encodeURIComponent(search)}`;
  if (genres) url += `&genres=${encodeURIComponent(genres)}`;
  if (platforms) url += `&platforms=${encodeURIComponent(platforms)}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (Array.isArray(data.results)) {
      data.results = data.results.filter(
        (game) => !game.tags?.some((tag) => tag.name?.toLowerCase() === "nsfw")
      );
    }
    const results = data.results;
    const count = data.count;
    const next = data.next;
    await GameCache.create({ cacheKey, data: { results, count, next } });
    res.status(200).json({
      message: "successfully fetched",
      data: results,
      count,
      next,
    });
  } catch (e) {
    res.status(500).json({ error: "RAWG API ERROR", e });
  }
};

export const getGameById = async (req, res) => {
  const { id } = req.params;
  const url = `https://api.rawg.io/api/games/${id}?key=${process.env.RAWG_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json({ message: "game found", data });
  } catch (e) {
    res.status(500).json({ error: "RAWG API ERROR", e });
  }
};

export const getGameByGenre = async (req, res) => {
  const { genre } = req.query;
  const url = `https://api.rawg.io/api/games?key=${
    process.env.RAWG_API_KEY
  }&genres=${encodeURIComponent(genre || "")}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res
      .status(200)
      .json({ message: "games found by genre", data: data.results });
  } catch (e) {
    res.status(500).json({ error: "RAWG API error", e });
  }
};

export const getGameByPlatform = async (req, res) => {
  const { platform } = req.query;
  const url = `https://api.rawg.io/api/games?key=${
    process.env.RAWG_API_KEY
  }&platforms=${encodeURIComponent(platform || "")}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json({ message: "games found by platform", data: data });
  } catch (e) {
    res.status(500).json({ error: "RAWG API ERROR", e });
  }
};

export const getFeaturedGames = async (req, res) => {
  const url = `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&ordering=-rating&page_size=40`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (Array.isArray(data.results)) {
      data.results = data.results.filter(
        (game) =>
          !game.esrb_rating ||
          (game.esrb_rating && game.esrb_rating?.name !== "Adults Only")
      );
    }
    res.status(200).json({ message: "featured games", data: data.results });
  } catch (e) {
    res.status(500).json({ error: "RAWG API ERROR", e });
  }
};

export const getScreenShots = async (req, res) => {
  const { id } = req.params;
  const url = `https://api.rawg.io/api/games/${id}/screenshots?key=${process.env.RAWG_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json({ message: "screenshots", data: data.results });
  } catch (e) {
    res.status(500).json({ error: "RAWG API ERROR", e });
  }
};
