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
    <div className="relative">
      <div>
        <img
          src={searchIcon}
          alt="search"
          className="absolute right-3 lg:h-6 lg:w-6 mt-2 lg:mt-3"
        />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          className="bg-gray-600/30 dark:bg-white/10 backdrop-blur-md border border-white/20 lg:text-xl text-[12px] text-gray-700 dark:text-white px-4 py-2 rounded-lg w-[160px] lg:w-3xl  focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
