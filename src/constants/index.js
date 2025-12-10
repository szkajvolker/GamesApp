export const PLATFORMS = [
  { id: 1, name: "PC", icon: windowsIcon },
  { id: 2, name: "PlayStation 4", icon: ps4Icon },
  { id: 3, name: "Xbox One", icon: xboxoneIcon },
  { id: 4, name: "Nintendo Switch", icon: nintendoIcon },
  { id: 5, name: "iOS", icon: iosIcon },
  { id: 6, name: "Android", icon: androidIcon },
  { id: 7, name: "macOS", icon: macosIcon },
  { id: 8, name: "Linux", icon: linuxIcon },
  { id: 9, name: "Xbox 360", icon: xbox360Icon },
  { id: 10, name: "PlayStation 3", icon: ps3Icon },
  { id: 11, name: "PlayStation 2", icon: ps2Icon },
  { id: 12, name: "PlayStation 5", icon: ps5Icon },
  { id: 13, name: "PS Vita", icon: psvitaIcon },
  { id: 14, name: "Wii", icon: wiiIcon },
  { id: 15, name: "Dreamcast", icon: dreamcastIcon },
  { id: 16, name: "Board Games" },
];
import {
  windowsIcon,
  xboxIcon,
  xbox360Icon,
  xboxoneIcon,
  dreamcastIcon,
  playStationIcon,
  linuxIcon,
  appleIcon,
  iosIcon,
  macosIcon,
  nintendoIcon,
  androidIcon,
  ps2Icon,
  ps3Icon,
  ps4Icon,
  ps5Icon,
  psvitaIcon,
  wiiIcon,
} from "../assets";

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
export const PLATFORMS = [
  { id: 1, name: "PC" },
  { id: 2, name: "PlayStation" },
  { id: 3, name: "Xbox" },
  { id: 4, name: "Nintendo" },
  { id: 5, name: "iOS" },
  { id: 6, name: "Android" },
  { id: 7, name: "macOS" },
  { id: 8, name: "Linux" },
  { id: 9, name: "Web" },
  { id: 10, name: "Atari" },
  { id: 11, name: "Commodore / Amiga" },
  { id: 12, name: "SEGA" },
  { id: 13, name: "3DO" },
  { id: 14, name: "Neo Geo" },
];

export const TRIPLE_GENRES = [...GENRES, ...GENRES, ...GENRES];

export const platformIcons = {
  getPlatformIcon: (platformName) => {
    const platform = platformName.toLowerCase();

    if (platform.includes("playstation 5")) {
      return playStationIcon;
    }
    if (platform.includes("playstation 4")) {
      return ps2Icon;
    }
    if (platform.includes("playstation 3")) {
      return ps3Icon;
    }
    if (platform.includes("PlayStation 2")) {
      return ps4Icon;
    }
    if (platform.includes("playstation")) {
      return ps5Icon;
    }
    if (platform.includes("ps vita")) {
      return psvitaIcon;
    }

    if (platform.includes("xbox 360")) {
      return xboxIcon;
    }
    if (platform.includes("xbox one")) {
      return xboxoneIcon;
    }
    if (platform.includes("xbox")) {
      return xbox360Icon;
    }
    if (platform.includes("dreamcast")) {
      return dreamcastIcon;
    }
    if (platform.includes("windows") || platform.includes("pc")) {
      return windowsIcon;
    }
    if (platform.includes("linux")) {
      return linuxIcon;
    }
    if (platform.includes("apple")) {
      return appleIcon;
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
    if (platform.includes("wii u")) {
      return nintendoIcon;
    }
    if (platform.includes("wii")) {
      return wiiIcon;
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

export const navLinks = [{ name: "Home" }, { name: "Games" }];
