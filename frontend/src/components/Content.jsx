import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import MoreDetailsModal from "./MoreDetailModal";

import { toast } from "sonner";
import { fetchGames, fetchGameDetail, fetchScreenShots } from "../api/rawgAPI";
import Pagination from "./Pagination";
import SidebarFilters from "../UI/SidebarFilters";
import Loading from "../UI/Loading";

const Content = ({ searchTerm = "" }) => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [game, setGame] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [gameScreenShots, setGameScreenShots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ platform: null, genre: null });

  const handleCardHover = (cardId) => {
    setHoveredCardId(cardId);
  };

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      try {
        const data = await fetchGames(page, 40, searchTerm, filters);
        if (!data || !data.data) throw new Error("No data!");
        const results = data.data;
        const count = data.count;
        setGames(results);

        setTotalPages(Math.max(1, Math.ceil(count / 40)));
      } catch (e) {
        if (e.name === "QuotaExceededError") {
          localStorage.clear();
        }
        console.error("loadgames error", e);
        toast.error("Failed to load games, Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadGames();
  }, [searchTerm, filters, page]);

  const handleDetailsClick = async (id) => {
    setLoading(true);
    setGameScreenShots([]);
    try {
      const gameData = await fetchGameDetail(id);
      setGame(gameData);
      setSelectedGame(id);

      const screenShots = await fetchScreenShots(id);
      setGameScreenShots(screenShots);
    } catch (error) {
      console.error("api error", error);
      toast.error("Failed to load game details.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setGames([]);
  }, [searchTerm]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => {
      if (
        prev.platform === newFilters.platform &&
        prev.genre === newFilters.genre
      ) {
        return prev;
      }
      return newFilters;
    });
  };

  const filteredGames = Array.isArray(games) ? games : [];

  return (
    <div
      className="relative flex flex-col md:flex-row bg-gray-100 dark:bg-gray-200 transition-colors duration-300"
      id="Games"
    >
      <div className="py-8 md:px-10">
        <h2 className="text-gray-700 dark:text-gray-200 text-2xl font-bold mb-6">
          Browse Games
        </h2>
        <div className="flex flex-row gap-4 flex-wrap lg:justify-self-start justify-self-center">
          <SidebarFilters onFilterChange={handleFilterChange} />
        </div>
      </div>
      <div className="flex flex-col items-center w-full">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          disabled={loading}
        />
        <div className="min-h-screen flex items-center justify-center w-full">
          {loading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2 md:px-15 md:py-15 w-full items-start">
              {filteredGames.length > 0 &&
                filteredGames.map((game) => {
                  const isActiveCard = hoveredCardId === game.id;

                  return (
                    <GameCard
                      key={game.id}
                      id={game.id}
                      title={game.name}
                      metacritic={game.metacritic}
                      image={game.background_image}
                      genres={game.genres?.map((g) => g.name)}
                      rating={game.rating}
                      releaseDate={game.released}
                      platforms={game.platforms?.map((p) => p.platform.name)}
                      stores={game.stores?.map((s) => s.store.name)}
                      esrbRating={game.esrb_rating?.name}
                      shortScreenshots={game.short_screenshots?.map(
                        (item) => item.image,
                      )}
                      onDetailsClick={handleDetailsClick}
                      onHover={handleCardHover}
                      isOpen={isActiveCard}
                    />
                  );
                })}
            </div>
          )}
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          disabled={loading}
        />
      </div>

      {selectedGame && game && (
        <MoreDetailsModal
          className="z-50"
          game={game}
          gameScreenShots={gameScreenShots}
          onClose={() => {
            setSelectedGame(null);
          }}
        />
      )}
    </div>
  );
};

export default Content;
