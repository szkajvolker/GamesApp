import { useThemeStore } from "../constants/themeStore";

const ToggleDarkmode = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <div
      className="w-16 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full px-1 cursor-pointer transition-colors hover:scale-110 hover:brightness-110"
      onClick={toggleTheme}
      area-label="Toggle dark mode"
    >
      <div
        className={`w-6 h-6 flex items-center justify-center rounded-full shadow-md transition-transform duration-300 bg-white dark:bg-gray-900 text-lg ${
          theme === "dark" ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {theme === "dark" ? "🌙" : "🌞"}
      </div>
    </div>
  );
};

export default ToggleDarkmode;
