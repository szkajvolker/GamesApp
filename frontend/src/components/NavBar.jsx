import { useEffect, useState } from "react";
import { navLinks } from "../constants";
import SearchBar from "./SearchBar";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToggleDarkmode from "./ToggleDarkmode";
import { useNavigate } from "react-router-dom";

const NavBar = ({ onSearch, setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleNavigate = (path) => {
    navigate(path.toLowerCase());
  };

  return (
    <div className="fixed flex top-0 w-full border-b-2 border-gray-200 dark:border-gray-900 dark:bg-gray-800/30 bg-white/80 backdrop-blur-lg shadow-lg h-20 transition-colors duration-300 justify-between items-center lg:px-5 px-2 z-30">
      <h1 className="2xl:text-5xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl font-bold bg-linear-to-r bg-clip-text text-transparent from-purple-500 to-blue-500 transition-colors duration-300">
        GameStore.
      </h1>
      <SearchBar onSearch={onSearch} />

      {!isMobile && (
        <div className="flex lg:space-x-2 space-x-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              onClick={() => handleNavigate(`/${link.name}`)}
              href=""
              className="hover:brightness-120 hover:scale-120 px-2 py-2 rounded-md font-bold lg:text-lg bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent transition-transform duration-300 cursor-pointer"
            >
              {link.name}
            </a>
          ))}
          <a
            onClick={() => navigate("/home")}
            href="#games"
            className="hover:brightness-120 hover:scale-120 px-2 py-2 rounded-md font-bold lg:text-lg bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent transition-transform duration-300 cursor-pointer"
          >
            Games
          </a>
        </div>
      )}
      <div className="flex flex-row items-center gap-3">
        {!isMobile && (
          <div className="flex flex-col">
            <button
              className="text-blue-500 font-bold cursor-pointer hover:scale-120 transition-transform duration-300"
              onClick={isLoggedIn ? handleLogout : () => navigate("/login")}
            >
              {`${isLoggedIn ? "Logout" : "Login"}`}
            </button>{" "}
            {!isLoggedIn && (
              <button
                className="text-purple-500 font-bold cursor-pointer hover:scale-120 transition-transform duration-300"
                onClick={() => navigate("/register")}
              >
                Sign up
              </button>
            )}
          </div>
        )}

        <ToggleDarkmode isMobile={isMobile} />
      </div>
      {isMobile && (
        <button
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open navigation menu"
        >
          <FontAwesomeIcon icon={faBars} size="2x" className="text-gray-500" />
        </button>
      )}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 w-full h-screen bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center z-10">
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close navigation menu"
            className="mb-8 bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent transition-transform duration-300 text-5xl"
          >
            X
          </button>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.name}`}
              className="bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent transition-transform duration-300 text-3xl mb-4"
              onClick={() => {
                navigate("/home");
                setIsMenuOpen(false);
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#games"
            className="hover:brightness-120 hover:scale-120 px-2 py-2 rounded-md font-bold lg:text-lg bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent transition-transform duration-300 cursor-pointer"
            onClick={() => {
              navigate("/home");
              setIsMenuOpen(false);
            }}
          >
            Games
          </a>
          <div className="flex flex-col">
            <button
              className="text-blue-500 font-bold cursor-pointer hover:scale-120 transition-transform duration-300"
              onClick={() => {
                if (isLoggedIn) {
                  handleLogout();
                } else {
                  navigate("/login");
                }
                setIsMenuOpen(false);
              }}
            >
              {`${isLoggedIn ? "Logout" : "Login"}`}
            </button>{" "}
            {!isLoggedIn && (
              <button
                className="text-purple-500 font-bold cursor-pointer hover:scale-120 transition-transform duration-300"
                onClick={() => {
                  navigate("/register");
                  setIsMenuOpen(false);
                }}
              >
                Sign up
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
