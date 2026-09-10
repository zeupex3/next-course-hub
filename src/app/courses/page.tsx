import CourseExplorer from "../components/CourseExplorer";
import { courses } from "../data/coursedata";

export const metadata = {
  title: "รายวิชาทั้งหมด",
};

export default function CoursePage() {
  return (
    <main className="page py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">รายวิชาทั้งหมด</h1>
      <CourseExplorer courses={courses} />
    </main>
  );
}