import { useEffect, useState } from "react";
import { fetchGames } from "../api/rawgAPI";
import { toast } from "sonner";
import SidebarFilters from "../UI/SidebarFilters";
import Loading from "../UI/Loading";
import Pagination from "../components/Pagination";
import GameCard from "../components/GameCard";
import { useNavigate } from "react-router-dom";

const Home = ({ searchTerm = "" }) => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ platform: null, genre: null });
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
  const navigate = useNavigate();
  const handleDetailsClick = (id) => {
    navigate(`/details/${id}`);
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
      className="flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
      id="games"
    >
      <div className="py-8 md:px-10">
        <div className="flex sticky top-10 left-0 z-20 max-h-[calc(100vh-5rem)] w-full md:w-30 overflow-y-auto flex-row gap-4 flex-wrap lg:justify-self-start justify-center scrollbar-hide ">
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
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2 md:px-15 md:py-15 w-full">
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
          )}
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default Home;
