export const fetchGames = async (
  page = 1,
  pageSize = 50,
  search = "",
  genreId = "",
  platform = "",
  pageNum = 1
) => {
  const cacheKey = `games_${search}_${genreId}_${platform}_${pageNum}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  let url = `/api/games?page=${page}&page_size=${pageSize}`;
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
  const res = await fetch(`/api/games/${id}`);
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
  const res = await fetch(`/api/games/${id}/screenshoots`);
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  sessionStorage.setItem(cacheKey, JSON.stringify(data));
  return data.results;
};
