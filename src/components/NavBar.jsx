import { useEffect, useState } from "react";
import { navLinks } from "../constants";
import SearchBar from "./SearchBar";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToggleDarkmode from "./ToggleDarkmode";

const NavBar = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window - innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed flex top-0 w-full border-b-2 border-gray-200 dark:border-gray-900 dark:bg-gray-800/30 bg-white/80 backdrop-blur-lg shadow-lg z-3 h-20 transition-colors duration-300 justify-between items-center lg:px-5">
      <h1 className="2xl:text-5xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-purple-500 to-blue-500 transition-colors duration-300">
        GameStore.
      </h1>
      <SearchBar onSearch={onSearch} />

      {!isMobile && (
        <div className="flex lg:space-x-2 space-x-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.name}`}
              className="hover:brightness-120 hover:scale-120 px-2 py-2 rounded-md font-bold lg:text-lg bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent transition-transform duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
      <ToggleDarkmode isMobile={isMobile} />
      {isMobile && (
        <button onClick={() => setIsMenuOpen(true)}>
          <FontAwesomeIcon icon={faBars} size="2x" className="text-gray-500" />
        </button>
      )}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 w-full h-screen bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center z-10">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="mb-8 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent transition-transform duration-300 text-5xl"
          >
            X
          </button>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.name}`}
              className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent transition-transform duration-300 text-3xl mb-4"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavBar;
