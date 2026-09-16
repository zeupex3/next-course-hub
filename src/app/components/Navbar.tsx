"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "หน้าแรก" },
  { href: "/courses", label: "รายวิชา" },
  { href: "/bands", label: "วงดนตรีโปรด" },
  { href: "/game", label: "เกม" },
  { href: "/about", label: "เกี่ยวกับ" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-500/20 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 group font-bold text-lg text-white tracking-tight"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 group-hover:shadow-[0_0_12px_#3b82f6] transition-all" />
          <span className="font-mono text-blue-400">&lt;</span>
          <span className="group-hover:text-blue-300 transition-colors">
            CourseHub
          </span>
          <span className="font-mono text-blue-400">/&gt;</span>
        </Link>

        <nav aria-label="เมนูหลัก">
          <ul className="flex items-center gap-1 sm:gap-2">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-blue-300 bg-blue-900/40 border border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.15)]"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/80"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
