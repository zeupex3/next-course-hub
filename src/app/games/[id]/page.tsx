import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { games } from "@/app/data/gamedata";

type GamePageProps = {
  params: Promise<{ id: string }>;
};

const statusConfig = {
  "not-started": {
    label: "ยังไม่ได้เล่น",
    color: "bg-slate-500/10 text-slate-400 border-slate-700/50",
    dot: "bg-slate-400",
  },
  "in-progress": {
    label: "กำลังเล่น",
    color: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
  },
  completed: {
    label: "เล่นจบแล้ว",
    color: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
  },
};

export async function generateMetadata({
  params,
}: GamePageProps): Promise<Metadata> {
  const { id } = await params;
  const game = games.find((g) => g.id === id);

  return {
    title: game ? `${game.title} | Game Backlog` : "ไม่พบข้อมูลเกม",
  };
}

export default async function GameDetailPage({ params }: GamePageProps) {
  const { id } = await params;
  const game = games.find((g) => g.id === id);

  if (!game) {
    notFound();
  }

  const currentStatus =
    statusConfig[game.status as keyof typeof statusConfig] ||
    statusConfig["not-started"];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 sm:px-10 py-14 relative overflow-hidden flex flex-col justify-center items-center">
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-2xl space-y-6 relative z-10">
        <Link
          href="/games"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-blue-400 hover:text-blue-300 transition-colors px-1"
        >
          <span>←</span>
          <span>BACK TO GAMES</span>
        </Link>

        <article className="relative rounded-3xl bg-slate-900/20 backdrop-blur-2xl border border-white/[0.05] p-8 sm:p-10 space-y-8 shadow-2xl overflow-hidden">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)] animate-pulse" />
              <span className="text-[15px] font-mono tracking-widest uppercase text-blue-400 font-semibold">
                {game.platform}
              </span>
            </div>

            <span
              className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium border backdrop-blur-md ${currentStatus.color}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${currentStatus.dot}`}
              />
              {currentStatus.label}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-sm leading-snug">
            {game.title}
          </h1>

          <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.05]">
            <div className="space-y-1 px-2">
              <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase block">
                ESTIMATED TIME
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold font-mono text-white tracking-tight">
                  {game.estimatedHours}
                </span>
                <span className="text-xs font-mono text-slate-500 uppercase">
                  HOURS
                </span>
              </div>
            </div>

            <div className="space-y-1 px-2 border-l border-white/10 pl-6">
              <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase block">
                CURRENT STATUS
              </span>
              <span className="text-base sm:text-lg font-bold font-mono text-blue-300 block truncate">
                {currentStatus.label}
              </span>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
