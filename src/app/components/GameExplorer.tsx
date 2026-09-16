"use client";

import { useState, type ChangeEvent } from "react";
import Link from "next/link";
import type { Game, GameStatus, Platform } from "../type/game";
import GameForm, { type GameDraft } from "./GameForm";

type GameExplorerProps = {
  initialGames: Game[];
};

const statusLabels: Record<GameStatus, string> = {
  "not-started": "ยังไม่เริ่ม",
  "in-progress": "กำลังเล่น",
  completed: "เล่นจบแล้ว",
};

export default function GameExplorer({ initialGames = [] }: GameExplorerProps) {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Derived State: คำนวณชั่วโมงรวมเฉพาะเกมที่ "ยังไม่เริ่ม"
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

  // ลัดขั้นตอน: เปลี่ยนสถานะได้โดยตรง
  function handleQuickStatusChange(id: string, newStatus: GameStatus) {
    setGames(games.map((g) => (g.id === id ? { ...g, status: newStatus } : g)));
  }

  // ดำเนินการลบเมื่อยืนยัน
  function handleExecuteDelete() {
    if (confirmDeleteId) {
      setGames(games.filter((g) => g.id !== confirmDeleteId));
      if (editingId === confirmDeleteId) setEditingId(null);
      setConfirmDeleteId(null);
    }
  }

  const editingGame = games.find((g) => g.id === editingId);

  // กรองทั้งจากคำค้นและสถานะ
  const visibleGames = games.filter((game) => {
    const matchesKeyword = game.title
      .toLowerCase()
      .includes(keyword.trim().toLowerCase());
    const matchesStatus =
      statusFilter === "all" || game.status === statusFilter;
    return matchesKeyword && matchesStatus;
  });

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "16px" }}>
      {/* ส่วนสรุปเวลา Derived State */}
      <section
        style={{
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          padding: "12px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <strong>เวลาที่ต้องใช้สำหรับเกมที่ยังไม่เริ่มทั้งหมด:</strong>{" "}
        {totalUnstartedHours} ชั่วโมง
      </section>

      {/* ฟอร์ม */}
      <section
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "24px",
        }}
      >
        <h2>{editingGame ? "แก้ไขรายการเกม" : "เพิ่มเกมใหม่"}</h2>
        <GameForm
          key={editingId ?? "new"}
          initialGame={editingGame}
          onSave={handleSave}
          onCancel={() => setEditingId(null)}
        />
      </section>

      {/* ค้นหาและคัดกรอง */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <input
          type="search"
          placeholder="ค้นหาชื่อเกม..."
          value={keyword}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setKeyword(e.target.value)
          }
          style={{ flex: 1, padding: "8px" }}
        />
        <select
          value={statusFilter}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setStatusFilter(e.target.value)
          }
          style={{ padding: "8px" }}
        >
          <option value="all">สถานะทั้งหมด</option>
          <option value="not-started">ยังไม่เริ่ม</option>
          <option value="in-progress">กำลังเล่น</option>
          <option value="completed">เล่นจบแล้ว</option>
        </select>
      </div>

      {/* รายการเกม */}
      <section style={{ display: "grid", gap: "12px" }}>
        {visibleGames.length === 0 ? (
          <p>ไม่พบรายการเกม</p>
        ) : (
          visibleGames.map((game) => (
            <article
              key={game.id}
              style={{
                border: "1px solid #e5e7eb",
                padding: "16px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3 style={{ margin: "0 0 4px" }}>
                  <Link
                    href={`/games/${game.id}`}
                    style={{ color: "#2563eb", textDecoration: "none" }}
                  >
                    {game.title}
                  </Link>
                </h3>
                <p style={{ margin: "2px 0", color: "#666" }}>
                  {game.platform} | เวลาเล่นโดยประมาณ: {game.estimatedHours} ชม.
                </p>
                <div style={{ marginTop: "6px" }}>
                  <label>สถานะ: </label>
                  <select
                    value={game.status}
                    onChange={(e) =>
                      handleQuickStatusChange(
                        game.id,
                        e.target.value as GameStatus,
                      )
                    }
                  >
                    <option value="not-started">ยังไม่เริ่ม</option>
                    <option value="in-progress">กำลังเล่น</option>
                    <option value="completed">เล่นจบแล้ว</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => setEditingId(game.id)}>แก้ไข</button>
                <button
                  onClick={() => setConfirmDeleteId(game.id)}
                  style={{ color: "red" }}
                >
                  ลบ
                </button>
              </div>
            </article>
          ))
        )}
      </section>

      {/* กล่องยืนยันการลบ */}
      {confirmDeleteId && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "24px",
              borderRadius: "8px",
              width: "320px",
            }}
          >
            <h3>ยืนยันการลบเกม?</h3>
            <p>คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?</p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
                marginTop: "16px",
              }}
            >
              <button onClick={() => setConfirmDeleteId(null)}>ยกเลิก</button>
              <button
                onClick={handleExecuteDelete}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "4px",
                }}
              >
                ลบข้อมูล
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
