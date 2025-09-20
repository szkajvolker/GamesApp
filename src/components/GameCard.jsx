import { platformIcons } from "../constants";

const GameCard = ({ title, image, metacritic, genres, rating, platforms, onDetailsClick, id }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden hover:bg-white/20 transition-all max-w-xs">
      <div className="h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-xl hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>

        <div className="flex justify-between items-center mb-3">
          <span
            className={`text-xl font-bold bg-gray-800 pl-2 pr-2 rounded-xl ${
              metacritic > 75 ? "text-green-500 border border-green-500" : "text-yellow-500"
            } ${metacritic < 50 && "text-yellow-200"}`}
          >
            {metacritic}
          </span>
          {rating && (
            <span className="text-sm text-yellow-500 bg-gray-500 rounded-xl pr-2 pl-2 border border-yellow-500">
              ⭐{rating.toFixed(1)}
            </span>
          )}
        </div>
        {genres && (
          <div className="flex flex-wrap gap-1 mb-3">
            {genres.slice(0, 3).map((g, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-500/50 text-white border border-gray-500 text-xs rounded-full font-bold"
              >
                {g}
              </span>
            ))}
          </div>
        )}

        {platforms && (
          <div className="flex flex-wrap gap-2 mb-3">
            {platforms.slice(0, 3).map((platform, index) => {
              const icon = platformIcons.getPlatformIcon(platform);
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-600/50 border border-gray-500 text-white py-1 px-3 rounded-xl"
                >
                  {icon && <img src={icon} alt={platform} className="w-5 h-5" />}
                </div>
              );
            })}
          </div>
        )}
        <div className=" flex w-full justify-center">
          <button
            className="bg-gray-700 w-fit rounded-full cursor-pointer hover:bg-gray-300 p-2"
            onClick={() => onDetailsClick(id)}
          >
            🔎
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
