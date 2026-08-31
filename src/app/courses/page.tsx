import CourseCard from "../components/CourseCard";
import { courses } from "../data/coursedata";

export default function CoursePage() {
  return (
    <main className="page">
      <div className="courseGrid">
        {courses.map((course) => (
          <CourseCard key={course.code} course={course} />
        ))}
      </div>
    </main>
  );
}