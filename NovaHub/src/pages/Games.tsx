import { useState, useEffect } from "react";
import { useSearch } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { games } from "@/data/games";
import { Search, Play, X, Maximize2, Gamepad2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Games() {
  const qs             = useSearch();
  const [search, setSearch]           = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [playingGame, setPlayingGame] = useState<string | null>(null);

  // Support ?play=id deep-link from Home page
  useEffect(() => {
    const params = new URLSearchParams(qs);
    const id = params.get("play");
    if (id && games.find(g => g.id === id)) setPlayingGame(id);
  }, [qs]);

  const categories = ["All", ...Array.from(new Set(games.map(g => g.category))).sort()];

  const filtered = games.filter(g => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase());
    const matchCat    = activeCategory === "All" || g.category === activeCategory;
    return matchSearch && matchCat;
  });

  const activeGame = playingGame ? games.find(g => g.id === playingGame) : null;

  return (
    <Layout>
      <div className="min-h-screen bg-[#070710] text-white pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
            <div>
              <h1 className="text-4xl font-black tracking-tight mb-1.5">Games Library</h1>
              <p className="text-slate-500">Instant access to {games.length}+ unblocked games.</p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search games…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white/4 border border-white/8 rounded-xl py-2.5 pl-9 pr-4 text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[color:var(--theme-color)]/30"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-7" style={{ scrollbarWidth: "none" }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap flex-shrink-0 transition-all ${
                  activeCategory === cat
                    ? "bg-[color:var(--theme-color)] text-white shadow-lg shadow-[rgba(var(--theme-glow),0.2)]"
                    : "bg-white/4 text-slate-400 border border-white/6 hover:bg-white/8 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filtered.map((game, i) => (
                <motion.div
                  key={game.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.18, delay: Math.min(i * 0.04, 0.4) }}
                  className="group cursor-pointer"
                  onClick={() => setPlayingGame(game.id)}
                >
                  {/* Card */}
                  <div
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-2.5 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${game.color}dd 0%, ${game.color}55 100%)`,
                      boxShadow: `0 0 0 1px ${game.color}33`,
                    }}
                  >
                    {/* Inner texture overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-white/5" />

                    {/* Animated bg blob */}
                    <div
                      className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full opacity-30 blur-xl transition-transform duration-500 group-hover:scale-150"
                      style={{ background: game.color }}
                    />

                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30 backdrop-blur-[2px] z-10">
                      <div className="w-13 h-13 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play fill="currentColor" className="w-5 h-5 ml-0.5 text-[#070710]" />
                      </div>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-2.5 left-2.5 z-0">
                      <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/40 text-white/80 backdrop-blur-sm">
                        {game.category}
                      </span>
                    </div>

                    {/* Hover glow ring */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ boxShadow: `inset 0 0 0 1.5px ${game.color}88` }}
                    />
                  </div>

                  <h3 className="font-bold text-slate-200 group-hover:text-[color:var(--theme-color)] transition-colors text-sm truncate px-0.5">
                    {game.name}
                  </h3>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-slate-600">
              <Gamepad2 size={40} />
              <p className="font-semibold text-slate-400">No games found</p>
              <p className="text-sm">Try a different search or category.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Game Player Modal ── */}
      <AnimatePresence>
        {playingGame && activeGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col bg-[#04040e]"
          >
            {/* Top bar */}
            <div
              className="h-13 h-[52px] flex-shrink-0 border-b border-white/8 bg-[#070710]/90 backdrop-blur flex items-center justify-between px-4 gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm flex-shrink-0 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${activeGame.color}, ${activeGame.color}99)` }}
                >
                  {activeGame.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-white text-sm leading-none truncate">{activeGame.name}</h3>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">{activeGame.category}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white bg-white/6 hover:bg-white/12 px-3 py-1.5 rounded-lg transition-colors"
                  onClick={() => window.open(activeGame.url, "_blank")}
                >
                  <Maximize2 size={13} /> Full Tab
                </button>
                <button
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                  onClick={() => setPlayingGame(null)}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Game iframe */}
            <div className="flex-1 relative">
              <iframe
                src={activeGame.url}
                className="absolute inset-0 w-full h-full border-0"
                title={activeGame.name}
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
