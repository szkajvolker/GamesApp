import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import { Toaster } from "sonner";
import { useThemeStore } from "./constants/themeStore";
import SnowFall from "./components/SnowFall";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import GameDetails from "./pages/GameDetails";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useThemeStore((state) => state.theme);

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

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
    <BrowserRouter>
      <ScrollToTop />
      {shouldRenderSnowFall(now) && <SnowFall />}
      <NavBar onSearch={setSearchTerm} setIsLoggedIn={setIsLoggedIn} />

      <Toaster position="top-right" theme="dark" richColors closeButton />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/home"
          element={
            <>
              <Hero />
              <Home searchTerm={searchTerm} />
            </>
          }
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/register"
          element={<SignUp setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/details/:id" element={<GameDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
