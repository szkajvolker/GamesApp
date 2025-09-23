import { useEffect, useRef, useState } from "react";
import GameCard from "./GameCard";
import MoreDetailsModal from "./MoreDetailModal";
import gsap from "gsap";
import { toast } from "sonner";

const API_BASE_URL = "https://api.rawg.io/api";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const Content = ({ searchTerm = "" }) => {
  const [games, setGames] = useState([]);
  const [game, setGame] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameScreenShots, setGameScreenShots] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreScrollRef = useRef(null);
  const genreAnimationRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const fetchGames = async (search = "", genreIds = []) => {
    const cacheKey = `games_${search}_${genreIds.join(",")}`;

    if (genreIds.length > 0 || (search && search.trim())) {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setGames(JSON.parse(cached));
        toast.info("Games loaded from cache", { duration: 2000 });
        return;
      }
    }
    setLoading(true);
    try {
      let url = `${API_BASE_URL}/games?key=${API_KEY}`;
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
      setGames(data.results);

      if (genreIds.length > 0 || (search && search.trim())) {
        localStorage.setItem(cacheKey, JSON.stringify(data.results));
      }

      const cacheStatus =
        genreIds.length > 0 || (search && search.trim()) ? "cached" : "fresh data";
      toast.success(`Games loaded successfully! (${cacheStatus})`);
    } catch (error) {
      console.error("Failed to fetch data", error);
      toast.error("Failed to load games. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchGameDetail = async (id) => {
    const cacheKey = `gameDetail${id}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setGame(JSON.parse(cached));
      setSelectedGame(id);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/games/${id}?key=${API_KEY}`);
      if (!res.ok) throw new Error("Failed to fetch!");
      const data = await res.json();
      setGame(data);
      setSelectedGame(id);
      localStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      console.log("game detail fetched");
      setLoading(false);
    }
  };

  const fetchScreenShots = async (id) => {
    const cacheKey = `screenshots_${id}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setGameScreenShots(JSON.parse(cached));
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/games/${id}/screenshots?key=${API_KEY}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setGameScreenShots(data.results);
      localStorage.setItem(cacheKey, JSON.stringify(data.results));
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      console.log("Screenshots fetched");
      setLoading(false);
    }
  };

  const fetchGenres = async () => {
    const cacheKey = "genres";
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const originalGenres = JSON.parse(cached);
      setGenres([...originalGenres, ...originalGenres, ...originalGenres]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/genres?key=${API_KEY}`);
      if (!res.ok) throw new Error("Failed to fetch genres");
      const data = await res.json();
      setGenres([...data.results, ...data.results, ...data.results]);
      localStorage.setItem(cacheKey, JSON.stringify(data.results));
    } catch (error) {
      console.error("Failed to fetch genres", error);
    } finally {
      console.log("Genres fetched");
      setLoading(false);
    }
  };

  const handleDetailsClick = async (id) => {
    await fetchGameDetail(id);
    await fetchScreenShots(id);
  };

  const handleGenreClick = (genreId) => {
    if (genreId === null) {
      setSelectedGenres([]);
      return;
    }
    setSelectedGenres((prev) => {
      if (prev.includes(genreId)) {
        return prev.filter((id) => id !== genreId);
      }
      if (prev.length < 3) {
        return [...prev, genreId];
      }
      return [...prev.slice(1), genreId];
    });
  };

  useEffect(() => {
    fetchGames("", []);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() || selectedGenres.length > 0) {
      fetchGames(searchTerm, selectedGenres);
    }
  }, [searchTerm, selectedGenres]);

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    if (genres.length > 0 && genreScrollRef.current) {
      const container = genreScrollRef.current;
      const cardWidth = 200;
      const totalWidth = cardWidth * (genres.length / 3);

      genreAnimationRef.current = gsap.to(container, {
        x: -totalWidth,
        duration: 100,
        ease: "none",
        repeat: -1,
        paused: false,
      });
      const genreCards = container.querySelectorAll(".genre-card");
      genreCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(genreAnimationRef.current, { timeScale: 0.2, duration: 0.5 });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(genreAnimationRef.current, { timeScale: 1, duration: 0.5 });
        });
      });
      return () => {
        if (genreAnimationRef.current) {
          genreAnimationRef.current.kill();
        }
      };
    }
  }, [genres]);

  loading && (
    <div>
      <p>LOADING</p>
    </div>
  );

  return (
    <div className="bg-gray-900" id="content">
      <div className="px-20 py-8">
        <h2 className="text-white text-2xl font-bold mb-6">Browse by Genre</h2>
        <div className="relative overflow-hidden rounded-lg">
          <div ref={genreScrollRef} className="flex space-x-4">
            <button
              onClick={() => handleGenreClick(null)}
              className={`flex-shrink-0 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedGenres === null
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
              }`}
            >
              All Games
            </button>

            {genres.map((genre, i) => (
              <button
                key={`${genre.id}-${i}`}
                onClick={() => handleGenreClick(genre.id)}
                className={`genre-card flex-shrink-0 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedGenres.includes(genre.id)
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-20">
        {games.length > 0 &&
          games.map((game) => (
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
          game={game}
          gameScreenShots={gameScreenShots}
          onClose={() => setSelectedGame(null)}
        />
      )}
    </div>
  );
};

export default Content;
