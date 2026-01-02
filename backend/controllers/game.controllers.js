export const getGames = async (req, res) => {
  const {
    search,
    page = 1,
    page_size = 40,
    genres = "",
    platforms = "",
  } = req.query;
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
    res.status(200).json({ message: "succesfully fetched", data });
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
    res.status(200).json({ message: "games found by genre", data });
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
    res.status(200).json({ message: "games found by platform", data });
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
    res.status(200).json({ message: "featured games", data });
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
    res.status(200).json({ message: "screenshots", data });
  } catch (e) {
    res.status(500).json({ error: "RAWG API ERROR", e });
  }
};
