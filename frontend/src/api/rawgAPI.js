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
    try {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed)) {
        return {
          results: parsed,
          count: parsed.length,
          next: null,
        };
      }
      if (parsed && typeof parsed === "object") {
        return {
          results: parsed.results || [],
          count: parsed.count ?? parsed.results?.length ?? 0,
          next: parsed.next ?? null,
        };
      }
    } catch {
      //error
    }
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
  const results = {
    results: data.data?.results || [],
    count: data.data?.count || 0,
    next: data.data?.next || null,
  };
  localStorage.setItem(cacheKey, JSON.stringify(results));
  console.log("allgames: ", results);
  return results;
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
  console.log("fetchgameDetails: ", results);
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
  const data = await res.json();
  const results = data.data?.results || [];
  console.log("screenshots :", results);
  sessionStorage.setItem(cacheKey, JSON.stringify(results));
  return results;
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
  const results = data.data?.results || [];
  console.log("featuredgames: ", results);
  localStorage.setItem(cacheKey, JSON.stringify(results));
  return results;
};
