export interface ProxyService {
  id: string;
  name: string;
  description: string;
  url: string;
  tag?: string;
  color: string;
}

export const proxies: ProxyService[] = [
  {
    id: "holy-unblocker",
    name: "Holy Unblocker",
    description: "Feature-rich proxy with support for most sites. Fast and reliable for everyday browsing.",
    url: "https://holyubofficial.net",
    tag: "Popular",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "ultraviolet",
    name: "Ultraviolet",
    description: "Advanced service worker proxy designed to bypass strict network filters with ease.",
    url: "https://uv.holyubofficial.net",
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "nebula",
    name: "Nebula",
    description: "High-speed proxy optimized for streaming media and video content on school networks.",
    url: "https://nebulaproxy.io",
    tag: "Fast",
    color: "from-indigo-500 to-blue-600",
  },
  {
    id: "titanium",
    name: "Titanium Network",
    description: "A suite of proxy services with multiple backends. Reliable and frequently updated.",
    url: "https://discord.gg/unblock",
    color: "from-slate-500 to-slate-600",
  },
  {
    id: "croxy",
    name: "CroxyProxy",
    description: "Browser-based proxy that supports YouTube, Google, Reddit, and social media.",
    url: "https://www.croxyproxy.com",
    tag: "YT Support",
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "kproxy",
    name: "KProxy",
    description: "Established free web proxy with servers in multiple countries for better speeds.",
    url: "https://kproxy.com",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "proxysite",
    name: "ProxySite",
    description: "Reliable web proxy supporting US & EU servers. Works well for Google and social media.",
    url: "https://www.proxysite.com",
    color: "from-cyan-500 to-sky-500",
  },
  {
    id: "interstellar",
    name: "Interstellar",
    description: "A modern web proxy with high speeds and great compatibility across all content types.",
    url: "https://interstellarnetwork.github.io",
    color: "from-emerald-500 to-teal-500",
  },
];
