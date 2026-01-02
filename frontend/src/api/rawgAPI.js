const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchGames = async (
  page = 1,
  pageSize = 50,
  search = "",
  genreId = "",
  platform = ""
) => {
  const cacheKey = `games_${search}_${genreId}_${platform}_${page}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  let url = `${BASE_URL}/games?page=${page}&page_size=${pageSize}`;
  if (search && search.trim()) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  if (genreId) {
    url += `&genres=${genreId}`;
  }
  if (platform) {
    url += `&platforms=${platform}`;
  }
  if (!search && !genreId && !platform) {
    url += `&ordering=-rating&metacritic=90,100`;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  localStorage.setItem(cacheKey, JSON.stringify(data));
  return data;
};

export const fetchGameDetail = async (id) => {
  const cacheKey = `gameDetail_${id}`;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  const res = await fetch(`${BASE_URL}/games/${id}`);
  if (!res.ok) throw new Error("Failed to fetch!");
  const data = await res.json();
  sessionStorage.setItem(cacheKey, JSON.stringify(data));
  return data;
};

export const fetchScreenShots = async (id) => {
  const cacheKey = `screenShots_${id}`;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  const res = await fetch(`${BASE_URL}/games/${id}/screenshots`);
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();

  sessionStorage.setItem(cacheKey, JSON.stringify(data.data.results));
  return data.data.results;
};

export const fetchFeaturedGames = async () => {
  const cacheKey = "featuredGames";
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  const res = await fetch(`${BASE_URL}/games/featured`);
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  localStorage.setItem(cacheKey, JSON.stringify(data.data.results));
  return data.data.results;
};
