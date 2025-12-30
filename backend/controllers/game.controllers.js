export const getGames = async (req, res) => {
  const {
    search,
    page = 1,
    page_size = 50,
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
    res.status(200).json({ message: "succesfully fetched", data });
    console.log("latest getGames");
  } catch (e) {
    res.status(500).json({ error: "RAWG API ERROR" });
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
    res.status(500).json({ error: "RAWG API ERROR" });
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
    res.status(500).json({ error: "RAWG API error" });
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
    res.status(500).json({ error: "RAWG API ERROR" });
  }
};
