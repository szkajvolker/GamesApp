const MoreDetailsModal = ({ game, gameScreenShots, onClose }) => {
  if (!game) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
      <div className="flex flex-col w-7xl h-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-y-auto m-4 relative">
        <div className="flex flex-row justify-between p-4">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">{game.name}</h1>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/30 text-white w-8 h-8 rounded-full hover:bg-red-500/50 cursor-pointer z-10"
          >
            ✕
          </button>
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
          <div className="flex flex-row flex-1">
            <div className="flex-1">
              <p className="text-white/80">Developers:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {game.developers?.slice(0, 1).map((dev, i) => (
                  <span
                    key={i}
                    className="bg-blue-500/30 text-white px-2 py-1 rounded text-sx"
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

        <div className="flex flex-row p-4 justify-center">
          <div className="flex overflow-x-auto pb-2 gap-2">
            {gameScreenShots?.length > 0 &&
              gameScreenShots.map((screenshot, index) => (
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
      </div>
    </div>
  );
};

export default MoreDetailsModal;
