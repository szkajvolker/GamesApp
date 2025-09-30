import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: sessionStorage.getItem("theme") || "light",
  setTheme: (theme) => set({ theme }),
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "dark" ? "light" : "dark";
      sessionStorage.setItem("theme", newTheme);
      return { theme: newTheme };
    }),
}));
