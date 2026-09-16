import type { Metadata } from "next";
import GameExplorer from "../components/GameExplorer";
import { games } from "../data/gamedata";

export const metadata: Metadata = {
  title: "Game Backlog | CourseHub",
};

export default function GamesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto mb-8 text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
          Game Backlog
        </h1>
      </div>
      <GameExplorer initialGames={games} />
    </main>
  );
}
