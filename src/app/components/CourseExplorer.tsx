"use client";

import { useState, type ChangeEvent } from "react";
import type { Course } from "../type/coures";
import CourseForm, { type CourseDraft } from "./CourseForm";
import CourseCard from "./CourseCard";

type CourseExplorerProps = {
  initialCourses?: Course[];
};

export default function CourseExplorer({
  initialCourses = [],
}: CourseExplorerProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [keyword, setKeyword] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Derived State: คำนวณหน่วยกิตรวมทั้งหมด
  const totalCredits = courses.reduce((sum, c) => sum + (c.credit || 0), 0);

  function handleCreate(draft: CourseDraft) {
    const newCourse: Course = {
      id: crypto.randomUUID(),
      code: draft.code.trim(),
      name: draft.name.trim(),
      credit: Number(draft.credit),
      instructor: draft.instructor.trim(),
    };
    setCourses([...courses, newCourse]);
  }

  function handleDelete(id: string) {
    setCourses(courses.filter((course) => course.id !== id));
    if (editingId === id) setEditingId(null);
    if (confirmDeleteId === id) setConfirmDeleteId(null);
  }

  function handleUpdate(id: string, draft: CourseDraft) {
    setCourses(
      courses.map((course) =>
        course.id === id
          ? {
              ...course,
              code: draft.code.trim(),
              name: draft.name.trim(),
              credit: Number(draft.credit),
              instructor: draft.instructor.trim(),
            }
          : course,
      ),
    );
    setEditingId(null);
  }

  function handleSave(draft: CourseDraft) {
    if (editingId === null) {
      handleCreate(draft);
      return;
    }
    handleUpdate(editingId, draft);
  }

  const editingCourse = courses.find((course) => course.id === editingId);

  const searchText = keyword.trim().toLowerCase();
  const visibleCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchText) ||
      course.code.toLowerCase().includes(searchText),
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      <section className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900/60 via-slate-900 to-indigo-950/80 border border-blue-500/30 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            หน่วยกิตรวมในระบบ
          </h2>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-4xl sm:text-5xl font-black text-blue-400">
            {totalCredits}
          </span>
          <span className="text-slate-400 text-sm ml-2 font-medium">
            หน่วยกิต ({courses.length} วิชา)
          </span>
        </div>
      </section>

      <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm shadow-xl shadow-blue-950/20 space-y-6">
        <div className="flex items-center gap-3 pb-2 border-b border-slate-800/80">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
          <h2 className="text-[15px] sm:text-[20px] font-bold text-white tracking-tight">
            {editingCourse ? "แก้ไขข้อมูลรายวิชา" : "เพิ่มรายวิชาใหม่"}
          </h2>
        </div>

        <CourseForm
          key={editingId ?? "new"}
          initialCourse={editingCourse}
          onSave={handleSave}
          onCancel={() => setEditingId(null)}
        />
      </section>

      {/* ค้นหารายวิชา */}
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
            id="search"
            type="search"
            placeholder="ค้นหาตามชื่อวิชา หรือ รหัสวิชา..."
            value={keyword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setKeyword(e.target.value)
            }
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner"
          />
        </div>

        <div className="text-xs text-slate-400 font-mono self-end sm:self-center px-2">
          พบทั้งหมด{" "}
          <span className="text-blue-400 font-bold">
            {visibleCourses.length}
          </span>{" "}
          รายการ
        </div>
      </div>

      {/* การ์ดรายวิชา */}
      <section className="space-y-4">
        {visibleCourses.length === 0 ? (
          <div className="text-center py-20 px-4 rounded-3xl border border-dashed border-slate-800 bg-slate-950/40 text-slate-500 text-sm">
            ไม่พบรายวิชาที่ตรงกับคำค้นหา
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
            {visibleCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEdit={() => setEditingId(course.id)}
                onDelete={() => setConfirmDeleteId(course.id)}
              />
            ))}
          </div>
        )}
      </section>

      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-[20px] font-bold text-white">
              ยืนยันการลบรายวิชา?
            </h3>
            <p className="text-[15px] text-slate-400 leading-relaxed">
              คุณแน่ใจหรือไม่ว่าต้องการลบรายวิชานี้ออกจากระบบ
              การดำเนินการนี้ไม่สามารถเรียกคืนได้
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2.5 text-[15px] font-semibold text-slate-300 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
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
