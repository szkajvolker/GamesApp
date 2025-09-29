import { navLinks } from "../constants";
import SearchBar from "./SearchBar";

const NavBar = ({ onSearch }) => {
  return (
    <div className="fixed top-0 w-full bg-gray-800/30 backdrop-blur-lg border-black/30 shadow-md z-50 p-5 h-20">
      <div className="flex flex-row justify-between">
        <div className="flex items-center gap-10">
          <h1 className="text text-2xl font-bold text-gray-500">GameStore</h1>
          <SearchBar onSearch={onSearch} />
        </div>
        <div className="flex space-x-8">
          {navLinks.map((link) => (
            <a
              href={`#${link.name}`}
              className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
