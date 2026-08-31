type Course = {
  code: string;
  title: string;
  credits: number;
  isOpen: boolean;
};

type CourseCardProps = {
  course: Course;
};

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="courseCard">
      <h2>{course.title}</h2>
      <br/>
      <p><strong>รหัสวิชา: </strong>{course.code}</p>
      <p>{course.credits} หน่วยกิต</p>
      <p style={{ color: course.isOpen ? "green" : "red", fontWeight: "bold" }}>
        {course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}
      </p>
    </article>
  );
}