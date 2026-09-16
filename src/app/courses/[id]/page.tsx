import Link from "next/link";
import { notFound } from "next/navigation";
import { courses } from "@/app/data/coursedata";

type CourseDetailProps = {
  params: Promise<{ id: string }>;
};

export default async function CourseDetailPage({ params }: CourseDetailProps) {
  const { id } = await params;
  const course = courses.find(
    (item) =>
      String(item.id) === id || item.code?.toLowerCase() === id.toLowerCase(),
  );

  if (!course) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 sm:px-10 py-12 relative overflow-hidden">
      <div className="absolute top-10 left-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-blue-400 hover:text-blue-300 transition-colors">
          <span>←</span>
          <span>BACK TO COURSES</span>
        </Link>

        <header className="relative rounded-3xl bg-slate-900/20 backdrop-blur-2xl p-8 sm:p-10 border border-white/[0.05] overflow-hidden space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono font-bold text-blue-400 px-3 py-1 rounded-lg bg-blue-950/60 border border-blue-500/30">
                {course.code}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {course.credit} หน่วยกิต
              </span>
            </div>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              เปิดการเรียนการสอน
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-sm">
            {course.name}
          </h1>

          {course.instructor && (
            <p className="text-sm sm:text-base text-slate-400 font-mono">
              อาจารย์ผู้สอน :{" "}
              <span className="text-slate-200 font-sans font-semibold">
                {course.instructor}
              </span>
            </p>
          )}
        </header>
      </div>
    </main>
  );
}
