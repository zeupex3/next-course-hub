export type GameStatus = "not-started" | "in-progress" | "completed";

export type Platform =
  | "PC"
  | "PlayStation"
  | "Xbox"
  | "Nintendo Switch"
  | "Mobile";

export type Game = {
  id: string;
  title: string;
  platform: Platform;
  estimatedHours: number;
  status: GameStatus;
};
