const GameCard = ({
  title,
  image,
  price,
  genres,
  rating,
  releaseDate,
  platforms,
  onDetailsClick,
  id,
}) => {
  const handleDetailsClick = () => {
    onDetailsClick(id);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden hover:bg-white/20 transition-all max-w-xs">
      <div className="h-48 p-2">
        <img src={image} alt={title} className="w-full h-full object-cover rounded-xl" />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>

        <div className="flex justify-between items-center mb-3">
          <span className="text-xl font-bold text-green-600">{price}</span>
          {rating && (
            <span className="text-sm text-yellow-500 bg-gray-500 rounded-xl p-1">⭐{rating}</span>
          )}
        </div>
        {genres && (
          <div className="flex flex-wrap gap-1 mb-3">
            {genres.slice(0, 3).map((g, i) => (
              <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                {g}
              </span>
            ))}
          </div>
        )}
        {releaseDate && (
          <div className="flex flex-wrap gap-2 mb-3">
            <p className="w-fit bg-gray-600 text-white py-2 px-4 rounded-md ">{releaseDate}</p>
          </div>
        )}
        {platforms && (
          <div className="flex flex-wrap gap-2 mb-3">
            {platforms.slice(0, 3).map((platform, index) => (
              <p key={index} className="bg-gray-600 text-white py-1 px-3 rounded-md text-sm">
                {platform}
              </p>
            ))}
          </div>
        )}
        <button className="bg-gray-700 w-full rounded-full cursor-pointer hover:bg-gray-300">
          View Details
        </button>
      </div>
    </div>
  );
};

export default GameCard;
