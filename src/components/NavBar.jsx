import SearchBar from "./SearchBar";

const NavBar = ({ onSearch }) => {
  return (
    <div className="fixed top-0 w-full bg-gray-800/30 backdrop-blur-lg border-black/30  shadow-md z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-5">
          <h1 className="text text-2xl font-bold text-gray-500">GameStore</h1>
          <SearchBar onSearch={onSearch} />

          <div className="flex space-x-8">
            <a
              href="#content"
              className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Games
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              About
            </a>
            <a
              href="#hero"
              className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
