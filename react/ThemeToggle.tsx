"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

/**
 * Light/dark theme toggle for the HubSuite brand system.
 *
 * Reads/writes localStorage["theme"] and toggles document.documentElement[data-theme].
 * Respects any value already set by the inline boot script in the host app's layout.tsx
 * (which prevents flash-of-wrong-theme); otherwise falls back to prefers-color-scheme.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let initial: Theme = "dark";
    try {
      const attr = document.documentElement.getAttribute("data-theme");
      if (attr === "dark" || attr === "light") {
        initial = attr as Theme;
      } else {
        const stored = localStorage.getItem("theme");
        if (stored === "dark" || stored === "light") {
          initial = stored;
        } else if (
          typeof window !== "undefined" &&
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: light)").matches
        ) {
          initial = "light";
        }
      }
    } catch {
      /* localStorage unavailable — keep default */
    }
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
  }

  const base = "rounded-md p-2 text-muted transition-colors hover:bg-card hover:text-fg";
  const cls = className ? `${base} ${className}` : base;

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className={cls}
        type="button"
        suppressHydrationWarning
      >
        <Sun size={18} aria-hidden />
      </button>
    );
  }

  const isDark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cls}
      type="button"
    >
      {isDark ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
    </button>
  );
}
