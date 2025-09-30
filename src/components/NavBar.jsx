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
    <div className="fixed top-0 w-full dark:bg-gray-800/30 bg-gray-100/30 backdrop-blur-lg border-black/30 shadow-md z-3 p-5 h-20 transition-colors duration-300">
      <div className="flex flex-row justify-between">
        <div className="flex items-center lg:gap-8 gap-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-purple-400 to-blue-400">
            GameStore.
          </h1>
          <SearchBar onSearch={onSearch} />
        </div>

        {isMobile && (
          <button onClick={() => setIsMenuOpen(true)}>
            <FontAwesomeIcon icon={faBars} size="2x" className="text-gray-400" />
          </button>
        )}
        {!isMobile && (
          <div className="flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.name}`}
                className="hover:brightness-120 hover:scale-120 px-3 py-2 rounded-md font-bold text-lg bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent transition-transform duration-300"
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
        <ToggleDarkmode />
      </div>
    </div>
  );
};

export default NavBar;
