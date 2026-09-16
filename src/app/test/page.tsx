"use client";

import { useState, ChangeEvent, FormEvent } from "react";

export type CourseDraft = {
  code: string;
  name: string;
  credit: string;
  instructor: string;
};

const emptyDraft: CourseDraft = {
  code: "",
  name: "",
  credit: "",
  instructor: "",
};

export default function CoursePage() {
  const [draft, setDraft] = useState<CourseDraft>(emptyDraft);
  const [submittedData, setSubmittedData] = useState<CourseDraft | null>(null);

  // ฟังก์ชัน handle เมื่อพิมพ์ในช่อง input แต่ละช่อง
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setDraft((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // ฟังก์ชันเมื่อกดปุ่มบันทึก
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedData(draft);
  }

  return (
    <main style={{ maxWidth: "480px", margin: "40px auto", padding: "16px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>แบบฟอร์มรายวิชา</h1>

      <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div>
          <label htmlFor="code" style={{ display: "block", marginBottom: "4px" }}>รหัสวิชา</label>
          <input
            id="code"
            name="code"
            type="text"
            value={draft.code}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div>
          <label htmlFor="name" style={{ display: "block", marginBottom: "4px" }}>ชื่อวิชา</label>
          <input
            id="name"
            name="name"
            type="text"
            value={draft.name}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div>
          <label htmlFor="credit" style={{ display: "block", marginBottom: "4px" }}>หน่วยกิต</label>
          <input
            id="credit"
            name="credit"
            type="number"
            inputMode="numeric"
            min="1"
            max="6"
            value={draft.credit}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div>
          <label htmlFor="instructor" style={{ display: "block", marginBottom: "4px" }}>ผู้สอน</label>
          <input
            id="instructor"
            name="instructor"
            type="text"
            value={draft.instructor}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          บันทึก
        </button>
      </form>

      {/* กล่อง Debug เช็คดูค่าที่พิมพ์ */}
      <div style={{ marginTop: "24px", padding: "12px", background: "#f3f4f6", borderRadius: "6px" }}>
        <p style={{ margin: 0, fontWeight: "bold" }}>ค่าใน State ตอนนี้:</p>
        <pre style={{ margin: "8px 0 0", fontSize: "13px" }}>{JSON.stringify(draft, null, 2)}</pre>
      </div>

      {/* แสดงข้อมูลที่กดบันทึกแล้ว */}
      {submittedData && (
        <div style={{ marginTop: "16px", padding: "12px", background: "#ecfdf5", border: "1px solid #10b981", borderRadius: "6px" }}>
          <p style={{ margin: 0, fontWeight: "bold", color: "#065f46" }}>บันทึกเรียบร้อย:</p>
          <pre style={{ margin: "8px 0 0", fontSize: "13px" }}>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </main>
  );
}

// WORD หน้า 8