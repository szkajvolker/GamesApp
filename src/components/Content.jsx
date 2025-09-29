import { useEffect, useRef, useState } from "react";
import GameCard from "./GameCard";
import MoreDetailsModal from "./MoreDetailModal";
import gsap from "gsap";
import { toast } from "sonner";
import { TRIPLE_GENRES } from "../constants";
import { GENRES } from "../constants";

const API_BASE_URL = "https://api.rawg.io/api";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const Content = ({ searchTerm = "" }) => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [game, setGame] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameScreenShots, setGameScreenShots] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreScrollRef = useRef(null);
  const genreAnimationRef = useRef(null);
  const [loading, setLoading] = useState(false);

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
      console.log("game detail fetched");
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
      console.log("Screenshots fetched");
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
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  useEffect(() => {
    fetchGames(searchTerm, selectedGenres, page);
  }, [searchTerm, selectedGenres, page]);

  useEffect(() => {
    setGames([]);
    setPage(1);
  }, [searchTerm, selectedGenres]);

  useEffect(() => {
    if (genreScrollRef.current) {
      const container = genreScrollRef.current;
      const cardWidth = 300;
      const singleSetWidth = cardWidth * GENRES.length;

      gsap.set(container, { x: 0 });

      genreAnimationRef.current = gsap.to(container, {
        x: -singleSetWidth,
        duration: 80,
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
  }, []);

  loading && (
    <div>
      <p>LOADING</p>
    </div>
  );

  return (
    <div className="bg-gray-900" id="Games">
      <div className="px-20 py-8">
        <h2 className="text-white text-2xl font-bold mb-6">Browse by Genre</h2>

        <button
          onClick={() => setSelectedGenres([])}
          className={`flex-shrink-0 px-6 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer ${
            selectedGenres.length === 0
              ? "bg-blue-600 text-white shadow-lg scale-105"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          All games
        </button>
        <div className="relative overflow-hidden rounded-lg">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-gray-900 via-transparent to-gray-900 z-10"></div>
          <div ref={genreScrollRef} className="flex space-x-4">
            <button
              onClick={() => handleGenreClick(null)}
              className={`flex-shrink-0 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedGenres === null
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
              }`}
            ></button>

            {TRIPLE_GENRES.map((genre, i) => (
              <button
                key={`${genre.id}-${i}`}
                onClick={() => handleGenreClick(genre.id)}
                className={`genre-card flex-shrink-0 px-6 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 ${
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
