import { useEffect, useState } from "react";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import { Toaster } from "sonner";
import { useThemeStore } from "./constants/themeStore";
import SnowFall from "./components/SnowFall";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useThemeStore((state) => state.theme);

  const now = new Date();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const shouldRenderSnowFall = (date) => {
    return (
      date.getMonth() === 11 && date.getDate() >= 1 && date.getDate() <= 31
    );
  };

  return (
    <>
      {shouldRenderSnowFall(now) && <SnowFall />}
      <NavBar onSearch={setSearchTerm} />
      <Hero />
      <Content searchTerm={searchTerm} />
      <Footer />
      <Toaster position="top-right" theme="dark" richColors closeButton />
    </>
  );
}

export default App;
