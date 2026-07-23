"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import styles from "./ThemeSwitcher.module.scss";

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles["theme-switcher"]}>
      <button
        type="button"
        className={`${styles["theme-switcher__button"]} ${theme === "light" ? styles["theme-switcher__button--active"] : ""}`}
        onClick={toggleTheme}
        aria-label="Switch to light theme"
      >
        <Sun color="#f39c12" size={18} strokeWidth={1.5} />
      </button>
      <button
        type="button"
        className={`${styles["theme-switcher__button"]} ${theme === "dark" ? styles["theme-switcher__button--active"] : ""}`}
        onClick={toggleTheme}
        aria-label="Switch to dark theme"
      >
        <Moon color="#3498db" size={18} strokeWidth={1.5} />
      </button>
    </div>
  );
};
