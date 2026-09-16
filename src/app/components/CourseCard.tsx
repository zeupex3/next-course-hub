import Link from "next/link";
import type { Course } from "../type/coures";

type CourseCardProps = {
  course: Course;
  onEdit: () => void;
  onDelete: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
};

export default function CourseCard({
  course,
  onEdit,
  onDelete,
  isFavorite,
  onToggleFavorite,
}: CourseCardProps) {
  return (
    <article className="group relative p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 backdrop-blur-sm transition-all duration-200 flex flex-col justify-between">
      <div className="space-y-3">
        {/*รหัสวิชา หน่วยกิต */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-mono text-blue-400 bg-blue-950/70 border border-blue-900/50 px-2.5 py-1 rounded-md font-semibold tracking-wide">
            {course.code}
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700 font-medium">
            {course.credit} หน่วยกิต
          </span>
        </div>

        {/* ชื่อวิชา */}
        <h2 className="text-[20px] font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
          <Link href={`/courses/${course.id}`}>{course.name}</Link>
        </h2>

        {/* ผู้สอน */}
        <div className="flex items-center gap-2 text-[13px] text-slate-400">
          <span className="text-slate-500 font-medium">ผู้สอน:</span>
          <span className="text-slate-300 font-medium">
            {course.instructor}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2.5">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="flex-1 py-2 px-3.5 text-[13px] font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl transition-all active:scale-95 cursor-pointer"
          >
            แก้ไข
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="flex-1 py-2 px-3.5 text-[13px] font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-xl transition-all active:scale-95 cursor-pointer"
          >
            ลบ
          </button>
        </div>

        {onToggleFavorite && (
          <button
            type="button"
            aria-pressed={isFavorite}
            onClick={() => onToggleFavorite(course.id)}
            className={`group/fav w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer border select-none transition-all duration-200 active:scale-95 ${
              isFavorite
                ? "bg-blue-600 hover:bg-blue-500 text-white border-blue-400/50 shadow-md shadow-blue-500/20"
                : "bg-slate-950/60 hover:bg-blue-950/40 text-slate-300 border-slate-800 hover:border-blue-500/40"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className={`w-3.5 h-3.5 transition-all duration-200 group-hover/fav:scale-110 ${
                isFavorite
                  ? "scale-110 fill-amber-300 stroke-amber-300"
                  : "scale-100 fill-transparent stroke-current text-slate-400 group-hover/fav:text-blue-300"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
            <span>
              {isFavorite ? "อยู่ในรายการโปรด" : "เพิ่มเป็นรายการโปรด"}
            </span>
          </button>
        )}
      </div>
    </article>
  );
}
