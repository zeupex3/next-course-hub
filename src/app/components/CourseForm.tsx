"use client";

import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import type { Course } from "../type/coures";

// ส่วนที่ 1: Type สำหรับฟอร์ม
export type CourseDraft = {
  code: string;
  name: string;
  credit: string;
  instructor: string;
};

export type FormErrors = Partial<Record<keyof CourseDraft, string>>;

const emptyDraft: CourseDraft = {
  code: "",
  name: "",
  credit: "",
  instructor: "",
};

// ส่วนที่ 2: Props และฟังก์ชันแปลง Course -> CourseDraft
type CourseFormProps = {
  initialCourse?: Course;
  onSave: (draft: CourseDraft) => void;
  onCancel?: () => void;
};

function toDraft(course?: Course): CourseDraft {
  if (!course) {
    return emptyDraft;
  }

  return {
    code: course.code,
    name: course.name,
    credit: String(course.credit),
    instructor: course.instructor,
  };
}

// ส่วนที่ 4: ฟังก์ชันตรวจสอบความถูกต้อง (Validation)
function validate(value: CourseDraft): FormErrors {
  const nextErrors: FormErrors = {};

  if (value.code.trim() === "") {
    nextErrors.code = "กรุณาระบุรหัสวิชา";
  }

  if (value.name.trim() === "") {
    nextErrors.name = "กรุณาระบุชื่อวิชา";
  }

  const credit = Number(value.credit);
  if (!Number.isInteger(credit) || credit < 1 || credit > 6) {
    nextErrors.credit = "หน่วยกิตต้องเป็นจำนวนเต็มตั้งแต่ 1 ถึง 6";
  }

  return nextErrors;
}

// ส่วนที่ 3: Component หลักของแบบฟอร์ม
export default function CourseForm({
  initialCourse,
  onSave,
  onCancel,
}: CourseFormProps) {
  const [draft, setDraft] = useState<CourseDraft>(toDraft(initialCourse));
  const [errors, setErrors] = useState<FormErrors>({});

  // ซิงค์ข้อมูลเข้าช่องกรอกเมื่อเปลี่ยนวิชาที่เลือกแก้ไข
  useEffect(() => {
    setDraft(toDraft(initialCourse));
    setErrors({});
  }, [initialCourse]);

  // ส่วนที่ 5: ฟังก์ชันจัดการเหตุการณ์ (Event Handlers)
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setDraft((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(draft);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
  }

  // ส่วนที่ 6: return แสดงผลฟอร์ม
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="code">รหัสวิชา</label>
        <input
          id="code"
          name="code"
          type="text"
          value={draft.code}
          onChange={handleChange}
          aria-invalid={!!errors.code}
          aria-describedby={errors.code ? "code-error" : undefined}
        />
        {errors.code ? (
          <p id="code-error" style={{ color: "red" }}>
            {errors.code}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="name">ชื่อวิชา</label>
        <input
          id="name"
          name="name"
          type="text"
          value={draft.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name ? (
          <p id="name-error" style={{ color: "red" }}>
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="credit">หน่วยกิต</label>
        <input
          id="credit"
          name="credit"
          type="number"
          inputMode="numeric"
          min="1"
          max="6"
          value={draft.credit}
          onChange={handleChange}
          aria-invalid={!!errors.credit}
          aria-describedby={errors.credit ? "credit-error" : undefined}
        />
        {errors.credit ? (
          <p id="credit-error" style={{ color: "red" }}>
            {errors.credit}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="instructor">ผู้สอน</label>
        <input
          id="instructor"
          name="instructor"
          type="text"
          value={draft.instructor}
          onChange={handleChange}
          aria-invalid={!!errors.instructor}
          aria-describedby={errors.instructor ? "instructor-error" : undefined}
        />
        {errors.instructor ? (
          <p id="instructor-error" style={{ color: "red" }}>
            {errors.instructor}
          </p>
        ) : null}
      </div>

      <div>
        <button type="submit">บันทึก</button>
        {initialCourse ? (
          <button type="button" onClick={onCancel}>
            ยกเลิก
          </button>
        ) : null}
      </div>
    </form>
  );
}