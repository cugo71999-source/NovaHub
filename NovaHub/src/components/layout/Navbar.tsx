import { Link, useLocation } from "wouter";
import { Tv2, Menu, X, Settings } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "/",        label: "Home"   },
    { href: "/games",   label: "Games"  },
    { href: "/movies",  label: "Movies" },
    { href: "/proxy",   label: "Proxy"  },
    { href: "/settings",label: "Settings", icon: <Settings size={13} className="inline-block mb-0.5" /> },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#07071099] backdrop-blur-xl border-b border-white/8" : "bg-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-8 h-8 rounded-xl bg-[color:var(--theme-color)] flex items-center justify-center shadow-lg shadow-[rgba(var(--theme-glow),0.3)] group-hover:scale-105 transition-transform">
            <Tv2 size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-black tracking-tight text-white">
            Nova<span className="text-[color:var(--theme-color)]">Hub</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                location === l.href
                  ? "bg-[color:var(--theme-color)]/15 text-[color:var(--theme-color)]"
                  : "text-slate-400 hover:text-white hover:bg-white/6"
              }`}
            >
              {l.icon}{l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-slate-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d0d1a]/95 backdrop-blur-xl border-b border-white/8 p-4 flex flex-col gap-1.5">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                location === l.href
                  ? "bg-[color:var(--theme-color)]/15 text-[color:var(--theme-color)]"
                  : "text-slate-400 hover:text-white hover:bg-white/6"
              }`}
            >
              {l.icon}{l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
