"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "vedam-theme";
const THEMES = ["light", "dark"];

const ThemeContext = createContext({
  theme: "light",
  mounted: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  // Adopt whatever the inline no-flash script already set on <html>.
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");
    setMounted(true);
  }, []);

  const applyTheme = useCallback((next) => {
    const value = THEMES.includes(next) ? next : "light";
    const root = document.documentElement;

    // Transient class lets only colorising properties animate (bg/border/text),
    // then is removed so framer/GSAP transforms and hover behaviours stay untouched.
    root.classList.add("theme-transition");
    root.setAttribute("data-theme", value);
    setTheme(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      /* storage unavailable — theme still applies for the session */
    }
    window.setTimeout(() => root.classList.remove("theme-transition"), 550);
  }, []);

  const toggleTheme = useCallback(() => {
    applyTheme(theme === "dark" ? "light" : "dark");
  }, [applyTheme, theme]);

  return (
    <ThemeContext.Provider value={{ theme, mounted, toggleTheme, setTheme: applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}