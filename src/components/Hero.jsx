import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

const API_BASE_URL = "https://api.rawg.io/api";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const Hero = () => {
  const [featuredGames, setFeaturedGames] = useState([]);
  const scrollContainerRef = useRef(null);
  const animationRef = useRef(null);

  const fetchFeaturedGames = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/games?key=${API_KEY}&ordering=-rating&metacritic=90,100&page_size=12`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setFeaturedGames([...data.results, ...data.results, ...data.results]);
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
      animationRef.current = gsap.to(container, {
        x: -totalWidth,
        duration: 40,
        ease: "none",
        repeat: -1,
        paused: false,
      });
      const cards = container.querySelectorAll(".game-card");
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(animationRef.current, { timeScale: 0.2, duration: 0.5 });
          gsap.to(card, { scale: 1.1, duration: 0.3, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(animationRef.current, { timeScale: 1, duration: 0.5 });
          gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
      });
      return () => {
        if (animationRef.current) {
          animationRef.current.kill();
        }
      };
    }
  }, [featuredGames]);

  return (
    <div
      className="min-h-screen bg-gray-900 text-white py-20 overflow-hidden mt-15 w-full"
      id="hero"
    >
      <div className="text-center mb-16">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-thight">
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            GAMESTORE
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 font-light">
          Search for any game you like...
        </p>
      </div>
      <div className="relative overflow-hidden rounded-lg p-5">
        <div ref={scrollContainerRef} className="flex space-x-6">
          {featuredGames.map((game, i) => (
            <div
              key={`${game.id}-${i}`}
              className="game-card flex-shrink-0 w-64 h-36 bg-gray-800 rounded-lg overflow-hidden relative cursor-pointer"
            >
              <img src={game.background_image} alt={game.title} />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-gray-900 via-transparent  to-gray-900 z-10"></div>
      </div>
    </div>
  );
};

export default Hero;
