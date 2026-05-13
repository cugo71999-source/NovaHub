import { Layout } from "@/components/layout/Layout";
import { proxies } from "@/data/proxies";
import { Shield, Globe, ExternalLink, Zap, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Proxy() {
  function open(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#06060f] text-white pt-24 pb-24">
        <div className="max-w-5xl mx-auto px-4 md:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[color:var(--theme-color)]/12 border border-[color:var(--theme-color)]/20 flex items-center justify-center">
                <Shield size={22} className="text-[color:var(--theme-color)]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black leading-tight">Web Proxies</h1>
                <p className="text-slate-500 text-sm mt-0.5">Click any proxy to open it in a new tab</p>
              </div>
            </div>

            {/* Notice */}
            <div className="flex items-start gap-3 bg-amber-500/6 border border-amber-500/18 rounded-2xl px-4 py-3 text-sm text-amber-400/80">
              <Zap size={15} className="mt-0.5 flex-shrink-0 text-amber-400" />
              <span>These proxies are for educational use only. Respect your local network guidelines and policies.</span>
            </div>
          </motion.div>

          {/* Proxy Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {proxies.map((proxy, i) => (
              <motion.button
                key={proxy.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => open(proxy.url)}
                className="group relative bg-white/3 hover:bg-white/6 border border-white/7 hover:border-[color:var(--theme-color)]/30 rounded-2xl p-5 flex flex-col text-left transition-all duration-200 cursor-pointer shadow-lg hover:shadow-[color:var(--theme-color)]/10 hover:shadow-2xl"
              >
                {/* Color accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r ${proxy.color} opacity-50 group-hover:opacity-100 transition-opacity`} />

                {/* Tag */}
                {proxy.tag && (
                  <span className={`absolute top-3 right-3 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r ${proxy.color} text-white`}>
                    {proxy.tag}
                  </span>
                )}

                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${proxy.color} flex items-center justify-center mb-3.5 shadow-lg opacity-85 group-hover:opacity-100 transition-opacity`}>
                  <Globe size={19} className="text-white" />
                </div>

                {/* Name */}
                <h3 className="font-black text-white text-base mb-1.5">{proxy.name}</h3>

                {/* Description */}
                <p className="text-slate-500 text-xs leading-relaxed flex-1 mb-4 group-hover:text-slate-400 transition-colors">{proxy.description}</p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-700 font-mono truncate max-w-[130px]">
                    {proxy.url.replace(/^https?:\/\//, "")}
                  </span>
                  <div className="flex items-center gap-1 text-[color:var(--theme-color)] text-[11px] font-black group-hover:gap-2 transition-all">
                    Open <ExternalLink size={11} />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

        </div>
      </div>
    </Layout>
  );
}
