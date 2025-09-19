import { useEffect, useState } from "react";
import GameCard from "./GameCard";

const API_BASE_URL = "https://api.rawg.io/api";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const Content = () => {
  const [games, setGames] = useState([]);

  const fetchGames = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/games?key=${API_KEY}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      setGames(data.results);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      console.log("Data successfully fetched");
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-20">
      {games.length > 0 &&
        games.map((game) => (
          <GameCard
            key={game.id}
            title={game.name}
            image={game.background_image}
            price={game.price || "N/A"}
            genres={game.genres?.map((g) => g.name)}
            rating={game.rating}
            releaseDate={game.released}
            platforms={game.platforms?.map((p) => p.platform.name)}
          />
        ))}
    </div>
  );
};

export default Content;
