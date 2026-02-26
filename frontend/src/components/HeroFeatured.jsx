import { useEffect, useRef, useState } from "react";
import { fetchFeaturedGames } from "../api/rawgAPI";
import gsap from "gsap/all";

const HeroFeatured = () => {
  const [featuredGames, setFeaturedGames] = useState([]);
  const scrollContainerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const fetchAndSetFeaturedGames = async () => {
      const games = await fetchFeaturedGames();

      setFeaturedGames([...games, ...games, ...games]);
    };
    fetchAndSetFeaturedGames();
  }, []);

  useEffect(() => {
    if (featuredGames.length > 0 && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 256 + 24;
      const totalWidth = cardWidth * (featuredGames.length / 3);

      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
      tl.to(container, { x: -totalWidth, duration: 60 });
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
  return (
    <div className="relative overflow-hidden rounded-lg p-4 z-10">
      <div ref={scrollContainerRef} className="flex space-x-6">
        {featuredGames.map((game, i) => (
          <div
            key={`${game.id}-${i}`}
            className="game-card shrink-0 w-32 h-16 md:w-xs md:h-48 bg-gray-800 rounded-lg overflow-hidden relative"
          >
            <img
              src={game.background_image}
              alt={game.title}
              loading="eager"
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 pointer-events-none bg-linear-to-r  dark:via-transparent   from-black via-transparent to-black transition-colors duration-300"></div>
    </div>
  );
};

export default HeroFeatured;
