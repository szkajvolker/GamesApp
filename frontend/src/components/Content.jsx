import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import MoreDetailsModal from "./MoreDetailModal";

import { toast } from "sonner";
import { fetchGames, fetchGameDetail, fetchScreenShots } from "../api/rawgAPI";
import { GENRES, PLATFORMS } from "../constants";
import FilterDropdown from "./FilterDropdown";
import Pagination from "./Pagination";

const Content = ({ searchTerm = "", setHasMore }) => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [game, setGame] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameScreenShots, setGameScreenShots] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      try {
        const data = await fetchGames(
          page,
          50,
          searchTerm,
          selectedGenre,
          selectedPlatform
        );
        setGames(data.data.results);
        setTotalPages(Math.ceil(data.data.count / 50));
        if (!data.data.next) setHasMore(false);
      } catch (error) {
        toast.error("Failed to load games, Please try again.", error);
      } finally {
        setLoading(false);
      }
    };
    loadGames();
  }, [searchTerm, selectedGenre, selectedPlatform, page]);

  const handleDetailsClick = async (id) => {
    setLoading(true);
    setGameScreenShots([]);
    try {
      const gameData = await fetchGameDetail(id);
      setGame(gameData.data);
      setSelectedGame(id);

      const screenShots = await fetchScreenShots(id);
      setGameScreenShots(screenShots);
    } catch (error) {
      toast.error("Failed to load game details.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setGames([]);
    setPage(1);
  }, [searchTerm, selectedGenre, selectedPlatform]);

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform);
  };

  const filteredGames = Array.isArray(games) ? games : [];

  return (
    <div
      className="flex bg-white dark:bg-gray-900 transition-colors duration-300 "
      id="Games"
    >
      <div className="py-8 md:px-10">
        <h2 className="text-gray-700 dark:text-gray-200 text-2xl font-bold mb-6">
          Browse Games
        </h2>
        <div className="flex flex-row gap-4 flex-wrap">
          <FilterDropdown
            label="Platform"
            options={PLATFORMS}
            value={selectedPlatform}
            onChange={handlePlatformChange}
          />
          <FilterDropdown
            label="Genre"
            options={GENRES}
            value={selectedGenre}
            onChange={handleGenreChange}
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          disabled={loading}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2 md:px-15 md:py-15">
          {filteredGames.length > 0 &&
            filteredGames.map((game, index) => (
              <GameCard
                key={`${game.id}-${index}`}
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
