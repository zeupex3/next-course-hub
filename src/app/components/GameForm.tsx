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

  if (draft.title.trim() === "") {
    errors.title = "กรุณากรอกชื่อเกม";
  }

  if (draft.platform === "") {
    errors.platform = "กรุณาเลือกแพลตฟอร์ม";
  }

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
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{ display: "grid", gap: "12px" }}
    >
      <div>
        <label htmlFor="title">ชื่อเกม: </label>
        <input
          id="title"
          name="title"
          type="text"
          value={draft.title}
          onChange={handleChange}
        />
        {errors.title && (
          <p style={{ color: "red", margin: "4px 0" }}>{errors.title}</p>
        )}
      </div>

      <div>
        <label htmlFor="platform">แพลตฟอร์ม: </label>
        <select
          id="platform"
          name="platform"
          value={draft.platform}
          onChange={handleChange}
        >
          <option value="">-- เลือกแพลตฟอร์ม --</option>
          <option value="PC">PC</option>
          <option value="PlayStation">PlayStation</option>
          <option value="Xbox">Xbox</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
          <option value="Mobile">Mobile</option>
        </select>
        {errors.platform && (
          <p style={{ color: "red", margin: "4px 0" }}>{errors.platform}</p>
        )}
      </div>

      <div>
        <label htmlFor="estimatedHours">จำนวนชั่วโมงที่คาดว่าจะใช้เล่น: </label>
        <input
          id="estimatedHours"
          name="estimatedHours"
          type="number"
          min="1"
          value={draft.estimatedHours}
          onChange={handleChange}
        />
        {errors.estimatedHours && (
          <p style={{ color: "red", margin: "4px 0" }}>
            {errors.estimatedHours}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="status">สถานะ: </label>
        <select
          id="status"
          name="status"
          value={draft.status}
          onChange={handleChange}
        >
          <option value="not-started">ยังไม่เริ่ม</option>
          <option value="in-progress">กำลังเล่น</option>
          <option value="completed">เล่นจบแล้ว</option>
        </select>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button type="submit">
          {initialGame ? "บันทึกการแก้ไข" : "เพิ่มเกม"}
        </button>
        {initialGame && (
          <button type="button" onClick={onCancel}>
            ยกเลิก
          </button>
        )}
      </div>
    </form>
  );
}
