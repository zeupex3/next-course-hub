"use client";

import { useState, type ChangeEvent } from "react";
import type { Course } from "../type/coures";
import CourseForm, { type CourseDraft } from "./CourseForm";
import CourseCard from "./CourseCard";

// ส่วนที่ 3: Type ของ Props และ State ตั้งต้น
type CourseExplorerProps = {
  initialCourses: Course[];
};

export default function CourseExplorer({
  initialCourses,
}: CourseExplorerProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [keyword, setKeyword] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // ส่วนที่ 5: ฟังก์ชันจัดการข้อมูล (CRUD)
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
    if (editingId === id) {
      setEditingId(null);
    }
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

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  const searchText = keyword.trim().toLowerCase();
  const visibleCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchText) ||
      course.code.toLowerCase().includes(searchText),
  );

  // ส่วนที่ 6: return แสดงผล
  return (
    <div>
      <section className="formSection">
        <CourseForm
          key={editingId ?? "new"}
          initialCourse={editingCourse}
          onSave={handleSave}
          onCancel={() => setEditingId(null)}
        />
      </section>

      <div className="searchBar">
        <label htmlFor="search">ค้นหารายวิชา: </label>
        <input
          id="search"
          type="search"
          placeholder="ค้นหาชื่อวิชาหรือรหัสวิชา"
          value={keyword}
          onChange={handleKeywordChange}
        />
      </div>

      <section className="courseGrid">
        {visibleCourses.length === 0 ? (
          <p>ไม่พบรายวิชาที่ตรงกับเงื่อนไข</p>
        ) : (
          visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={() => setEditingId(course.id)}
              onDelete={() => handleDelete(course.id)}
            />
          ))
        )}
      </section>
    </div>
  );
}
