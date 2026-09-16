"use client";

import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import type { Course } from "../type/coures";

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

type CourseFormProps = {
  initialCourse?: Course;
  onSave: (draft: CourseDraft) => void;
  onCancel?: () => void;
};

function toDraft(course?: Course): CourseDraft {
  if (!course) return emptyDraft;
  return {
    code: course.code,
    name: course.name,
    credit: String(course.credit),
    instructor: course.instructor,
  };
}

function validate(value: CourseDraft): FormErrors {
  const nextErrors: FormErrors = {};
  if (value.code.trim() === "") nextErrors.code = "กรุณาระบุรหัสวิชา";
  if (value.name.trim() === "") nextErrors.name = "กรุณาระบุชื่อวิชา";
  const credit = Number(value.credit);
  if (!Number.isInteger(credit) || credit < 1 || credit > 6) {
    nextErrors.credit = "หน่วยกิตต้องเป็นจำนวนเต็มตั้งแต่ 1 ถึง 6";
  }
  return nextErrors;
}

export default function CourseForm({
  initialCourse,
  onSave,
  onCancel,
}: CourseFormProps) {
  const [draft, setDraft] = useState<CourseDraft>(toDraft(initialCourse));
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setDraft(toDraft(initialCourse));
    setErrors({});
  }, [initialCourse]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
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
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* รหัสวิชา หน่วยกิต */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label
            htmlFor="code"
            className="block text-xs font-semibold text-slate-300 uppercase tracking-wider"
          >
            รหัสวิชา
          </label>
          <input
            id="code"
            name="code"
            type="text"
            placeholder="เช่น CS101, 10301231"
            value={draft.code}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border text-slate-100 placeholder-slate-500 text-sm font-mono transition-all focus:outline-none focus:ring-2 ${
              errors.code
                ? "border-rose-500 focus:ring-rose-500/20"
                : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/20"
            }`}
          />
          {errors.code && (
            <p className="text-rose-400 text-xs font-medium">{errors.code}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="credit"
            className="block text-xs font-semibold text-slate-300 uppercase tracking-wider"
          >
            หน่วยกิต (1 - 6)
          </label>
          <input
            id="credit"
            name="credit"
            type="number"
            min="1"
            max="6"
            placeholder="เช่น 3"
            value={draft.credit}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border text-slate-100 placeholder-slate-500 text-sm transition-all focus:outline-none focus:ring-2 ${
              errors.credit
                ? "border-rose-500 focus:ring-rose-500/20"
                : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/20"
            }`}
          />
          {errors.credit && (
            <p className="text-rose-400 text-xs font-medium">{errors.credit}</p>
          )}
        </div>
      </div>

      {/* ชื่อวิชา */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-xs font-semibold text-slate-300 uppercase tracking-wider"
        >
          ชื่อวิชา
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="เช่น Web Technology, Database Systems"
          value={draft.name}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border text-slate-100 placeholder-slate-500 text-sm transition-all focus:outline-none focus:ring-2 ${
            errors.name
              ? "border-rose-500 focus:ring-rose-500/20"
              : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/20"
          }`}
        />
        {errors.name && (
          <p className="text-rose-400 text-xs font-medium">{errors.name}</p>
        )}
      </div>

      {/* ผู้สอน */}
      <div className="space-y-2">
        <label
          htmlFor="instructor"
          className="block text-xs font-semibold text-slate-300 uppercase tracking-wider"
        >
          อาจารย์ผู้สอน
        </label>
        <input
          id="instructor"
          name="instructor"
          type="text"
          placeholder="เช่น ดร. สมชาย ใจดี"
          value={draft.instructor}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border text-slate-100 placeholder-slate-500 text-sm transition-all focus:outline-none focus:ring-2 ${
            errors.instructor
              ? "border-rose-500 focus:ring-rose-500/20"
              : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/20"
          }`}
        />
        {errors.instructor && (
          <p className="text-rose-400 text-xs font-medium">
            {errors.instructor}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-95 cursor-pointer"
        >
          {initialCourse ? "บันทึกการแก้ไข" : "บันทึกรายวิชา"}
        </button>
        {initialCourse && (
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
