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
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
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
    band.name.toLowerCase().includes(keyword.trim().toLowerCase())
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
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-50/80 rounded-2xl border border-gray-200/80">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <input
            type="search"
            aria-label="ค้นหาชื่อวงดนตรี"
            value={keyword}
            onChange={handleKeywordChange}
            placeholder="ค้นหาชื่อวงดนตรี..."
            className="w-full max-w-sm px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all shadow-sm text-sm"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "name" | "year" | "default")}
            className="px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent shadow-sm cursor-pointer"
          >
            <option value="default">เรียงตามปกติ</option>
            <option value="name">เรียงตามชื่อวง (A-Z)</option>
            <option value="year">เรียงตามปีที่ก่อตั้ง</option>
          </select>

          {(keyword !== "" || sortBy !== "default") && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-600 text-sm font-semibold hover:bg-gray-100 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              ล้างเงื่อนไข
            </button>
          )}
        </div>

        <div className="text-emerald-800 font-bold text-sm bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200 shadow-xs">
          กำลังติดตาม: <span className="font-extrabold">{followingIds.length}</span> วง
        </div>
      </div>

      {visibleBands.length === 0 ? (
        <div className="text-center py-16 px-4 bg-gray-50 rounded-2xl border border-gray-100 text-gray-500">
          <p className="text-lg font-semibold">ไม่พบวงดนตรีที่ตรงกับเงื่อนไขการค้นหา</p>
        </div>
      ) : (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
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
        </section>
      )}
    </div>
  );
}