import Image from "next/image";

export default function Home() {
  
  const siteName: string = "Student Course Hub";
  const isOpen: boolean = true;
  const topics: string[] = [
    "HTML",
    "CSS",
    "TypeScript",
    "Next.js",
  ];

  type Course = {
    id: number;
    code: string;
    title: string;
    credits: number;
    isOpen: boolean;
  };

  const courses: Course[] = [
    {
      id: 1,
      code: "10301231",
      title: "Web Technology",
      credits: 3,
      isOpen: true,
    },
    {
      id: 2,
      code: "10301232",
      title: "Database Systems",
      credits: 3,
      isOpen: false,
    },
  ];

  
  return (
    <main className="page">
      <h1>{siteName}</h1>

      <p>จำนวนรายวิชา: {courses.length}</p>

      <p>
        สถานะระบบ: {isOpen ? "เปิดใช้งาน" : "ปิดใช้งาน"}
        
      </p>

      <br/>
      <h2>
        <strong>หัวข้อที่เรียน</strong>
      </h2>

      <ul>
        {topics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>

      <section className="courseGrid">
        {courses.map((course) => (
          <article key={course.id} className="courseCard">
            <h2>{course.title}</h2>
            <br/>
            <p><strong>รหัสวิชา: </strong>{course.code}</p>

            <p>{course.credits} หน่วยกิต</p>

            {/* เพิ่มส่วน Style กำหนดสีที่ตรงนี้ครับ */}
            <p style={{ color: course.isOpen ? "green" : "red", fontWeight: "bold" }}>
              {course.isOpen
                ? "เปิดลงทะเบียน"
                : "ปิดลงทะเบียน"}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}