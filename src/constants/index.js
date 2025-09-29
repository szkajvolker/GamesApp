import { windowsIcon, xboxIcon, playStationIcon, linuxIcon, appleIcon } from "../assets";

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

export const platformIcons = {
  getPlatformIcon: (platformName) => {
    const platform = platformName.toLowerCase();

    if (platform.includes("playstation")) {
      return playStationIcon;
    }
    if (platform.includes("xbox")) {
      return xboxIcon;
    }
    if (platform.includes("windows") || platform.includes("pc")) {
      return windowsIcon;
    }
    if (platform.includes("linux")) {
      return linuxIcon;
    }
    if (platform.includes("apple") || platform.includes("macos")) {
      return appleIcon;
    }
    return "N/A";
  },
};

export const navLinks = [
  { name: "Home" },
  { name: "Categories" },
  { name: "About" },
  { name: "Games" },
];
