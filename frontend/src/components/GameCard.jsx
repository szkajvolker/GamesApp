import { platformIcons } from "../constants";
import placeholder from "../assets/images/placeholder.png";

const GameCard = ({
  title,
  image,
  metacritic,
  genres,
  rating,
  platforms,
  onDetailsClick,
  id,
}) => {
  const ratingStars = (rating) => {
    const stars = Math.round(rating);
    return Array.from({ length: stars }, () => "⭐");
  };
  return (
    <div className="bg-gray-white/40 backdrop-blur-lg lg:rounded-t-[330px] hover:rounded-t-[30px] rounded-[20px] dark:shadow-xl shadow-xl shadow-black/60 hover:shadow-2xl overflow-hidden hover:bg-gray-200 dark:hover:bg-gray-800 duration-600 transition-all ease-in-out z-20">
      <div className="h-48">
        <img
          src={image ? image : placeholder}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover rounded-t-xl hover:scale-110 transition-all duration-300"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-2">
          {title}
        </h3>

        <div className="flex justify-between items-center mb-3">
          <span
            className={`text-xl font-bold bg-gray-900 pl-3 pr-3 rounded-xl ${
              metacritic > 75
                ? "text-green-500 border-2 border-green-500"
                : "text-yellow-500 border-2 border-yellow-500"
            } ${metacritic < 50 && "text-yellow-200"}`}
          >
            {metacritic}
          </span>
          {rating !== null && rating !== undefined && (
            <span className="text-sm text-yellow-500 bg-gray-500 rounded-xl px-2 border-2 border-yellow-500 flex items-center">
              {ratingStars(rating).map((star, i) => (
                <span key={i}>{star}</span>
              ))}
              <span className="ml-1 text-xs text-gray-900 dark:text-white">
                {rating > 0 ? rating.toFixed(1) : "N/A"}
              </span>
            </span>
          )}
        </div>
        {genres && (
          <div className="flex flex-wrap gap-1 mb-3">
            {genres.slice(0, 3).map((g, i) => (
              <span
                key={i}
                className="px-2 py-1 dark:bg-gray-500/50 bg-gray-900 text-white border-2 border-gray-300 text-xs rounded-full font-bold"
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
                  className="flex items-center gap-2 bg-gray-600/50 text-white py-2 px-2 rounded-xl"
                >
                  {icon && (
                    <img
                      src={icon ? icon : placeholder}
                      loading="lazy"
                      alt={platform}
                      className="w-7 h-7"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
        <div className=" flex w-full justify-center">
          <button
            className="bg-gray-700 w-fit rounded-full cursor-pointer hover:bg-gray-900 hover:scale-125 transition-all duration-300 p-2"
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
