import { useState, useRef, useEffect, useCallback } from "react";
import { Layout } from "@/components/layout/Layout";
import { movies, getDriveUrl, GENRES, type Movie } from "@/data/movies";
import {
  Play, Star, Search, X, ChevronLeft, ChevronRight,
  ArrowLeft, Info, Film, Tag, Tv2, Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Main Page ───────────────────────────────────────────────────
export default function Movies() {
  const [search, setSearch]           = useState("");
  const [activeGenre, setActiveGenre] = useState<string>("All");
  const [infoMovie, setInfoMovie]     = useState<Movie | null>(null);
  const [streamMovie, setStreamMovie] = useState<Movie | null>(null);
  const [heroIdx, setHeroIdx]         = useState(0);

  const heroPool = movies.slice(0, 7);
  const hero = heroPool[heroIdx];

  useEffect(() => {
    if (search || streamMovie || activeGenre !== "All") return;
    const t = setInterval(() => setHeroIdx(i => (i + 1) % heroPool.length), 6500);
    return () => clearInterval(t);
  }, [search, streamMovie, activeGenre, heroPool.length]);

  const allGenres = ["All", ...GENRES];
  const filtered = (() => {
    let list = movies;
    if (search.trim()) list = list.filter(m => m.title.toLowerCase().includes(search.toLowerCase()));
    if (activeGenre !== "All") list = list.filter(m => m.genre === activeGenre);
    return list;
  })();
  const isFiltering = search.trim() !== "" || activeGenre !== "All";

  if (streamMovie) {
    return <Player movie={streamMovie} onBack={() => setStreamMovie(null)} />;
  }

  return (
    <Layout>
      <div className="min-h-screen text-white" style={{ background: "#07070e" }}>

        {/* ── Sticky Genre + Search Bar ── */}
        <div className="fixed top-[64px] left-0 right-0 z-40">
          <div
            className="flex items-center gap-2 px-4 md:px-10 py-2.5"
            style={{ background: "linear-gradient(180deg,rgba(7,7,14,.97) 0%,rgba(7,7,14,.65) 75%,transparent 100%)" }}
          >
            <div className="flex items-center gap-1.5 overflow-x-auto flex-1 min-w-0 pb-0.5" style={{ scrollbarWidth: "none" }}>
              {allGenres.map(g => (
                <button
                  key={g}
                  onClick={() => setActiveGenre(g)}
                  className={`flex-shrink-0 text-[11px] font-bold px-3.5 py-1.5 rounded-full border transition-all duration-200 ${
                    activeGenre === g
                      ? "bg-[color:var(--theme-color)] border-[color:var(--theme-color)] text-white shadow-md shadow-[color:var(--theme-color)]/20"
                      : "bg-black/25 border-white/8 text-slate-500 hover:border-white/20 hover:text-slate-200"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            <div className="relative flex-shrink-0">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-600 w-3 h-3" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search…"
                className="w-28 focus:w-44 transition-all duration-300 bg-black/50 border border-white/8 rounded-full py-1.5 pl-7 pr-3 text-[11px] placeholder:text-slate-700 focus:outline-none focus:border-[color:var(--theme-color)]/40"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white">
                  <X size={10} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── FILTERED GRID ── */}
        {isFiltering ? (
          <div className="pt-32 px-4 md:px-10 pb-20">
            <p className="text-xs text-slate-600 mb-6 uppercase tracking-widest font-bold">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              {search && <> · <span className="text-slate-400 normal-case">"{search}"</span></>}
              {activeGenre !== "All" && <> · <span className="text-[color:var(--theme-color)] normal-case">{activeGenre}</span></>}
            </p>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center py-40 gap-3 text-slate-700">
                <Film size={44} />
                <p className="text-base font-bold">No movies found</p>
                <button onClick={() => { setSearch(""); setActiveGenre("All"); }} className="text-xs text-[color:var(--theme-color)] hover:underline">Clear filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                {filtered.map(m => <PosterCard key={m.id} movie={m} onPlay={() => setStreamMovie(m)} onInfo={() => setInfoMovie(m)} />)}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* ══════════════════════════════════════════════════
                HERO — split: poster right, info left
            ══════════════════════════════════════════════════ */}
            <div className="relative min-h-screen flex items-center overflow-hidden">

              {/* Blurred backdrop */}
              <AnimatePresence mode="sync">
                <motion.div
                  key={hero.id + "-bg"}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.1 }}
                >
                  <img
                    src={hero.backdrop}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-top scale-110"
                    style={{ filter: "blur(3px) brightness(0.6) saturate(1.6)" }}
                    onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Strong gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#07070e] via-[#07070e]/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07070e] via-transparent to-[#07070e]/40" />

              {/* Content row */}
              <div className="relative z-10 w-full pt-28 pb-16 px-6 md:px-12 flex items-center gap-12 lg:gap-20">

                {/* Left: Info */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={hero.id + "-info"}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 max-w-xl"
                  >
                    {/* Genre + meta */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-[color:var(--theme-color)] text-white">
                        {hero.genre}
                      </span>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs font-black">{hero.rating}</span>
                      </div>
                      <span className="text-slate-500 text-xs">{hero.year}</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl lg:text-[3.8rem] font-black leading-[1.02] tracking-tight mb-5">
                      {hero.title}
                    </h1>

                    {/* Description */}
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 line-clamp-3 max-w-lg">
                      {hero.description}
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-3 flex-wrap mb-10">
                      <motion.button
                        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        onClick={() => setStreamMovie(hero)}
                        className="flex items-center gap-2.5 bg-white text-black px-8 py-3.5 rounded-2xl font-black text-sm hover:bg-slate-100 transition-colors shadow-2xl"
                      >
                        <Play fill="currentColor" className="w-4 h-4" /> Play Now
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        onClick={() => setInfoMovie(hero)}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/16 border border-white/12 text-white px-6 py-3.5 rounded-2xl font-bold text-sm transition-all backdrop-blur-sm"
                      >
                        <Info className="w-4 h-4" /> Details
                      </motion.button>
                    </div>

                    {/* Cycle dots */}
                    <div className="flex items-center gap-2">
                      {heroPool.map((m, i) => (
                        <button
                          key={m.id}
                          onClick={() => setHeroIdx(i)}
                          className={`h-[3px] rounded-full transition-all duration-500 ${i === heroIdx ? "w-8 bg-white" : "w-3 bg-white/20 hover:bg-white/40"}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Right: Poster */}
                <div className="hidden lg:flex flex-shrink-0 items-center justify-center relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={hero.id + "-poster"}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="relative"
                    >
                      {/* Glow */}
                      <div
                        className="absolute inset-0 rounded-2xl blur-3xl opacity-40 scale-95"
                        style={{ background: "var(--theme-color)" }}
                      />
                      <img
                        src={hero.poster}
                        alt={hero.title}
                        className="relative w-[230px] xl:w-[270px] rounded-2xl shadow-2xl ring-1 ring-white/10 object-cover"
                        style={{ aspectRatio: "2/3" }}
                        onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                      {/* Rating badge on poster */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-yellow-400 text-xs font-black">{hero.rating}</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Prev/Next arrow nudge */}
              <button
                onClick={() => setHeroIdx(i => (i - 1 + heroPool.length) % heroPool.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/6 backdrop-blur border border-white/8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/12 transition-all hidden md:flex"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setHeroIdx(i => (i + 1) % heroPool.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/6 backdrop-blur border border-white/8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/12 transition-all hidden md:flex"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* ══════════════════════════════════════════════════
                GENRE ROWS
            ══════════════════════════════════════════════════ */}
            <div className="px-4 md:px-10 space-y-10 pb-24 -mt-6 relative z-10">
              {GENRES.map(genre => {
                const list = movies.filter(m => m.genre === genre);
                return list.length > 0 ? (
                  <GenreRow key={genre} genre={genre} list={list}
                    onPlay={setStreamMovie} onInfo={setInfoMovie}
                  />
                ) : null;
              })}
            </div>
          </>
        )}

        {/* Info Modal */}
        <AnimatePresence>
          {infoMovie && (
            <InfoModal
              movie={infoMovie}
              onClose={() => setInfoMovie(null)}
              onPlay={() => { setStreamMovie(infoMovie); setInfoMovie(null); }}
            />
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}

// ─── Genre Row ───────────────────────────────────────────────────
function GenreRow({ genre, list, onPlay, onInfo }: {
  genre: string; list: Movie[];
  onPlay: (m: Movie) => void; onInfo: (m: Movie) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: "l" | "r") =>
    ref.current?.scrollBy({ left: dir === "r" ? 700 : -700, behavior: "smooth" });

  return (
    <section>
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="inline-block w-1 h-5 rounded-full bg-[color:var(--theme-color)]" />
          <h2 className="text-sm font-black text-white tracking-tight">{genre}</h2>
          <span className="text-[11px] text-slate-700 font-semibold">{list.length}</span>
        </div>
        <div className="flex gap-1">
          <button onClick={() => scroll("l")} className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 border border-white/6 flex items-center justify-center transition-all">
            <ChevronLeft size={14} />
          </button>
          <button onClick={() => scroll("r")} className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 border border-white/6 flex items-center justify-center transition-all">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Scrollable row */}
      <div ref={ref} className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {list.map((m, i) => (
          <motion.div
            key={m.id}
            className="flex-shrink-0 w-[130px] md:w-[148px]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.025, duration: 0.3 }}
          >
            <PosterCard movie={m} onPlay={() => onPlay(m)} onInfo={() => onInfo(m)} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Poster Card ─────────────────────────────────────────────────
function PosterCard({ movie, onPlay, onInfo }: {
  movie: Movie; onPlay: () => void; onInfo: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [err, setErr]       = useState(false);

  return (
    <div
      className="group relative rounded-xl overflow-hidden cursor-pointer bg-[#111120] shadow-lg"
      style={{ aspectRatio: "2/3" }}
    >
      {/* Poster image */}
      {!err && (
        <img
          src={movie.poster}
          alt={movie.title}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-30 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
          onError={() => setErr(true)}
        />
      )}

      {/* Fallback */}
      {(!loaded || err) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 bg-gradient-to-br from-[#1a1a2e] to-[#0d0d1a]">
          <Film className="w-6 h-6 text-slate-700" />
          <span className="text-white text-[9px] font-bold text-center leading-tight line-clamp-3 opacity-70">{movie.title}</span>
        </div>
      )}

      {/* Always-on rating */}
      <div className="absolute top-2 left-2 flex items-center gap-0.5 bg-black/70 backdrop-blur-sm rounded-lg px-1.5 py-0.5">
        <Star className="w-2 h-2 fill-yellow-400 text-yellow-400" />
        <span className="text-yellow-400 text-[9px] font-black">{movie.rating}</span>
      </div>

      {/* Hover reveal */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end"
        style={{ background: "linear-gradient(to top, #000 0%, rgba(0,0,0,.8) 45%, transparent 100%)" }}
      >
        <div className="p-2.5 space-y-1.5">
          <p className="text-white font-black text-[11px] leading-tight line-clamp-2">{movie.title}</p>
          <p className="text-slate-500 text-[9px]">{movie.year}</p>
          <div className="flex gap-1.5 pt-0.5">
            <button
              onClick={e => { e.stopPropagation(); onPlay(); }}
              className="flex-1 flex items-center justify-center gap-1 bg-white text-black py-1.5 rounded-lg text-[10px] font-black hover:bg-slate-100 transition-colors"
            >
              <Play fill="currentColor" className="w-2.5 h-2.5" /> Play
            </button>
            <button
              onClick={e => { e.stopPropagation(); onInfo(); }}
              className="w-8 flex items-center justify-center bg-white/12 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              <Info size={11} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Info Modal ───────────────────────────────────────────────────
function InfoModal({ movie, onClose, onPlay }: {
  movie: Movie; onClose: () => void; onPlay: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center sm:p-4">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/88 backdrop-blur-lg"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="relative w-full sm:max-w-md bg-[#0d0d1c] border-t sm:border border-white/7 sm:rounded-2xl overflow-hidden shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 w-8 h-8 bg-white/6 hover:bg-white/12 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all"
        >
          <X size={14} />
        </button>

        {/* Backdrop */}
        <div className="relative h-48 overflow-hidden">
          <img src={movie.backdrop} alt="" className="w-full h-full object-cover"
            onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1c] via-[#0d0d1c]/20 to-transparent" />
          <span className="absolute bottom-3 left-4 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-[color:var(--theme-color)] text-white">
            {movie.genre}
          </span>
        </div>

        <div className="px-5 pb-5 -mt-8 relative">
          <div className="flex gap-3.5 mb-4">
            <img src={movie.poster} alt="" className="w-[60px] flex-shrink-0 rounded-xl ring-2 ring-white/10 shadow-2xl self-start"
              onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <div className="flex-1 pt-9">
              <h2 className="text-lg font-black text-white leading-tight mb-1.5">{movie.title}</h2>
              <div className="flex items-center gap-2 text-xs flex-wrap">
                <span className="flex items-center gap-1 text-yellow-400 font-bold">
                  <Star className="w-3 h-3 fill-current" />{movie.rating}
                </span>
                <span className="text-slate-600">·</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Calendar className="w-3 h-3" />{movie.year}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/4 border border-white/5 rounded-xl p-3.5 mb-4">
            <p className="text-slate-300 text-[13px] leading-relaxed">{movie.description}</p>
          </div>

          <div className="flex gap-2.5">
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={onPlay}
              className="flex-1 flex items-center justify-center gap-2 bg-[color:var(--theme-color)] hover:opacity-90 text-white py-3.5 rounded-2xl font-black text-sm transition-opacity"
            >
              <Play fill="currentColor" className="w-4 h-4" /> Stream Now
            </motion.button>
            <button onClick={onClose} className="px-4 rounded-2xl bg-white/6 hover:bg-white/10 text-slate-400 font-semibold text-sm transition-colors">
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Player ──────────────────────────────────────────────────────
function Player({ movie: initial, onBack }: { movie: Movie; onBack: () => void }) {
  const [movie, setMovie]     = useState(initial);
  const [showSide, setShowSide] = useState(true);
  const [tab, setTab]         = useState<"about" | "more">("about");
  const related = movies.filter(m => m.genre === movie.genre && m.id !== movie.id).slice(0, 9);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[200] flex flex-col bg-[#07070e]"
    >
      {/* Top Bar */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[#08080f]/98 border-b border-white/5 flex-shrink-0">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group">
          <div className="w-8 h-8 rounded-xl bg-white/6 group-hover:bg-white/10 flex items-center justify-center transition-colors">
            <ArrowLeft size={15} />
          </div>
          <span className="hidden sm:block text-xs font-semibold text-slate-400">Back</span>
        </button>
        <div className="h-4 w-px bg-white/8 hidden sm:block" />
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="w-1.5 h-1.5 rounded-full bg-[color:var(--theme-color)] animate-pulse" />
          <span className="font-black text-white text-sm truncate">{movie.title}</span>
          <span className="hidden md:block text-slate-600 text-xs">· {movie.year}</span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <div className="hidden md:flex items-center gap-1 bg-yellow-400/8 border border-yellow-400/12 rounded-full px-2.5 py-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-yellow-400 text-[11px] font-black">{movie.rating}</span>
          </div>
          <button
            onClick={() => setShowSide(s => !s)}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              showSide
                ? "bg-[color:var(--theme-color)]/12 border-[color:var(--theme-color)]/20 text-[color:var(--theme-color)]"
                : "bg-white/4 border-white/6 text-slate-600 hover:text-white"
            }`}
          >
            <Tv2 size={12} />
            {showSide ? "Hide" : "Info"}
          </button>
          <button onClick={onBack} className="w-8 h-8 rounded-xl bg-white/4 hover:bg-red-500/15 border border-white/6 flex items-center justify-center text-slate-600 hover:text-red-400 transition-all">
            <X size={13} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Iframe */}
        <div className="flex-1 relative bg-black min-w-0">
          <AnimatePresence mode="wait">
            <motion.iframe
              key={movie.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              src={getDriveUrl(movie.driveId)}
              title={movie.title}
              allow="autoplay; fullscreen"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </AnimatePresence>
        </div>

        {/* Side Panel */}
        <AnimatePresence>
          {showSide && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 290, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="hidden sm:flex flex-col bg-[#09091b] border-l border-white/5 flex-shrink-0 overflow-hidden"
            >
              <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#1c1c32 transparent" }}>
                {/* Backdrop */}
                <div className="relative h-36 overflow-hidden flex-shrink-0">
                  <img src={movie.backdrop} alt="" className="w-full h-full object-cover"
                    onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09091b] to-transparent" />
                </div>

                <div className="px-4 pb-6 -mt-10 relative">
                  <div className="flex gap-3 mb-4">
                    <img src={movie.poster} alt="" className="w-[52px] rounded-xl ring-2 ring-white/8 shadow-xl flex-shrink-0 self-end"
                      onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    <div className="self-end pb-0.5 min-w-0">
                      <h3 className="font-black text-white text-[13px] leading-snug truncate">{movie.title}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-yellow-400 text-[11px] font-black">{movie.rating}</span>
                        <span className="text-slate-700 text-[10px]">· {movie.year}</span>
                      </div>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 bg-[color:var(--theme-color)]/10 border border-[color:var(--theme-color)]/18 px-2.5 py-1 rounded-full mb-4">
                    <Tag className="w-2.5 h-2.5 text-[color:var(--theme-color)]" />
                    <span className="text-[9px] font-bold text-[color:var(--theme-color)]">{movie.genre}</span>
                  </div>

                  {/* Tabs */}
                  <div className="flex rounded-xl bg-white/4 border border-white/5 p-0.5 mb-4">
                    {(["about", "more"] as const).map(t => (
                      <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${tab === t ? "bg-[color:var(--theme-color)] text-white" : "text-slate-600 hover:text-slate-300"}`}
                      >
                        {t === "about" ? "About" : "More"}
                      </button>
                    ))}
                  </div>

                  {tab === "about" ? (
                    <div className="space-y-3">
                      <div className="bg-white/4 border border-white/5 rounded-xl p-3">
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-wider mb-1.5">Synopsis</p>
                        <p className="text-slate-400 text-[11px] leading-relaxed">{movie.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white/4 border border-white/5 rounded-xl p-3">
                          <p className="text-[9px] text-slate-600 uppercase tracking-wider mb-1">Rating</p>
                          <div className="flex items-baseline gap-0.5">
                            <span className="text-white font-black text-lg">{movie.rating}</span>
                            <span className="text-slate-600 text-[10px]">/10</span>
                          </div>
                        </div>
                        <div className="bg-white/4 border border-white/5 rounded-xl p-3">
                          <p className="text-[9px] text-slate-600 uppercase tracking-wider mb-1">Year</p>
                          <span className="text-white font-black text-lg">{movie.year}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {related.length === 0 ? (
                        <p className="text-slate-700 text-xs text-center py-8">No related movies</p>
                      ) : (
                        <div className="grid grid-cols-3 gap-2">
                          {related.map(m => (
                            <motion.button
                              key={m.id}
                              whileHover={{ scale: 1.06 }}
                              whileTap={{ scale: 0.94 }}
                              onClick={() => { setMovie(m); setTab("about"); }}
                              className="aspect-[2/3] rounded-xl overflow-hidden bg-slate-800 relative group"
                              title={m.title}
                            >
                              <img src={m.poster} alt={m.title}
                                className="w-full h-full object-cover group-hover:brightness-40 transition-all duration-300"
                                onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                                  <Play fill="black" className="w-3 h-3 ml-0.5" />
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
