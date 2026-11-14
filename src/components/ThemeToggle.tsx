"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

export type ThemePreference = "system" | "light" | "dark";

export function ThemeToggle({
  onResolvedThemeChange,
}: {
  onResolvedThemeChange?: (resolved: "light" | "dark") => void;
}) {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [systemDark, setSystemDark] = useState<boolean>(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDark(media.matches);

    const readStored = (): ThemePreference => {
      try {
        const stored = localStorage.getItem("color-scheme");
        if (stored === "light" || stored === "dark") return stored;
      } catch {
        // Ignore blocked storage access
      }
      return "system";
    };

    setPreference(readStored());

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setSystemDark(e.matches);
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "color-scheme") {
        const next = e.newValue === "light" || e.newValue === "dark" ? e.newValue : "system";
        setPreference(next);
        const meta = document.querySelector('meta[name="color-scheme"]');
        if (meta) {
          meta.setAttribute("content", next === "system" ? "light dark" : next);
        }
      }
    };

    media.addEventListener("change", handleMediaChange);
    window.addEventListener("storage", handleStorage);
    return () => {
      media.removeEventListener("change", handleMediaChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  useEffect(() => {
    const resolved: "light" | "dark" =
      preference === "system" ? (systemDark ? "dark" : "light") : preference;
    onResolvedThemeChange?.(resolved);
  }, [preference, systemDark, onResolvedThemeChange]);

  const applyPreference = (next: ThemePreference) => {
    setPreference(next);
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) {
      meta.setAttribute("content", next === "system" ? "light dark" : next);
    }
    try {
      if (next === "system") {
        localStorage.removeItem("color-scheme");
      } else {
        localStorage.setItem("color-scheme", next);
      }
    } catch {
      // Theme still applies to the page even if storage is unavailable
    }
  };

  return (
    <div
      role="group"
      aria-label="ERP Theme Mode"
      className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-white/15 text-[11px] font-bold shadow-inner"
    >
      <button
        type="button"
        onClick={() => applyPreference("system")}
        title={`System (${systemDark ? "Currently dark" : "Currently light"})`}
        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition ${
          preference === "system"
            ? "bg-amber-400 text-slate-950 shadow-sm"
            : "text-slate-300 hover:text-white hover:bg-white/5"
        }`}
      >
        <Monitor className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">System</span>
      </button>
      <button
        type="button"
        onClick={() => applyPreference("light")}
        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition ${
          preference === "light"
            ? "bg-amber-400 text-slate-950 shadow-sm"
            : "text-slate-300 hover:text-white hover:bg-white/5"
        }`}
      >
        <Sun className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Light</span>
      </button>
      <button
        type="button"
        onClick={() => applyPreference("dark")}
        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition ${
          preference === "dark"
            ? "bg-amber-400 text-slate-950 shadow-sm"
            : "text-slate-300 hover:text-white hover:bg-white/5"
        }`}
      >
        <Moon className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Dark</span>
      </button>
    </div>
  );
}
