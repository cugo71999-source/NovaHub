import { Layout } from "@/components/layout/Layout";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Gamepad2, Film, Shield, Play, Sparkles, Tv2 } from "lucide-react";
import { games } from "@/data/games";
import { movies } from "@/data/movies";

export default function Home() {
  const featuredGames  = games.slice(0, 4);
  const trendingMovies = movies.slice(0, 4);

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#04040e]">
        {/* Background radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-20 blur-[120px]"
            style={{ background: "radial-gradient(ellipse, rgba(var(--theme-glow),0.6) 0%, transparent 70%)" }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#04040e] to-transparent" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative container mx-auto px-4 text-center pt-24 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[color:var(--theme-color)]/10 border border-[color:var(--theme-color)]/20 text-[color:var(--theme-color)] text-sm font-semibold mb-8"
          >
            <Sparkles className="w-4 h-4" />
            The ultimate break-time destination
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 max-w-4xl mx-auto leading-[1.05]"
          >
            Unblocked entertainment,{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, var(--theme-color), #a78bfa)" }}
            >
              elevated.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            NovaHub brings you unblocked games, free cinematic movies, and fast web proxies — designed for students, built for speed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/games">
              <button className="flex items-center gap-2.5 bg-[color:var(--theme-color)] hover:opacity-90 text-white px-8 py-3.5 rounded-xl font-bold text-base transition-all shadow-xl shadow-[rgba(var(--theme-glow),0.25)] group">
                <Gamepad2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Play Games
              </button>
            </Link>
            <Link href="/movies">
              <button className="flex items-center gap-2.5 bg-white/8 hover:bg-white/14 border border-white/10 text-white px-8 py-3.5 rounded-xl font-bold text-base transition-all group">
                <Film className="w-5 h-5 text-[color:var(--theme-color)] group-hover:scale-110 transition-transform" />
                Watch Movies
              </button>
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-16 text-slate-500"
          >
            {[
              { label: "Games", value: `${games.length}+` },
              { label: "Movies", value: `${movies.length}+` },
              { label: "Proxies", value: "8" },
              { label: "Cost", value: "Free" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-xs uppercase tracking-widest mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section className="py-20 bg-[#070710]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FeatureCard
              icon={<Gamepad2 className="w-7 h-7 text-[color:var(--theme-color)]" />}
              title="Massive Game Library"
              description="Play dozens of top-tier HTML5 and IO games instantly — no install needed."
              href="/games"
              accentClass="bg-[color:var(--theme-color)]/10"
              delay={0}
            />
            <FeatureCard
              icon={<Film className="w-7 h-7 text-violet-400" />}
              title="Free Cinematic Movies"
              description="Watch full-length, high-quality movies for free. No signup required."
              href="/movies"
              accentClass="bg-violet-500/10"
              delay={0.1}
            />
            <FeatureCard
              icon={<Shield className="w-7 h-7 text-emerald-400" />}
              title="Web Proxies"
              description="Bypass restrictions safely with our collection of high-speed web proxies."
              href="/proxy"
              accentClass="bg-emerald-500/10"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* ── Featured Games ── */}
      <section className="py-16 bg-[#070710]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-white">Featured Games</h2>
              <p className="text-slate-500 text-sm mt-1">The most popular titles right now.</p>
            </div>
            <Link href="/games" className="flex items-center gap-1 text-sm font-bold text-[color:var(--theme-color)] hover:opacity-80 transition-opacity group">
              View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredGames.map((game, i) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={`/games?play=${game.id}`} className="block group">
                  <div
                    className="relative aspect-video rounded-xl overflow-hidden mb-2.5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl"
                    style={{ boxShadow: `0 0 0 1px ${game.color}22` }}
                  >
                    <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${game.color}cc 0%, ${game.color}44 100%)` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                        <Play fill="currentColor" className="w-5 h-5 ml-0.5 text-[#070710]" />
                      </div>
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-end">
                      <span className="text-white font-bold text-sm drop-shadow truncate">{game.name}</span>
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-black/40 text-white/70 backdrop-blur-sm flex-shrink-0 ml-1">
                        {game.category}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trending Movies ── */}
      <section className="py-16 bg-[#070710] border-t border-white/4">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-white">Trending Movies</h2>
              <p className="text-slate-500 text-sm mt-1">Stream full movies for free.</p>
            </div>
            <Link href="/movies" className="flex items-center gap-1 text-sm font-bold text-[color:var(--theme-color)] hover:opacity-80 transition-opacity group">
              View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trendingMovies.map((movie, i) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href="/movies" className="block group">
                  <div className="relative rounded-xl overflow-hidden mb-2.5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl ring-1 ring-white/6" style={{ aspectRatio: "2/3" }}>
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
                      onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <div className="flex items-center gap-1.5 bg-[color:var(--theme-color)] text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                        <Play fill="currentColor" className="w-2.5 h-2.5" /> Play
                      </div>
                    </div>
                  </div>
                  <p className="text-white text-xs font-semibold truncate group-hover:text-[color:var(--theme-color)] transition-colors">{movie.title}</p>
                  <p className="text-slate-600 text-[10px] mt-0.5">{movie.year}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function FeatureCard({ icon, title, description, href, accentClass, delay }: {
  icon: React.ReactNode; title: string; description: string;
  href: string; accentClass: string; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <Link href={href} className="block group h-full">
        <div className="h-full p-6 rounded-2xl bg-white/3 hover:bg-white/6 border border-white/6 hover:border-[color:var(--theme-color)]/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-black/40">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${accentClass} transition-transform group-hover:scale-110 group-hover:rotate-3`}>
            {icon}
          </div>
          <h3 className="text-base font-bold text-white mb-2">{title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
