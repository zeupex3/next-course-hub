import type { Game } from "../type/game";

export const games: Game[] = [
  {
    id: "g-001",
    title: "Elden Ring",
    platform: "PC",
    estimatedHours: 80,
    status: "in-progress",
  },
  {
    id: "g-002",
    title: "The Legend of Zelda: Tears of the Kingdom",
    platform: "Nintendo Switch",
    estimatedHours: 95,
    status: "not-started",
  },
  {
    id: "g-003",
    title: "God of War Ragnarök",
    platform: "PlayStation",
    estimatedHours: 40,
    status: "completed",
  },
  {
    id: "g-004",
    title: "Halo Infinite",
    platform: "Xbox",
    estimatedHours: 20,
    status: "not-started",
  },
  {
    id: "g-005",
    title: "Hollow Knight",
    platform: "PC",
    estimatedHours: 35,
    status: "not-started",
  },
];
