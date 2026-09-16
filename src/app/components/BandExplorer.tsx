"use client";

import { useState, type ChangeEvent } from "react";
import type { Band } from "../type/band";
import BandCard from "./BandCard";

type BandExplorerProps = {
  bands: Band[];
};

export default function BandExplorer({ bands }: BandExplorerProps) {
  const [keyword, setKeyword] = useState<string>("");
  const [followingIds, setFollowingIds] = useState<number[]>([]);
  const [likesMap, setLikesMap] = useState<Record<number, number>>({});
  const [sortBy, setSortBy] = useState<"name" | "year" | "default">("default");

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleToggleFollow(id: number) {
    setFollowingIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }

  function handleLike(id: number) {
    setLikesMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  }

  function handleResetFilters() {
    setKeyword("");
    setSortBy("default");
  }

  const filteredBands = bands.filter((band) =>
    band.name.toLowerCase().includes(keyword.trim().toLowerCase()),
  );

  const visibleBands = [...filteredBands].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "year") {
      return (a.formedYear ?? 0) - (b.formedYear ?? 0);
    }
    return 0;
  });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10">
      <section className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900/60 via-slate-900 to-indigo-950/80 border border-blue-500/30 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            วงดนตรีที่คุณกำลังติดตาม
          </h2>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-4xl sm:text-5xl font-black text-blue-400">
            {followingIds.length}
          </span>
          <span className="text-slate-400 text-sm ml-2 font-medium">
            วง (จาก {bands.length} วง)
          </span>
        </div>
      </section>

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
            aria-label="ค้นหาชื่อวงดนตรี"
            value={keyword}
            onChange={handleKeywordChange}
            placeholder="ค้นหาชื่อวงดนตรี..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner"
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "name" | "year" | "default")
          }
          className="px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
        >
          <option value="default">เรียงตามปกติ</option>
          <option value="name">เรียงตามชื่อวง (A-Z)</option>
          <option value="year">เรียงตามปีที่ก่อตั้ง</option>
        </select>

        {(keyword !== "" || sortBy !== "default") && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-all active:scale-95 cursor-pointer"
          >
            ล้างเงื่อนไข
          </button>
        )}
      </div>

      <section className="space-y-4">
        {visibleBands.length === 0 ? (
          <div className="text-center py-20 px-4 rounded-3xl border border-dashed border-slate-800 bg-slate-950/40 text-slate-500 text-sm">
            ไม่พบวงดนตรีที่ตรงกับเงื่อนไขการค้นหา
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {visibleBands.map((band) => (
              <BandCard
                key={band.id}
                band={band}
                isFollowing={followingIds.includes(band.id)}
                onToggleFollow={handleToggleFollow}
                likes={likesMap[band.id] || 0}
                onLike={handleLike}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
