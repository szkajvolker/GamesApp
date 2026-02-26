import { useState } from "react";
import { platforms, genres, platformIcons, genreIcons } from "../constants";
import { useEffect } from "react";

const SidebarFilters = ({ onFilterChange }) => {
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);
  const [showAllGenres, setShowAllGenres] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const visiblePlatforms = showAllPlatforms ? platforms : platforms.slice(0, 3);
  const visibleGenres = showAllGenres ? genres : genres.slice(0, 3);

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({ platform: selectedPlatform, genre: selectedGenre });
    }
  }, [selectedPlatform, selectedGenre, onFilterChange]);

  return (
    <div className="flex flex-col items-center justify-center mt-15">
      <h2 className="flex text-gray-700 dark:text-gray-200 text-2xl font-bold">
        BROWSE
      </h2>
      <aside className="flex flex-row md:flex-col mt-10">
        <section>
          <ul>
            <li>
              <strong className="text-gray-700 dark:text-white text-2xl">
                Platforms
              </strong>
            </li>
            {visiblePlatforms.map((platform, i) => (
              <li
                key={`platform-${i}`}
                className="flex flex-row items-center dark:text-white text-black p-2 gap-2 group cursor-pointer"
                onClick={() => {
                  setSelectedPlatform(platform.id);
                }}
              >
                <img
                  src={platformIcons.getPlatformIcon(platform.name)}
                  alt={`${platform.name} platform icon`}
                  className="w-10 h-10 items-center p-2 bg-gray-600/90 dark:bg-gray-600/50 group-hover:bg-gray-300 rounded-xl"
                  loading="lazy"
                />
                <p className="flex font-bold w-full">{platform.name}</p>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowAllPlatforms((prev) => !prev)}
            aria-label={
              showAllPlatforms ? "Hide platform list" : "Show all platforms"
            }
            className="flex dark:text-white text-black font-bold mt-2 border-2 rounded-xl p-2 justify-self-center dark:hover:text-white  hover:bg-gray-800 hover:text-white cursor-pointer"
          >
            {showAllPlatforms ? "Hide" : "Show all"}
          </button>
        </section>
        <section>
          <ul>
            <li>
              <strong className="text-gray-700 dark:text-white text-2xl">
                Genres
              </strong>
            </li>
            {visibleGenres.map((genre, i) => (
              <li
                key={`genre-${i}`}
                className="flex flex-row items-center dark:text-white text-black p-2 gap-4 group cursor-pointer"
                onClick={() => setSelectedGenre(genre.id)}
              >
                {" "}
                <img
                  src={genreIcons.getGenreIcon(genre.name)}
                  alt={`${genre.name} genre icon`}
                  className="w-10 h-10 items-center p-2 bg-gray-600/90 dark:bg-gray-600/50 group-hover:bg-gray-300 rounded-xl"
                  loading="lazy"
                />
                {genre.name}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowAllGenres((prev) => !prev)}
            aria-label={showAllGenres ? "Hide genre list" : "Show all genres"}
            className="flex dark:text-white text-black font-bold mt-2 border-2 rounded-xl p-2 justify-self-center dark:hover:text-white  hover:bg-gray-800 hover:text-white cursor-pointer"
          >
            {showAllGenres ? "Hide" : "Show all"}
          </button>
        </section>
      </aside>
    </div>
  );
};

export default SidebarFilters;
