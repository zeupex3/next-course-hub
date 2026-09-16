import type { Metadata } from "next";
import BandExplorer from "../components/BandExplorer";
import { bands } from "../data/bandData";

export const metadata: Metadata = {
  title: "วงดนตรีโปรด | CourseHub",
};

export default function BandsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto mb-8 text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
          My Favorite Bands
        </h1>
      </div>

      <BandExplorer bands={bands} />
    </main>
  );
}
