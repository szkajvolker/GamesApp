import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const API_BASE_URL = "https://api.rawg.io/api";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const Hero = () => {
  const [featuredGames, setFeaturedGames] = useState([]);
  const scrollContainerRef = useRef(null);
  const animationRef = useRef(null);

  const fetchFeaturedGames = async () => {
    const cacheKey = "featuredGames";
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const cachedGames = JSON.parse(cached);
      setFeaturedGames([...cachedGames, ...cachedGames, ...cachedGames]);
      return;
    }
    try {
      const res = await fetch(
        `${API_BASE_URL}/games?key=${API_KEY}&ordering=-rating&metacritic=90,100&page_size=12`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setFeaturedGames([...data.results, ...data.results, ...data.results]);
      localStorage.setItem(cacheKey, JSON.stringify(data.results));
    } catch (error) {
      console.error("Failed to fetch featured games", error);
    }
  };

  useEffect(() => {
    fetchFeaturedGames();
  }, []);
  useEffect(() => {
    if (featuredGames.length > 0 && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 256 + 24;
      const totalWidth = cardWidth * (featuredGames.length / 3);

      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
      tl.to(container, { x: -totalWidth, duration: 40 });
      animationRef.current = tl;

      const cards = container.querySelectorAll(".game-card");
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          tl.timeScale(0.2);
          gsap.to(card, { scale: 1.1, duration: 0.3, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          tl.timeScale(1);
          gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
      });
      return () => {
        tl.kill();
      };
    }
  }, [featuredGames]);

  useEffect(() => {
    const words = document.querySelectorAll(".hero-anim-word");
    if (words.length) {
      const tl = gsap.timeline();
      words.forEach((el, i) => {
        tl.fromTo(
          el,
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: i === 0 ? 0.4 : 0.6, ease: "power2.inOut" },
          i === 0 ? 0 : i * 0.8
        );
      });
      return () => tl.kill();
    }
  }, []);
  return (
    <div
      className="flex flex-col justify-between min-h-screen dark:bg-gray-900  bg-white  text-white py-20 overflow-hidden w-full transition-colors duration-300"
      id="Home"
    >
      <div className="text-center mt-20">
        <h1 className="text-6xl md:text-7xl font-bold tracking-wide">
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            GAMESTORE
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 font-light">
          Search for any game you like...
        </p>
      </div>
      <div className="relative overflow-hidden rounded-lg p-2">
        <div ref={scrollContainerRef} className="flex space-x-6">
          {featuredGames.map((game, i) => (
            <div
              key={`${game.id}-${i}`}
              className="game-card flex-shrink-0 w-64 h-36 bg-gray-800 rounded-lg overflow-hidden relative "
            >
              <img src={game.background_image} alt={game.title} />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r dark:from-gray-900 dark:via-transparent  dark:to-gray-900 from-gray-500 via-transparent to-gray-500 z-10"></div>
      </div>
      <div className="flex flex-col items-center justify-center mb-10">
        <h1 className="text-5xl md:text-6xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          <span className="hero-anim-word">All Games.</span>
          <span className="hero-anim-word ml-4">All Platforms.</span>
          <span className="hero-anim-word ml-4"> One Place.</span>
        </h1>
        <FontAwesomeIcon className="mt-5 text-7xl animate-pulse text-gray-600" icon={faArrowDown} />
      </div>
    </div>
  );
};

export default Hero;
