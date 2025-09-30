import { useEffect, useState } from "react";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import { Toaster } from "sonner";
import { useThemeStore } from "./constants/themeStore";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <>
      <NavBar onSearch={setSearchTerm} />
      <Hero />
      <Content searchTerm={searchTerm} />
      <Footer />
      <Toaster position="top-right" theme="dark" richColors closeButton />
    </>
  );
}

export default App;
