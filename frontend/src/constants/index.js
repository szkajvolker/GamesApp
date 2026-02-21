import {
  windowsIcon,
  xboxIcon,
  dreamcastIcon,
  playStationIcon,
  linuxIcon,
  iosIcon,
  macosIcon,
  nintendoIcon,
  androidIcon,
  psvitaIcon,
  actionIcon,
  sportsIcon,
  adventureIcon,
  strategyIcon,
  puzzleIcon,
  rpgIcon,
  racingIcon,
  shooterIcon,
  multiplayerIcon,
} from "../assets";

export const genreIcons = {
  getGenreIcon: (genreName) => {
    const genre = genreName.toLowerCase();
    if (genre.includes("action")) {
      return actionIcon;
    }
    if (genre.includes("sports")) {
      return sportsIcon;
    }
    if (genre.includes("adventure")) {
      return adventureIcon;
    }
    if (genre.includes("strategy")) {
      return strategyIcon;
    }
    if (genre.includes("puzzle")) {
      return puzzleIcon;
    }
    if (genre.includes("rpg")) {
      return rpgIcon;
    }
    if (genre.includes("racing")) {
      return racingIcon;
    }
    if (genre.includes("shooter")) {
      return shooterIcon;
    }
    if (genre.includes("multiplayer")) {
      return multiplayerIcon;
    }
    return null;
  },
};

export const GENRES = [
  { id: 4, name: "Action" },
  { id: 51, name: "Indie" },
  { id: 3, name: "Adventure" },
  { id: 5, name: "RPG" },
  { id: 10, name: "Strategy" },
  { id: 2, name: "Shooter" },
  { id: 40, name: "Casual" },
  { id: 14, name: "Simulation" },
  { id: 7, name: "Puzzle" },
  { id: 11, name: "Arcade" },
  { id: 83, name: "Platformer" },
  { id: 1, name: "Racing" },
  { id: 59, name: "Massively Multiplayer" },
  { id: 15, name: "Sports" },
  { id: 6, name: "Fighting" },
  { id: 19, name: "Family" },
  { id: 28, name: "Board Games" },
  { id: 34, name: "Educational" },
  { id: 17, name: "Card" },
];

export const TRIPLE_GENRES = [...GENRES, ...GENRES, ...GENRES];

export const MAIN_PLATFORMS = [
  "windows",
  "pc",
  "xbox",
  "playstation",
  "nintendo",
];

export const platformIcons = {
  getPlatformIcon: (platformName) => {
    const platform = platformName.toLowerCase();
    if (platform.includes("windows") || platform.includes("pc")) {
      return windowsIcon;
    }
    if (platform.includes("playstation")) {
      return playStationIcon;
    }
    if (platform.includes("xbox")) {
      return xboxIcon;
    }
    if (platform.includes("ps vita")) {
      return psvitaIcon;
    }
    if (platform.includes("dreamcast")) {
      return dreamcastIcon;
    }
    if (platform.includes("linux")) {
      return linuxIcon;
    }
    if (platform.includes("ios")) {
      return iosIcon;
    }
    if (platform.includes("macos")) {
      return macosIcon;
    }
    if (platform.includes("android")) {
      return androidIcon;
    }
    if (platform.includes("nintendo")) {
      return nintendoIcon;
    }
    if (platform.includes("macOS")) {
      return nintendoIcon;
    }
    return "N/A";
  },
};

export const platforms = [
  { id: 4, name: "PC", slug: "pc" },
  { id: 18, name: "PlayStation 4", slug: "playstation4" },
  { id: 1, name: "Xbox One", slug: "xbox-one" },
  { id: 7, name: "Nintendo Switch", slug: "nintendo-switch" },
  { id: 3, name: "iOS", slug: "ios" },
  { id: 21, name: "Android", slug: "android" },
];

export const genres = [
  { id: 4, name: "Action", slug: "action" },
  { id: 3, name: "Adventure", slug: "adventure" },
  { id: 5, name: "RPG", slug: "role-playing-games-rpg" },
  { id: 10, name: "Strategy", slug: "strategy" },
  { id: 2, name: "Shooter", slug: "shooter" },
  { id: 7, name: "Puzzle", slug: "puzzle" },
  { id: 1, name: "Racing", slug: "racing" },
  { id: 59, name: "Massively Multiplayer", slug: "massively-multiplayer" },
  { id: 15, name: "Sports", slug: "sports" },
];

export const navLinks = [{ name: "Home" }];

export const storeColors = [
  {
    storeName: "steam",
    borderColor: "border-cyan-400",
    bgColor: "bg-cyan-900/40",
  }, // Steam
  {
    storeName: "epic",
    borderColor: "border-violet-400",
    bgColor: "bg-violet-900/40",
  }, // Epic Games Store
  {
    storeName: "gog",
    borderColor: "border-purple-400",
    bgColor: "bg-purple-900/40",
  }, // GOG
  {
    storeName: "playstation",
    borderColor: "border-blue-400",
    bgColor: "bg-blue-900/40",
  }, // PlayStation Store
  {
    storeName: "xbox",
    borderColor: "border-green-400",
    bgColor: "bg-green-900/40",
  }, // Xbox Store
  {
    storeName: "nintendo",
    borderColor: "border-red-400",
    bgColor: "bg-red-900/40",
  }, // Nintendo Store
  {
    storeName: "itch",
    borderColor: "border-pink-400",
    bgColor: "bg-pink-900/40",
  }, // itch.io
  {
    storeName: "app store",
    borderColor: "border-indigo-400",
    bgColor: "bg-indigo-900/40",
  }, // Apple App Store
  {
    storeName: "google play",
    borderColor: "border-emerald-400",
    bgColor: "bg-emerald-900/40",
  }, // Google Play
];
