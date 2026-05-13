import { Link } from "wouter";
import { Tv2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#070710] border-t border-white/6 py-10 mt-auto">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3 w-fit group">
              <div className="w-7 h-7 rounded-lg bg-[color:var(--theme-color)] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Tv2 size={15} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="text-base font-black text-white">
                Nova<span className="text-[color:var(--theme-color)]">Hub</span>
              </span>
            </Link>
            <p className="text-slate-600 text-sm max-w-xs leading-relaxed">
              The ultimate unblocked entertainment hub. Games, movies, and free web access — all in one place. 
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-3">Navigate</h4>
              <ul className="space-y-2">
                {["/games", "/movies", "/proxy", "/settings"].map(href => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-slate-600 hover:text-white capitalize transition-colors">
                      {href.replace("/", "")}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-3">Legal</h4>
              <ul className="space-y-2">
                {["Terms", "Privacy", "DMCA"].map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm text-slate-600 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5">
          <p className="text-xs text-slate-700 text-center">
            &copy; {new Date().getFullYear()} NovaCade — For educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
