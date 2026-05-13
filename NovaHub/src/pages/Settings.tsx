import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useTheme, THEMES, CLOAK_PRESETS, type ThemeId } from "@/context/ThemeContext";
import { Settings2, Palette, ShieldCheck, RotateCcw, Check, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function Settings() {
  const { theme, setTheme, cloakTitle, cloakFavicon, setCloak, resetCloak } = useTheme();
  const [customTitle, setCustomTitle] = useState(cloakTitle);
  const [customFavicon, setCustomFavicon] = useState(cloakFavicon);
  const [saved, setSaved] = useState(false);
  const [activePreset, setActivePreset] = useState<number | null>(null);

  function handleSaveCloak() {
    setCloak(customTitle, customFavicon);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handlePreset(i: number) {
    const p = CLOAK_PRESETS[i];
    setCustomTitle(p.title);
    setCustomFavicon(p.favicon);
    setActivePreset(i);
    setCloak(p.title, p.favicon);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleReset() {
    resetCloak();
    setCustomTitle("");
    setCustomFavicon("");
    setActivePreset(null);
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#070710] text-white pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-4">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-12 h-12 rounded-2xl bg-[color:var(--theme-color)]/12 border border-[color:var(--theme-color)]/20 flex items-center justify-center">
              <Settings2 size={24} className="text-[color:var(--theme-color)]" />
            </div>
            <div>
              <h1 className="text-3xl font-black">Settings</h1>
              <p className="text-slate-500 text-sm">Customize your NovaHub experience</p>
            </div>
          </motion.div>

          {/* ── Theme Section ── */}
          <Section icon={<Palette size={16} />} title="Color Theme" delay={0.1}>
            <p className="text-slate-500 text-sm mb-5">
              Changes the accent color across the entire site.
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {(Object.entries(THEMES) as [ThemeId, typeof THEMES[ThemeId]][]).map(([id, t]) => (
                <button
                  key={id}
                  onClick={() => setTheme(id)}
                  className="group flex flex-col items-center gap-2"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl shadow-lg transition-all duration-200 ${
                      theme === id
                        ? "scale-110 ring-2 ring-white ring-offset-2 ring-offset-[#070710]"
                        : "group-hover:scale-105"
                    }`}
                    style={{ background: t.color }}
                  >
                    {theme === id && (
                      <div className="w-full h-full flex items-center justify-center">
                        <Check size={20} className="text-white" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <span className={`text-[11px] font-semibold ${theme === id ? "text-white" : "text-slate-500"}`}>
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </Section>

          {/* ── Tab Cloaking ── */}
          <Section icon={<ShieldCheck size={16} />} title="Tab Cloaking" delay={0.2}>
            <p className="text-slate-500 text-sm mb-5">
              Change the browser tab title and icon to disguise this site as something else.
            </p>

            {/* Presets */}
            <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">Quick Presets</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
              {CLOAK_PRESETS.map((preset, i) => (
                <button
                  key={i}
                  onClick={() => handlePreset(i)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all ${
                    activePreset === i
                      ? "bg-[color:var(--theme-color)]/12 border-[color:var(--theme-color)]/40 text-white"
                      : "bg-white/4 border-white/6 text-slate-400 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  <img
                    src={preset.favicon}
                    alt=""
                    className="w-5 h-5 rounded flex-shrink-0"
                    onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  <span className="text-xs font-semibold truncate">{preset.label}</span>
                </button>
              ))}
            </div>

            {/* Custom */}
            <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">Custom</p>
            <div className="space-y-3 mb-5">
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">Tab Title</label>
                <input
                  value={customTitle}
                  onChange={e => setCustomTitle(e.target.value)}
                  placeholder="e.g. Google Classroom"
                  className="w-full bg-black/40 border border-white/8 rounded-xl px-4 py-2.5 text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[color:var(--theme-color)]/30"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">Favicon URL</label>
                <input
                  value={customFavicon}
                  onChange={e => setCustomFavicon(e.target.value)}
                  placeholder="https://example.com/favicon.ico"
                  className="w-full bg-black/40 border border-white/8 rounded-xl px-4 py-2.5 text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[color:var(--theme-color)]/30"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSaveCloak}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  saved
                    ? "bg-green-500 text-white"
                    : "bg-[color:var(--theme-color)] hover:opacity-90 text-white"
                }`}
              >
                {saved ? <><Check size={14} /> Saved!</> : "Apply Cloak"}
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
              >
                <RotateCcw size={13} /> Reset
              </button>
            </div>

            {/* Status */}
            {cloakTitle && (
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 bg-white/4 rounded-lg px-3 py-2">
                <ShieldCheck size={13} className="text-green-400" />
                <span>Active: <span className="text-slate-300 font-semibold">{cloakTitle}</span></span>
                <a
                  href={cloakFavicon}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto hover:text-white"
                  onClick={e => e.stopPropagation()}
                >
                  <ExternalLink size={11} />
                </a>
              </div>
            )}
          </Section>

        </div>
      </div>
    </Layout>
  );
}

function Section({ icon, title, delay, children }: {
  icon: React.ReactNode; title: string; delay: number; children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white/3 border border-white/8 rounded-2xl p-6 mb-5"
    >
      <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-white/6">
        <div className="text-[color:var(--theme-color)]">{icon}</div>
        <h2 className="font-bold text-white">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}
