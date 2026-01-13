import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameDetail, fetchScreenShots } from "../api/rawgAPI";
import { toast } from "sonner";
import Loading from "../UI/Loading";

const GameDetails = () => {
  const { id } = useParams();

  const [game, setGame] = useState(null);
  const [gameScreenshots, setGameScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const gameData = await fetchGameDetail(id);
        setGame(gameData);

        const screenshots = await fetchScreenShots(id);
        setGameScreenshots(screenshots);
      } catch (error) {
        toast.error("Something went wrong");
        console.error("failed to fetch ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className=" flex w-full h-screen  items-center justify-center">
        <Loading />
      </div>
    );
  if (!game) return <div>No data or error happened</div>;

  return (
    <div className="relative min-h-screen z-10">
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src={game.background_image || game.background_image_additional}
          alt="background"
          className="w-full h-full object-cover object-center border-gray-400 opacity-10"
        />
      </div>
      <div className="flex flex-row justify-between mt-20">
        <div className="flex-1">
          <h1 className="text-xl font-bold justify-self-center text-white">
            {game.name}
          </h1>
        </div>
      </div>
      <div className="flex flex-row p-4 border-b border-white/10">
        <div className="flex flex-row flex-1">
          <div className="flex-1">
            <p className="text-white/80">Released:</p>
            <p className="text-white">{game.released}</p>
          </div>
          <div className="flex-1">
            <p className="text-white/80">Metacritic:</p>
            <p className="text-white">{game.metacritic || "N/A"}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row p-4">
        <div className="flex flex-row flex-1">
          <div className="flex-1">
            <p className="text-white/80">Genres:</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {game.genres?.slice(0, 5).map((genre, index) => (
                <span
                  key={index}
                  className="bg-blue-500/30 text-white px-2 py-1 rounded text-xs"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <p className="text-white/80">Platforms:</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {game.platforms?.slice(0, 9).map((platform, index) => (
                <span
                  key={index}
                  className="bg-gray-600/50 text-white px-2 py-1 rounded text-xs"
                >
                  {platform.platform.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row p-4">
        <div className="flex flex-row flex-1 gap-2">
          <div className="flex-col">
            <p className="text-white/80">Developers:</p>
            <div className="flex flex-wrap gap-2 mt-1 mb-1">
              {game.developers?.slice(0, 1).map((dev, i) => (
                <span
                  key={i}
                  className="bg-blue-500/30 text-white px-2 py-1 rounded text-xs"
                >
                  {dev.name}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <p className="text-white/80">Publisher:</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {game.publishers?.slice(0, 1).map((pub, i) => (
                <span
                  key={i}
                  className="bg-blue-500/30 text-white px-2 py-1 rounded text-sx"
                >
                  {pub.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row p-4 border-b border-white/10">
        <div className="flex flex-row flex-1">
          <div className="flex-1">
            <p className="text-white bg-gray-600/70 w-fit p-1 rounded-xl">
              Rating: ⭐ {game.rating}
            </p>
          </div>
        </div>
      </div>
      <div className="relative flex flex-row p-4 justify-center">
        <div className="flex overflow-x-auto pb-2 gap-2">
          {gameScreenshots?.length > 0 &&
            gameScreenshots.map((screenshot, index) => (
              <img
                key={index}
                src={screenshot.image}
                alt={game.name}
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg mr-2 pointer-events-none"
                loading="lazy"
              />
            ))}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl w-fit text-white font-bold border-2 border-white p-2 rounded-xl ml-2 bg-gray-900">
          About
        </h2>
        <div className="relative h-40 md:max-h-60 overflow-y-auto border-gray-700 border-2 m-2 p-2">
          <p className="text-white">{game.description_raw}</p>
        </div>
      </div>
      <h2 className="flex justify-self-center text-2xl w-fit text-white font-bold border-2 border-white p-2 rounded-xl m-2 bg-gray-900">
        Where you can buy?
      </h2>
      <ul className="grid grid-cols-2 gap-2 list-none w-fit ml-2 justify-self-center mb-2">
        {game.stores?.map((store, id) => (
          <li
            key={`${store.store.slug}-${id}`}
            className="flex bg-gray-800 text-gray-300 font-bold p-2 rounded-xl"
          >
            {store.store.name}
          </li>
        ))}
      </ul>{" "}
    </div>
  );
};

export default GameDetails;
