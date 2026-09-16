"use client";

import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import type { Game, Platform, GameStatus } from "../type/game";

export type GameDraft = {
  title: string;
  platform: Platform | "";
  estimatedHours: string;
  status: GameStatus;
};

export type GameFormErrors = Partial<Record<keyof GameDraft, string>>;

const emptyDraft: GameDraft = {
  title: "",
  platform: "",
  estimatedHours: "",
  status: "not-started",
};

type GameFormProps = {
  initialGame?: Game;
  onSave: (draft: GameDraft) => void;
  onCancel?: () => void;
};

const statusOptions: {
  value: GameStatus;
  label: string;
  dotColor: string;
  activeClass: string;
}[] = [
  {
    value: "not-started",
    label: "ยังไม่เริ่ม",
    dotColor: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]",
    activeClass:
      "border-amber-500/50 bg-amber-500/10 text-amber-300 shadow-md shadow-amber-500/10",
  },
  {
    value: "in-progress",
    label: "กำลังเล่น",
    dotColor: "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]",
    activeClass:
      "border-blue-500/50 bg-blue-500/10 text-blue-300 shadow-md shadow-blue-500/10",
  },
  {
    value: "completed",
    label: "เล่นจบแล้ว",
    dotColor: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]",
    activeClass:
      "border-emerald-500/50 bg-emerald-500/10 text-emerald-300 shadow-md shadow-emerald-500/10",
  },
];

function toDraft(game?: Game): GameDraft {
  if (!game) return emptyDraft;
  return {
    title: game.title,
    platform: game.platform,
    estimatedHours: String(game.estimatedHours),
    status: game.status,
  };
}

function validate(draft: GameDraft): GameFormErrors {
  const errors: GameFormErrors = {};
  if (draft.title.trim() === "") errors.title = "กรุณาระบุชื่อเกม";
  if (draft.platform === "") errors.platform = "กรุณาเลือกแพลตฟอร์ม";
  const hours = Number(draft.estimatedHours);
  if (!Number.isInteger(hours) || hours <= 0) {
    errors.estimatedHours = "จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก (มากกว่า 0)";
  }
  return errors;
}

export default function GameForm({
  initialGame,
  onSave,
  onCancel,
}: GameFormProps) {
  const [draft, setDraft] = useState<GameDraft>(toDraft(initialGame));
  const [errors, setErrors] = useState<GameFormErrors>({});

  useEffect(() => {
    setDraft(toDraft(initialGame));
    setErrors({});
  }, [initialGame]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  function handleStatusSelect(status: GameStatus) {
    setDraft((prev) => ({ ...prev, status }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-xs font-semibold text-slate-300 uppercase tracking-wider"
        >
          ชื่อเกม
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="เช่น Cyberpunk 2077, Elden Ring"
          value={draft.title}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border text-slate-100 placeholder-slate-500 text-sm transition-all focus:outline-none focus:ring-2 ${
            errors.title
              ? "border-rose-500 focus:ring-rose-500/20"
              : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/20"
          }`}
        />
        {errors.title && (
          <p className="text-rose-400 text-xs font-medium">{errors.title}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label
            htmlFor="platform"
            className="block text-xs font-semibold text-slate-300 uppercase tracking-wider"
          >
            แพลตฟอร์ม
          </label>
          <select
            id="platform"
            name="platform"
            value={draft.platform}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border text-slate-100 text-sm transition-all focus:outline-none focus:ring-2 ${
              errors.platform
                ? "border-rose-500 focus:ring-rose-500/20"
                : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/20"
            }`}
          >
            <option value="">-- เลือกแพลตฟอร์ม --</option>
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="Mobile">Mobile</option>
          </select>
          {errors.platform && (
            <p className="text-rose-400 text-xs font-medium">
              {errors.platform}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="estimatedHours"
            className="block text-xs font-semibold text-slate-300 uppercase tracking-wider"
          >
            เวลาเล่นโดยประมาณ (ชั่วโมง)
          </label>
          <input
            id="estimatedHours"
            name="estimatedHours"
            type="number"
            min="1"
            placeholder="เช่น 50"
            value={draft.estimatedHours}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border text-slate-100 placeholder-slate-500 text-sm transition-all focus:outline-none focus:ring-2 ${
              errors.estimatedHours
                ? "border-rose-500 focus:ring-rose-500/20"
                : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/20"
            }`}
          />
          {errors.estimatedHours && (
            <p className="text-rose-400 text-xs font-medium">
              {errors.estimatedHours}
            </p>
          )}
        </div>
      </div>
      
      <div className="space-y-2.5">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          สถานะการเล่น
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {statusOptions.map((option) => {
            const isSelected = draft.status === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleStatusSelect(option.value)}
                className={`py-3 px-4 rounded-xl border text-sm font-medium flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer active:scale-95 ${
                  isSelected
                    ? option.activeClass
                    : "border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-all ${
                    isSelected ? option.dotColor : "bg-slate-600"
                  }`}
                />
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ปุ่มบันทึก/ยกเลิก */}
      <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-95 cursor-pointer"
        >
          {initialGame ? "บันทึกการแก้ไข" : "เพิ่มเกมเข้า Backlog"}
        </button>
        {initialGame && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition-all active:scale-95 cursor-pointer"
          >
            ยกเลิก
          </button>
        )}
      </div>
    </form>
  );
}
