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
    <div className="flex flex-col mt-15 mb-15">
      <h2 className="flex text-gray-dark dark:text-white text-2xl font-bold">
        BROWSE
      </h2>
      <aside className="flex flex-row md:flex-col mt-5">
        <section>
          <ul>
            <li>
              <strong className="text-gray-dark dark:text-white text-2xl">
                Platforms
              </strong>
            </li>
            {visiblePlatforms.map((platform, i) => (
              <li
                key={`platform-${i}`}
                className="flex flex-row items-center dark:text-white text-gray-dark p-2 gap-2 group cursor-pointer"
                onClick={() => {
                  setSelectedPlatform(platform.id);
                }}
              >
                <img
                  src={platformIcons.getPlatformIcon(platform.name)}
                  alt={`${platform.name} platform icon`}
                  className="w-10 h-10 p-2 bg-gray-800 dark:bg-gray-darker dark:group-hover:bg-white group-hover:bg-gray-dark rounded-md"
                  loading="lazy"
                />
                <p className="flex group-hover:bg-white group-hover:shadow-md group-hover:shadow-gray-soft p-2 justify-center rounded-xl group-hover:text-gray-darker font-bold">
                  {platform.name}
                </p>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowAllPlatforms((prev) => !prev)}
            aria-label={
              showAllPlatforms ? "Hide platform list" : "Show all platforms"
            }
            className="flex dark:text-white text-gray-dark bg-white dark:bg-gray-dark shadow-xl font-bold mt-2 rounded-xl p-2 dark:hover:text-gray-darker dark:hover:bg-gray-soft  hover:bg-gray-dark hover:text-white cursor-pointer"
          >
            {showAllPlatforms ? "Hide" : "Show all"}
          </button>
        </section>
        <section>
          <ul>
            <li>
              <strong className="text-gray-dark dark:text-white text-2xl">
                Genres
              </strong>
            </li>
            {visibleGenres.map((genre, i) => (
              <li
                key={`genre-${i}`}
                className="flex flex-row items-center dark:text-white text-gray-darkfont-bold p-2 gap-2 group cursor-pointer"
                onClick={() => setSelectedGenre(genre.id)}
              >
                {" "}
                <img
                  src={genreIcons.getGenreIcon(genre.name)}
                  alt={`${genre.name} genre icon`}
                  className="w-10 h-10 p-2 bg-gray-800 dark:bg-gray-darker dark:group-hover:bg-white group-hover:bg-gray-dark rounded-md"
                  loading="lazy"
                />
                <p className="flex group-hover:bg-white group-hover:shadow-md group-hover:shadow-gray-soft p-2 justify-center rounded-xl group-hover:text-gray-darker font-bold">
                  {genre.name}
                </p>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowAllGenres((prev) => !prev)}
            aria-label={showAllGenres ? "Hide genre list" : "Show all genres"}
            className="flex dark:text-white text-gray-dark bg-white dark:bg-gray-dark shadow-xl font-bold mt-2 rounded-xl p-2 dark:hover:text-gray-darker dark:hover:bg-gray-soft  hover:bg-gray-dark hover:text-white cursor-pointer"
          >
            {showAllGenres ? "Hide" : "Show all"}
          </button>
        </section>
      </aside>
    </div>
  );
};

export default SidebarFilters;
