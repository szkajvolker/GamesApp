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
    <aside>
      <section>
        <ul>
          <li>
            <strong className="text-white text-2xl">Platforms</strong>
          </li>
          {visiblePlatforms.map((platform, i) => (
            <li
              key={`platform-${i}`}
              className="flex flex-row items-center text-white p-2 gap-4 group cursor-pointer"
              onClick={() => {
                setSelectedPlatform(platform.id);
              }}
            >
              <img
                src={platformIcons.getPlatformIcon(platform.name)}
                alt={platform.name}
                className="w-10 h-10 items-center p-2 bg-gray-600/50 group-hover:bg-gray-300 rounded-xl"
              />
              {platform.name}
            </li>
          ))}
        </ul>
        <button
          onClick={() => setShowAllPlatforms((prev) => !prev)}
          className="flex text-white font-bold mt-2 border-2 rounded-xl p-2 justify-self-center hover:bg-white hover:text-gray-900 hover:border-black"
        >
          {showAllPlatforms ? "Hide" : "Show all"}
        </button>
      </section>
      <section>
        <ul>
          <li>
            <strong className="text-white text-2xl">Genres</strong>
          </li>
          {visibleGenres.map((genre, i) => (
            <li
              key={`genre-${i}`}
              className="flex flex-row items-center text-white p-2 gap-4 group cursor-pointer"
              onClick={() => setSelectedGenre(genre.id)}
            >
              {" "}
              <img
                src={genreIcons.getGenreIcon(genre.name)}
                alt={genre.name}
                className="w-10 h-10 items-center p-2 bg-gray-600/50 group-hover:bg-gray-300 rounded-xl"
              />
              {genre.name}
            </li>
          ))}
        </ul>
        <button
          onClick={() => setShowAllGenres((prev) => !prev)}
          className="flex text-white font-bold mt-2 border-2 rounded-xl p-2 justify-self-center hover:bg-white hover:text-gray-900 hover:border-black"
        >
          {showAllGenres ? "Hide" : "Show all"}
        </button>
      </section>
    </aside>
  );
};

export default SidebarFilters;
