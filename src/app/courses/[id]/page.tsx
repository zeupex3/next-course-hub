import type { Metadata } from "next";
import { courses } from "../../data/coursedata";

type CoursePageProps = {
  params: Promise<{ id: string }>;
};

// ฟังก์ชันสร้าง Metadata แบบไดนามิกตามข้อมูลรายวิชาจริง
export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { id } = await params;
  const course = courses.find((item) => item.id === id);

  return {
    title: course ? course.name : "ไม่พบรายวิชา",
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = courses.find((item) => item.id === id);

  if (!course) {
    return <h1>ไม่พบข้อมูลรายวิชา</h1>;
  }

  return (
    <main style={{ padding: "20px" }}>
      <h1>{course.name}</h1>
      <p>รหัสวิชา: {course.code}</p>
      <p>หน่วยกิต: {course.credit}</p>
      <p>ผู้สอน: {course.instructor}</p>
    </main>
  );
}
