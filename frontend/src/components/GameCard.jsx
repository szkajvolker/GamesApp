import { motion as Motion, AnimatePresence } from "framer-motion";
import { MAIN_PLATFORMS, platformIcons, storeColors } from "../constants";
import placeholder from "../assets/images/placeholder.png";
import { useState, useRef } from "react";

const GameCard = ({
  title,
  image,
  metacritic,
  genres,
  rating,
  platforms,
  onDetailsClick,
  id,
  releaseDate,
  stores,
  esrbRating,
  onHover,
  isOpen,
  shortScreenshots = [],
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const visibleScreenshots = shortScreenshots.slice(0, shortScreenshots.length);
  const hasScreenshots = visibleScreenshots.length > 0;
  const isGalleryActive = isOpen && hasScreenshots;

  const mainImage = isGalleryActive
    ? visibleScreenshots[activeIndex] || image || placeholder
    : image || placeholder;

  const handleMouseMove = (e) => {
    if (!isGalleryActive || visibleScreenshots.length <= 1) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const ratio = Math.min(Math.max(x / rect.width, 0), 1);
    const index = Math.min(
      visibleScreenshots.length - 1,
      Math.floor(ratio * visibleScreenshots.length),
    );

    setActiveIndex(index);
  };

  const ratingStars = (rating) => {
    const normalizedRating = Math.max(0, Math.min(5, Math.round(rating)));
    const stars = normalizedRating;
    return Array.from({ length: stars }, () => "⭐");
  };

  const sortedPlatforms = MAIN_PLATFORMS.map((sortedplatform) =>
    (platforms || []).find((p) => p.toLowerCase().includes(sortedplatform)),
  ).filter(Boolean);

  return (
    <Motion.div
      className={`relative bg-gray-950/90 backdrop-blur-lg rounded-t-full  ${isOpen ? "z-50 rounded-b-none " : "z-10"}`}
      onHoverStart={() => {
        if (typeof onHover === "function") onHover(id);
      }}
      onHoverEnd={() => {
        if (typeof onHover === "function") onHover(null);
      }}
      whileHover={{}}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Motion.div
        ref={containerRef}
        className="h-48 relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setActiveIndex(activeIndex)}
        initial={{
          borderTopLeftRadius: "999px",
          borderTopRightRadius: "999px",
        }}
        whileHover={{
          borderTopLeftRadius: "64px",
          borderTopRightRadius: "64px",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <img
          src={mainImage}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {isGalleryActive && visibleScreenshots.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex h-3 items-center gap-1 px-4">
            {visibleScreenshots.map((shot, index) => (
              <button
                key={`${shot}-${index}`}
                type="button"
                className="flex-1 h-full cursor-default"
              >
                <span
                  className={`block h-1.5 w-full rounded-full transition-colors duration-200 ${index === activeIndex ? "bg-white" : "bg-white/40"}`}
                ></span>
              </button>
            ))}
          </div>
        )}
      </Motion.div>

      <div className="p-5">
        <button onClick={() => onDetailsClick(id)} className="cursor-pointer">
          <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-2 hover:brightness-50 hover:underline">
            {title}
          </h3>
        </button>

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
                {rating >= 0 ? rating.toFixed(1) : "N/A"}
              </span>
            </span>
          )}
        </div>

        {platforms && (
          <div className="flex flex-wrap gap-2 mb-3">
            {sortedPlatforms.slice(0, 4).map((platform, index) => {
              const icon = platformIcons.getPlatformIcon(platform);
              return (
                <div
                  key={index}
                  className="flex items-center gap-2  py-2 px-2 rounded-xl"
                >
                  {icon && (
                    <img
                      src={icon ? icon : placeholder}
                      loading="lazy"
                      alt={platform}
                      className="w-4 h-4"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="flex w-full justify-center">
          <Motion.button
            className="bg-gray-700 w-fit rounded-full cursor-pointer hover:bg-gray-900 hover:scale-125 transition-all duration-300 p-2"
            onClick={() => onDetailsClick(id)}
            aria-label="show-details"
            whileHover={{ scale: 1.2, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            🔎
          </Motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <Motion.div
            className="absolute left-0 right-0 top-full bg-gray-950 rounded-b-2xl text-white  shadow-xl z-30 p-4 transition-all duration-200"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-2 text-sm">
              {genres && (
                <div className="flex flex-wrap gap-1 mb-3 justify-between items-center">
                  <p className="text-gray-700">
                    <strong>Genres:</strong>
                  </p>
                  <div className="flex gap-2">
                    {genres.slice(0, 3).map((g, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 dark:bg-gray-500/50 bg-gray-900 text-white border-2 border-gray-300 text-xs rounded-full font-bold"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <p className="flex text-gray-700 w-full justify-between">
                <strong>Release Date:</strong>{" "}
                <span className="text-white">{releaseDate || "TBA"}</span>
              </p>

              <p className="flex text-gray-700 w-full justify-between">
                <strong>Rating:</strong>{" "}
                <span className="text-white">{esrbRating || "N/A"}</span>
              </p>
              {stores && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {stores.slice(0, 3).map((storeName, i) => {
                    const store = storeColors.find((s) =>
                      storeName.toLowerCase().includes(s.storeName),
                    );

                    const borderColor = store?.borderColor ?? "border-white";
                    const bgColor = store?.bgColor ?? "bg-gray-800";

                    return (
                      <span
                        key={i}
                        className={`px-2 py-1 text-white text-xs rounded-full font-bold border-2 ${borderColor} ${bgColor}`}
                      >
                        {storeName}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.div>
  );
};

export default GameCard;
