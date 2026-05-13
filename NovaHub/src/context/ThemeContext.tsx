import { createContext, useContext, useEffect, useState } from "react";

export type ThemeId = "blue" | "purple" | "green" | "red" | "orange" | "pink";

export const THEMES: Record<ThemeId, { label: string; color: string; primary: string; glow: string }> = {
  blue:   { label: "Ocean Blue",   color: "#3b82f6", primary: "221 83% 53%", glow: "59 130 246" },
  purple: { label: "Deep Purple",  color: "#8b5cf6", primary: "263 70% 58%", glow: "139 92 246" },
  green:  { label: "Emerald",      color: "#10b981", primary: "160 84% 39%", glow: "16 185 129" },
  red:    { label: "Crimson",      color: "#ef4444", primary: "0 84% 60%",   glow: "239 68 68"  },
  orange: { label: "Sunset",       color: "#f97316", primary: "24 95% 53%",  glow: "249 115 22" },
  pink:   { label: "Neon Pink",    color: "#ec4899", primary: "330 81% 60%", glow: "236 72 153" },
};

export const CLOAK_PRESETS = [
  { label: "Google Classroom",  title: "Home | Google Classroom",                favicon: "https://ssl.gstatic.com/classroom/favicon.png" },
  { label: "Google Drive",      title: "My Drive — Google Drive",                favicon: "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png" },
  { label: "Khan Academy",      title: "Khan Academy | Free Online Courses",     favicon: "https://www.khanacademy.org/favicon.ico" },
  { label: "Duolingo",          title: "Learn a language for free — Duolingo",   favicon: "https://d35aaqx5ub95lt.cloudfront.net/favicon.ico" },
  { label: "Wikipedia",         title: "Wikipedia, the free encyclopedia",       favicon: "https://en.wikipedia.org/favicon.ico" },
  { label: "Canvas LMS",        title: "Dashboard — Canvas",                     favicon: "https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico" },
  { label: "Schoology",         title: "Schoology | Learning Management System", favicon: "https://asset-cdn.schoology.com/sites/all/themes/schoology_theme/favicon.ico" },
];

interface ThemeCtx {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
  cloakTitle: string;
  cloakFavicon: string;
  setCloak: (title: string, favicon: string) => void;
  resetCloak: () => void;
}

const Ctx = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeRaw] = useState<ThemeId>(
    () => (localStorage.getItem("nc-theme") as ThemeId) || "blue"
  );
  const [cloakTitle, setCloakTitle] = useState(() => localStorage.getItem("nc-cloak-title") || "");
  const [cloakFavicon, setCloakFavicon] = useState(() => localStorage.getItem("nc-cloak-favicon") || "");

  useEffect(() => {
    const t = THEMES[theme];
    document.documentElement.style.setProperty("--primary", t.primary);
    document.documentElement.style.setProperty("--ring", t.primary);
    document.documentElement.style.setProperty("--theme-glow", t.glow);
    document.documentElement.style.setProperty("--theme-color", t.color);
    localStorage.setItem("nc-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (cloakTitle) document.title = cloakTitle;
    if (cloakFavicon) {
      let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = cloakFavicon;
    }
  }, [cloakTitle, cloakFavicon]);

  const setTheme = (t: ThemeId) => setThemeRaw(t);

  const setCloak = (title: string, favicon: string) => {
    setCloakTitle(title); setCloakFavicon(favicon);
    localStorage.setItem("nc-cloak-title", title);
    localStorage.setItem("nc-cloak-favicon", favicon);
    if (title) document.title = title;
    if (favicon) {
      let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
      if (!link) { link = document.createElement("link"); link.rel = "icon"; document.head.appendChild(link); }
      link.href = favicon;
    }
  };

  const resetCloak = () => {
    setCloakTitle(""); setCloakFavicon("");
    localStorage.removeItem("nc-cloak-title");
    localStorage.removeItem("nc-cloak-favicon");
    document.title = "NovaHub";
  };

  return <Ctx.Provider value={{ theme, setTheme, cloakTitle, cloakFavicon, setCloak, resetCloak }}>{children}</Ctx.Provider>;
}

export function useTheme() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTheme outside provider");
  return ctx;
}
