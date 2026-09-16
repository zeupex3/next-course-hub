"use client";

import { useState, type ChangeEvent } from "react";
import Link from "next/link";
import type { Game, GameStatus, Platform } from "../type/game";
import GameForm, { type GameDraft } from "./GameForm";

type GameExplorerProps = {
  initialGames?: Game[];
};

const statusStyles: Record<
  GameStatus,
  { label: string; badge: string; dot: string; activeBtn: string }
> = {
  "not-started": {
    label: "ยังไม่ได้เล่น",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]",
    activeBtn: "bg-amber-500/20 text-amber-300 border-amber-500/50",
  },
  "in-progress": {
    label: "กำลังเล่น",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    dot: "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]",
    activeBtn: "bg-blue-500/20 text-blue-300 border-blue-500/50",
  },
  completed: {
    label: "เล่นจบแล้ว",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]",
    activeBtn: "bg-emerald-500/20 text-emerald-300 border-emerald-500/50",
  },
};

export default function GameExplorer({ initialGames = [] }: GameExplorerProps) {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const totalUnstartedHours = games
    .filter((g) => g.status === "not-started")
    .reduce((sum, g) => sum + g.estimatedHours, 0);

  function handleSave(draft: GameDraft) {
    if (editingId) {
      setGames(
        games.map((g) =>
          g.id === editingId
            ? {
                ...g,
                title: draft.title.trim(),
                platform: draft.platform as Platform,
                estimatedHours: Number(draft.estimatedHours),
                status: draft.status,
              }
            : g,
        ),
      );
      setEditingId(null);
    } else {
      const newGame: Game = {
        id: crypto.randomUUID(),
        title: draft.title.trim(),
        platform: draft.platform as Platform,
        estimatedHours: Number(draft.estimatedHours),
        status: draft.status,
      };
      setGames([...games, newGame]);
    }
  }

  function handleQuickStatusChange(id: string, newStatus: GameStatus) {
    setGames(games.map((g) => (g.id === id ? { ...g, status: newStatus } : g)));
  }

  function handleExecuteDelete() {
    if (confirmDeleteId) {
      setGames(games.filter((g) => g.id !== confirmDeleteId));
      if (editingId === confirmDeleteId) setEditingId(null);
      setConfirmDeleteId(null);
    }
  }

  const editingGame = games.find((g) => g.id === editingId);

  const visibleGames = games.filter((game) => {
    const matchesKeyword = game.title
      .toLowerCase()
      .includes(keyword.trim().toLowerCase());
    const matchesStatus =
      statusFilter === "all" || game.status === statusFilter;
    return matchesKeyword && matchesStatus;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      <section className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900/60 via-slate-900 to-indigo-950/80 border border-blue-500/30 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            จำนวนเวลาที่ต้องใช้เล่น
          </h2>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-4xl sm:text-5xl font-black text-blue-400">
            {totalUnstartedHours}
          </span>
          <span className="text-slate-400 text-sm ml-2 font-medium">
            ชั่วโมง
          </span>
        </div>
      </section>

      <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm shadow-xl shadow-blue-950/20 space-y-6">
        <div className="flex items-center gap-3 pb-2 border-b border-slate-800/80">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
          <h2 className="text-[15px] sm:text-[20px] font-bold text-white tracking-tight">
            {editingGame ? "แก้ไขข้อมูลเกม" : "เพิ่มเกมใหม่"}
          </h2>
        </div>
        <GameForm
          key={editingId ?? "new"}
          initialGame={editingGame}
          onSave={handleSave}
          onCancel={() => setEditingId(null)}
        />
      </section>

      {/* ค้นหา */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="search"
            placeholder="ค้นหาชื่อเกม..."
            value={keyword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setKeyword(e.target.value)
            }
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setStatusFilter(e.target.value)
          }
          className="px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
        >
          <option value="all">สถานะทั้งหมด</option>
          <option value="not-started">ยังไม่ได้เล่น</option>
          <option value="in-progress">กำลังเล่น</option>
          <option value="completed">เล่นจบแล้ว</option>
        </select>
      </div>

      {/* การ์ดเกม */}
      <section className="space-y-4">
        {visibleGames.length === 0 ? (
          <div className="text-center py-20 px-4 rounded-3xl border border-dashed border-slate-800 bg-slate-950/40 text-slate-500 text-sm">
            ไม่พบเกมที่ค้นหา
          </div>
        ) : (
          visibleGames.map((game) => (
            <article
              key={game.id}
              className="group p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition-all duration-200 backdrop-blur-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <Link
                    href={`/games/${game.id}`}
                    className="text-[20px] font-bold text-white group-hover:text-blue-300 transition-colors"
                  >
                    {game.title}
                  </Link>
                  <span
                    className={`text-[13px] px-3 py-1 rounded-full border font-medium inline-flex items-center gap-1.5 ${
                      statusStyles[game.status].badge
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${statusStyles[game.status].dot}`}
                    />
                    {statusStyles[game.status].label}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[13px] text-slate-400">
                  <span className="font-mono bg-blue-950/70 border border-blue-900/50 px-2.5 py-1 rounded-md text-blue-300">
                    {game.platform}
                  </span>
                  <span>{game.estimatedHours} ชั่วโมง ⏱ </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
                <div className="flex items-center gap-1 p-1 bg-slate-950/80 border border-slate-800 rounded-xl">
                  {(
                    ["not-started", "in-progress", "completed"] as GameStatus[]
                  ).map((st) => {
                    const isActive = game.status === st;
                    return (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleQuickStatusChange(game.id, st)}
                        className={`px-2.5 py-1.5 rounded-lg text-[13px] font-regualr transition-all cursor-pointer ${
                          isActive
                            ? statusStyles[st].activeBtn
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {statusStyles[st].label}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingId(game.id)}
                    className="px-3.5 py-2 text-[13px] font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl transition-all active:scale-95 cursor-pointer"
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(game.id)}
                    className="px-3.5 py-2 text-[13px] font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-xl transition-all active:scale-95 cursor-pointer"
                  >
                    ลบ
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>

      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-[20px] font-bold text-white">
              ยืนยันการลบเกม ?
            </h3>
            <p className="text-[15px] text-slate-400 leading-relaxed">
              คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้ออกจากระบบการดำเนินการนี้ไม่สามารถเรียกคืนได้
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2.5 text-[15px] font-semibold text-slate-300 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleExecuteDelete}
                className="px-4 py-2.5 text-[15px] font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-colors cursor-pointer shadow-md shadow-rose-600/20"
              >
                ยืนยันการลบ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
