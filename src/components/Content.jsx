import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import MoreDetailsModal from "./MoreDetailModal";

import { toast } from "sonner";
import { GENRES } from "../constants";

const API_BASE_URL = "https://api.rawg.io/api";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const Content = ({ searchTerm = "", setHasMore, hasMore }) => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [game, setGame] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameScreenShots, setGameScreenShots] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const fetchGames = async (search = "", genreIds = [], pageNum = 1) => {
    if (loading) return;
    setLoading(true);
    try {
      let url = `${API_BASE_URL}/games?key=${API_KEY}&page=${pageNum}`;
      if (search && search.trim()) {
        url += `&search=${encodeURIComponent(search)}`;
      } else if (genreIds.length > 0) {
        url += `&genres=${genreIds.join(",")}`;
      } else {
        url += `&ordering=-rating&metacritic=90,100`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setGames((prev) => (pageNum === 1 ? data.results : [...prev, ...data.results]));
      if (!data.next) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
      toast.error("Failed to load games. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchGameDetail = async (id) => {
    const cacheKey = `gameDetail${id}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      setGame(JSON.parse(cached));
      setSelectedGame(id);
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/games/${id}?key=${API_KEY}`);
      if (!res.ok) throw new Error("Failed to fetch!");
      const data = await res.json();
      setGame(data);
      setSelectedGame(id);
      sessionStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchScreenShots = async (id) => {
    const cacheKey = `screenshots_${id}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      setGameScreenShots(JSON.parse(cached));
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/games/${id}/screenshots?key=${API_KEY}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setGameScreenShots(data.results);
      sessionStorage.setItem(cacheKey, JSON.stringify(data.results));
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsClick = async (id) => {
    await fetchGameDetail(id);
    await fetchScreenShots(id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  useEffect(() => {
    fetchGames(searchTerm, selectedGenres, page);
  }, [searchTerm, selectedGenres, page]);

  useEffect(() => {
    setGames([]);
    setPage(1);
    setHasMore(true);
  }, [searchTerm, selectedGenres]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredGames = games.filter(
    (game) => game.esrb_rating?.name && game.esrb_rating.name !== "Adults Only"
  );

  loading && (
    <div>
      <p>LOADING</p>
    </div>
  );

  return (
    <div
      className={`${
        isModalOpen === "true" ? "pointer-events-none" : ""
      }bg-white dark:bg-gray-900 transition-colors duration-300`}
      id="Games"
    >
      <div className="py-8 md:px-10">
        <h2 className="text-gray-700 text-2xl font-bold mb-6">Browse by Genre</h2>
        {!isMobile && (
          <button
            onClick={() => setSelectedGenres([])}
            className={`flex-shrink-0 px-6 py-3 mb-5 rounded-lg font-semibold transition-all duration-300 cursor-pointer ${
              selectedGenres.length === 0
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            All games
          </button>
        )}
        <div className="relative overflow-hidden rounded-lg flex  py-4">
          <select
            className="w-40 h-10 px-5 py-2 rounded-lg bg-gray-700 text-gray-300 font-semibold text-sm"
            value={selectedGenres[0] || ""}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedGenres(val ? [val] : []);
            }}
          >
            <option value="">Válassz műfajt</option>
            {GENRES.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2 md:px-15 md:py-15">
        {filteredGames.length > 0 &&
          filteredGames.map((game) => (
            <GameCard
              key={game.id}
              title={game.name}
              metacritic={game.metacritic}
              image={game.background_image}
              genres={game.genres?.map((g) => g.name)}
              rating={game.rating}
              releaseDate={game.released}
              platforms={game.platforms?.map((p) => p.platform.name)}
              onDetailsClick={handleDetailsClick}
              id={game.id}
            />
          ))}
      </div>
      {selectedGame && game && (
        <MoreDetailsModal
          className="z-50"
          game={game}
          gameScreenShots={gameScreenShots}
          onClose={() => {
            setSelectedGame(null);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Content;
