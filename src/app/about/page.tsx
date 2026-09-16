import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา | CourseHub",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            About Project
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm mt-6 mb-3">
            เกี่ยวกับเรา
          </h1>

          <p className="text-slate-400 text-sm sm:text-base">
            ศูนย์กลางข้อมูลรายวิชาและบันทึกคลังเกมสำหรับนักศึกษา
          </p>
        </div>
      </div>
    </main>
  );
}
