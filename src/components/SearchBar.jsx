import { useEffect, useState } from "react";
import { searchIcon } from "../assets";
import { useDebounce } from "use-debounce";

const SearchBar = ({ onSearch, placeholder = "Search any games..." }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className="relative transition-colors duration-300">
      <div>
        <div className="p-[2px] rounded-full transition-all duration-300 focus-within:bg-gradient-to-r focus-within:from-purple-500 focus-within:to-blue-500 focus-within:animate-pulse dark:focus-within:bg-gradient-to-r dark:focus-within:from-gray-700 dark:focus-within:to-gray-900 bg-transparent">
          <img
            src={searchIcon}
            alt="search"
            className="absolute right-3 top-1/2 h-5 w-5 transform -translate-y-1/2 z-3 pointer-events-none"
          />
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            className="bg-white dark:bg-gray-900 dark:border-gray-500 backdrop-blur-md border border-gray-300 lg:text-xl text-[11px] text-gray-900 placeholder-gray-500 dark:text-white px-4 py-2 rounded-full shadow-lg w-full max-w-md focus:outline-none border-none transition-colors duration-300 pr-10"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
