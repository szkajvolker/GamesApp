import { useThemeStore } from "../constants/themeStore";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ToggleDarkmode = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <div
      className="w-15 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full px-1 cursor-pointer transition-colors hover:scale-110 hover:brightness-110"
      onClick={toggleTheme}
      area-label="Toggle dark mode"
      onMouseDown={(e) => e.preventDefault()}
    >
      <div
        className={`w-6 h-6 flex items-center justify-center rounded-full shadow-md transition-transform duration-300 bg-white dark:bg-gray-900 text-lg ${
          theme === "dark" ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <FontAwesomeIcon
          icon={theme === "dark" ? faMoon : faSun}
          className="text-yellow-500"
        />
      </div>
    </div>
  );
};

export default ToggleDarkmode;
