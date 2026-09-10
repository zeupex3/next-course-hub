import type { Course } from "../type/coures";

type CourseCardProps = {
  course: Course;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
};

export default function CourseCard({ course, isFavorite, onToggleFavorite }: CourseCardProps) {
  return (
    <article className="courseCard">
      <h2>{course.title}</h2>
      <br />
      <p><strong>รหัสวิชา: </strong>{course.code}</p>
      <p>{course.credits} หน่วยกิต</p>
      <p style={{ color: course.isOpen ? "green" : "red", fontWeight: "bold" }}>
        {course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}
      </p>

      <button
        type="button"
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite(course.id)}
        className={`group w-full mt-4 py-2.5 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 cursor-pointer border select-none transition-all duration-200 ease-out active:scale-95 hover:-translate-y-0.5 hover:shadow-md ${
          isFavorite
            ? "bg-[#14532d] hover:bg-[#0f3f22] text-white border-transparent shadow-sm"
            : "bg-white hover:bg-emerald-50 text-[#14532d] border-[#14532d]"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className={`w-4 h-4 transition-all duration-300 ease-out group-hover:scale-115 ${
            isFavorite
              ? "scale-110 fill-amber-300 stroke-amber-300"
              : "scale-100 fill-transparent stroke-current group-hover:fill-emerald-100"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>

        <span className="tracking-wide">
          {isFavorite ? "อยู่ในรายการโปรด" : "เพิ่มเป็นรายการโปรด"}
        </span>
      </button>
    </article>
  );
}