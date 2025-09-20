import { windowsIcon, xboxIcon, playStationIcon, linuxIcon, appleIcon } from "../assets";

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
