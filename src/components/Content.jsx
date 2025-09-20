import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import MoreDetailsModal from "./MoreDetailModal";

const API_BASE_URL = "https://api.rawg.io/api";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const Content = () => {
  const [games, setGames] = useState([]);
  const [game, setGame] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameScreenShots, setGameScreenShots] = useState([]);

  const fetchGames = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/games?key=${API_KEY}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      setGames(data.results);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      console.log("Data successfully fetched");
    }
  };

  const fetchGameDetail = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/games/${id}?key=${API_KEY}`);
      if (!res.ok) throw new Error("Failed to fetch!");
      const data = await res.json();
      setGame(data);
      setSelectedGame(id);
      console.log(data);
      console.log(selectedGame);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  const fetchScreenShots = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/games/${id}/screenshots?key=${API_KEY}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setGameScreenShots(data.results);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  const handleDetailsClick = async (id) => {
    await fetchGameDetail(id);
    await fetchScreenShots(id);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <>
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
    </>
  );
};

export default Content;
