import { lazy, Suspense, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import { Toaster } from "sonner";
import { useThemeStore } from "./constants/themeStore";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Loading from "./UI/Loading";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const GameDetails = lazy(() => import("./pages/GameDetails"));

const SnowFall = lazy(() => import("./components/SnowFall"));

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
      <NavBar onSearch={setSearchTerm} setIsLoggedIn={setIsLoggedIn} />

      <Toaster position="top-right" theme="dark" richColors closeButton />
      <Suspense
        fallback={
          <div className="flex text-center mt-10 min-h-screen justify-center items-center w-full">
            <Loading />
          </div>
        }
      >
        {shouldRenderSnowFall(now) && <SnowFall />}
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
      </Suspense>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
