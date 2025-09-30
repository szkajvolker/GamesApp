import { useEffect, useState } from "react";
import { navLinks } from "../constants";
import SearchBar from "./SearchBar";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToggleDarkmode from "./ToggleDarkmode";

const NavBar = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window - innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed top-0 w-full border-b-2 border-gray-200 dark:border-gray-900 dark:bg-gray-800/30 bg-white/80 backdrop-blur-lg  shadow-lg z-3 h-20 transition-colors duration-300">
      <div className="flex flex-row pt-2 m-2 justify-between">
        <div className="flex items-center justify-center lg:gap-8 gap-2">
          <h1 className="text-md lg:text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-purple-500 to-blue-500 transition-colors duration-300">
            GameStore.
          </h1>
          <SearchBar onSearch={onSearch} />
        </div>
        {isMobile && (
          <button onClick={() => setIsMenuOpen(true)}>
            <FontAwesomeIcon icon={faBars} size="2x" className="text-gray-500" />
          </button>
        )}
        {!isMobile && (
          <div className="flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.name}`}
                className="hover:brightness-120 hover:scale-120 px-3 py-2 rounded-md font-bold text-lg bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent transition-transform duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
        {isMobile && isMenuOpen && (
          <div className="fixed inset-0 w-full h-screen  bg-black/70 bg-opacity-50 backdrop-blur-lg flex flex-col items-center justify-center z-50">
            <button onClick={() => setIsMenuOpen(false)} className="mb-8 text-white text-3xl">
              X
            </button>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.name}`}
                className="text-white text-2xl mb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
        <ToggleDarkmode isMobile={isMobile} />
      </div>
    </div>
  );
};

export default NavBar;
