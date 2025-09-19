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

      setGames(data);
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

  return <div>{games.length > 0 && <GameCard games={games} />}</div>;
};

export default Content;
