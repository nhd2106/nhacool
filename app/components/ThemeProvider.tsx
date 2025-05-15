"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      try {
        return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
      } catch (e) {
        console.error("Error reading localStorage:", e);
        return defaultTheme;
      }
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    let systemTheme: Theme = "light";
    if (typeof window !== "undefined" && window.matchMedia) {
      systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    const currentTheme = theme === "system" ? systemTheme : theme;
    root.classList.add(currentTheme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(storageKey, newTheme);
        } catch (e) {
          console.error("Error writing to localStorage:", e);
        }
      }
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
