import Link from "next/link";

type Course = {
  id: number;
  code: string;
  title: string;
  credits: number;
  isOpen: boolean;
};

export default function Home() {
  const siteName: string = "Student Course Hub";
  const isOpen: boolean = true;
  const topics: string[] = ["HTML", "CSS", "TypeScript", "Next.js"];

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
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 sm:px-10 py-12 relative overflow-hidden">
      <div className="absolute top-10 left-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        <header className="relative rounded-3xl bg-slate-900/20 backdrop-blur-2xl p-8 sm:p-10 overflow-hidden transition-all duration-500">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-white/[0.04] text-blue-400 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.9)] animate-pulse" />
                Computer Science
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-sm">
                {siteName}
              </h1>
              <p className="text-slate-400 text-sm sm:text-base font-medium leading-relaxed">
                ศูนย์กลางรวบรวมรายวิชาและความรู้สายเทคโนโลยี
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] shadow-xl self-start lg:self-center">
              <div className="space-y-1 px-1 sm:px-2">
                <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase block">
                  COURSES
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl font-bold font-mono text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.4)]">
                    {courses.length}
                  </span>
                  <span className="text-xs font-mono text-slate-500 uppercase">
                    ITEMS
                  </span>
                </div>
              </div>

              {/*Status*/}
              <div className="space-y-1 px-1 sm:px-2 border-l border-white/10 pl-4 sm:pl-6">
                <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase block">
                  STATUS
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      isOpen
                        ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse"
                        : "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.9)]"
                    }`}
                  />
                  <span
                    className={`text-lg sm:text-xl font-bold font-mono tracking-wider ${
                      isOpen ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {isOpen ? "ONLINE" : "OFFLINE"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="space-y-3 px-2">
          <h2 className="text-[13px] font-mono font-semibold tracking-widest text-blue-400 uppercase">
            LEARNING STACK
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {topics.map((topic) => (
              <span
                key={topic}
                className="px-4 py-1.5 rounded-full text-xs sm:text-[15px] font-mono font-medium bg-white/[0.03] text-slate-200 backdrop-blur-md border border-white/[0.05] hover:border-blue-500/40 hover:text-white transition-all cursor-default shadow-xs"
              >
                {topic}
              </span>
            ))}
          </div>
        </section>

        {/*Course Grid*/}
        <section className="space-y-5">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              รายวิชาที่เปิดสอน
            </h2>
            <Link
              href="/courses"
              className="text-xs sm:text-sm font-mono font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              VIEW ALL COURSES →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {courses.map((course) => (
              <article
                key={course.id}
                className="group relative p-7 rounded-3xl bg-slate-900/20 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:bg-slate-900/30">
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-500" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs sm:text-sm font-mono font-semibold text-blue-400 tracking-wider">
                      {course.code}
                    </span>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium inline-flex items-center gap-1.5 ${
                        course.isOpen
                          ? "bg-emerald-500/10 text-emerald-300"
                          : "bg-rose-500/10 text-rose-300"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          course.isOpen
                            ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                            : "bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.8)]"
                        }`}
                      />
                      {course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors drop-shadow-sm leading-snug">
                    {course.title}
                  </h3>
                </div>

                <div className="relative z-10 mt-7 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono">
                    หน่วยกิต :{" "}
                    <strong className="text-slate-[100] font-bold ml-1">
                      {course.credits}
                    </strong>
                  </span>
                  <Link
                    href={`/courses/${course.id}`}
                    className="text-xs font-mono font-semibold text-blue-400 group-hover:text-blue-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>DETAILS</span>
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
