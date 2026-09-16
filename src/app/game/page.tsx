import type { Metadata } from "next";
import GameExplorer from "../components/GameExplorer";
import { games } from "../data/gamedata";

export const metadata: Metadata = {
  title: "Game Backlog - รายการเกมทั้งหมด",
};

export default function GamesPage() {
  return (
    <main style={{ padding: "24px 0" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        🎮 Game Backlog
      </h1>
      <GameExplorer initialGames={games} />
    </main>
  );
}
