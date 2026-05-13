export interface Game {
  id: string;
  name: string;
  url: string;
  category: string;
  color: string;
}

export const games: Game[] = [
  { id: "slither", name: "Slither.io", url: "https://slither.io", category: "IO Games", color: "#22c55e" },
  { id: "krunker", name: "Krunker.io", url: "https://krunker.io", category: "FPS", color: "#f97316" },
  { id: "agar", name: "Agar.io", url: "https://agar.io", category: "IO Games", color: "#a855f7" },
  { id: "shellshockers", name: "Shell Shockers", url: "https://shellshock.io", category: "FPS", color: "#ef4444" },
  { id: "1v1lol", name: "1v1.LOL", url: "https://1v1.lol", category: "Battle", color: "#3b82f6" },
  { id: "minecraft", name: "Minecraft Classic", url: "https://classic.minecraft.net", category: "Sandbox", color: "#84cc16" },
  { id: "cookieclicker", name: "Cookie Clicker", url: "https://orteil.dashnet.org/cookieclicker", category: "Idle", color: "#f59e0b" },
  { id: "chromedino", name: "Chrome Dino", url: "https://chromedino.com", category: "Arcade", color: "#6b7280" },
  { id: "2048", name: "2048", url: "https://play2048.co", category: "Puzzle", color: "#eab308" },
  { id: "slope", name: "Slope", url: "https://slope-game.github.io", category: "Arcade", color: "#06b6d4" },
  { id: "run3", name: "Run 3", url: "https://www.coolmathgames.com/0-run-3", category: "Arcade", color: "#8b5cf6" },
  { id: "flappybird", name: "Flappy Bird", url: "https://flappybird.io", category: "Arcade", color: "#84cc16" },
  { id: "paperio2", name: "Paper.io 2", url: "https://paper-io.com", category: "IO Games", color: "#14b8a6" },
  { id: "skribbl", name: "Skribbl.io", url: "https://skribbl.io", category: "Party", color: "#ec4899" },
  { id: "minesweeper", name: "Minesweeper", url: "https://minesweeperonline.com", category: "Puzzle", color: "#64748b" },
  { id: "drifthunters", name: "Drift Hunters", url: "https://drifthunters.io", category: "Racing", color: "#f43f5e" },
  { id: "retrobowl", name: "Retro Bowl", url: "https://retrobowl.me", category: "Sports", color: "#22c55e" },
  { id: "monkeymart", name: "Monkey Mart", url: "https://monkey-mart.io", category: "Casual", color: "#fb923c" },
  { id: "btd5", name: "Bloons TD 5", url: "https://btd5.bloonstd.me", category: "Strategy", color: "#7c3aed" },
  { id: "jacksmith", name: "Jacksmith", url: "https://coolmathgames.com/0-jacksmith", category: "Strategy", color: "#b45309" }
];
