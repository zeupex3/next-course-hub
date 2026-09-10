"use client";

import { useState, type ChangeEvent } from "react";
import type { Course } from "../type/coures";
import CourseCard from "./CourseCard";

type CourseExplorerProps = {
  courses: Course[];
};

export default function CourseExplorer({ courses }: CourseExplorerProps) {
  const [keyword, setKeyword] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleToggleFavorite(id: number) {
    setFavoriteIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((favoriteId) => favoriteId !== id)
        : [...prevIds, id]
    );
  }

  const searchText = keyword.trim().toLowerCase();
  const visibleCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchText) ||
      course.code.toLowerCase().includes(searchText)
  );

  return (
    <>
      <div className="mb-8 mt-2">
        <input
          type="search"
          aria-label="ค้นหารายวิชา"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อวิชาหรือรหัสวิชา"
          className="w-full max-w-sm px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all shadow-sm"
        />
      </div>

      {visibleCourses.length === 0 ? (
        <p className="text-gray-500 py-4">ไม่พบรายวิชาที่ตรงกับเงื่อนไข</p>
      ) : (
        <section className="courseGrid">
          {visibleCourses.map((course) => (
            <CourseCard key={course.code} course={course}
              isFavorite={favoriteIds.includes(course.id)}
              onToggleFavorite={() => handleToggleFavorite(course.id)}
            />
          ))}
        </section>
      )}
    </>
  );
}