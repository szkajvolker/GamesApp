import { useThemeStore } from "../constants/themeStore";

const ToggleDarkmode = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return <button onClick={toggleTheme}>{theme === "dark" ? "🌞" : "🌙"}</button>;
};

export default ToggleDarkmode;
