import CourseExplorer from "../components/CourseExplorer";
import { courses } from "../data/coursedata";

export const metadata = {
  title: "รายวิชาทั้งหมด | CourseHub",
};

export default function CoursePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto mb-8 text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
          รายวิชาทั้งหมด
        </h1>
      </div>

      <CourseExplorer initialCourses={courses} />
    </main>
  );
}
