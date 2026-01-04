const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchGames = async (
  page = 1,
  pageSize = 40,
  searchTerm = "",
  filters = {}
) => {
  let url = `/api/games?page=${page}&page_size=${pageSize}`;
  if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
  if (filters.platform)
    url += `&platforms=${encodeURIComponent(filters.platform)}`;
  if (filters.genre) url += `&genres=${encodeURIComponent(filters.genre)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return await res.json();
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
  const results = data.data || [];

  sessionStorage.setItem(cacheKey, JSON.stringify(results));
  return results;
};

export const fetchScreenShots = async (id) => {
  const cacheKey = `screenShots_${id}`;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  const res = await fetch(`${BASE_URL}/games/${id}/screenshots`);
  if (!res.ok) throw new Error("Failed to fetch");
  const { data } = await res.json();
  sessionStorage.setItem(cacheKey, JSON.stringify(data));
  return data || [];
};

export const fetchFeaturedGames = async () => {
  const cacheKey = "featuredGames";
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  const res = await fetch(`${BASE_URL}/games/featured`);
  if (!res.ok) throw new Error("Failed to fetch");
  const { data } = await res.json();
  localStorage.setItem(cacheKey, JSON.stringify(data));
  return data || [];
};
