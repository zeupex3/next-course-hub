import Image from "next/image";
import type { Band } from "../type/band";

type BandCardProps = {
  band: Band;
  isFollowing: boolean;
  onToggleFollow: (id: number) => void;
  likes: number;
  onLike: (id: number) => void;
};

export default function BandCard({
  band,
  isFollowing,
  onToggleFollow,
  likes,
  onLike,
}: BandCardProps) {
  return (
    <article className="group relative rounded-3xl bg-slate-900/20 backdrop-blur-2xl transition-all duration-500 p-6 sm:p-8 flex flex-col justify-between gap-6 overflow-hidden">
      <div className="absolute -top-16 -left-16 w-56 h-56 bg-blue-600/15 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/25 transition-all duration-700" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex items-center gap-4 min-w-0">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl bg-white/[0.03] backdrop-blur-xl p-2.5 shadow-lg shadow-black/20 group-hover:scale-105 transition-transform duration-300">
          <Image
            src={band.imageUrl}
            alt={band.name}
            fill
            className="object-contain p-1"
          />
        </div>

        <div className="min-w-0 space-y-1.5">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)] animate-pulse" />
              <span className="text-xs font-mono tracking-widest uppercase text-blue-400 font-semibold">
                {band.genre}
              </span>
            </div>

            <span className="text-slate-700 font-mono select-none px-1">•</span>

            <span className="text-xs text-slate-400 font-mono tracking-wide">
              EST. {band.formedYear}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight truncate group-hover:text-blue-300 transition-colors drop-shadow-sm">
            {band.name}
          </h2>
        </div>
      </div>

      {/* Members*/}
      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400/80 font-mono px-1">
          <span>LINEUP</span>
          <span>{band.members.length} MEMBERS</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {band.members.map((member, index) => (
            <div
              key={index}
              className="group/member relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-950/40 shadow-xl transition-all duration-300"
            >
              {member.imageUrl ? (
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  className="object-cover object-top group-hover/member:scale-105 transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-950/40 to-slate-950 flex items-center justify-center font-bold text-4xl text-blue-400/80">
                  {member.name[0]}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col justify-end">
                <p className="font-bold text-white text-[20px] truncate group-hover/member:text-blue-300 transition-colors drop-shadow-md">
                  {member.name}
                </p>
                <span className="text-[13px] font-mono text-blue-400 tracking-wider uppercase truncate mt-0.5 drop-shadow-sm">
                  {member.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-3 pt-2">
        <button
          type="button"
          onClick={() => onLike(band.id)}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs font-semibold bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 active:scale-95 transition-all cursor-pointer backdrop-blur-md select-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 fill-rose-500 stroke-rose-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>{likes} ถูกใจ</span>
        </button>

        <button
          type="button"
          onClick={() => onToggleFollow(band.id)}
          aria-pressed={isFollowing}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs font-semibold transition-all active:scale-95 cursor-pointer backdrop-blur-md select-none ${
            isFollowing
              ? "bg-blue-600/90 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500"
              : "bg-white/[0.05] text-slate-300 hover:bg-white/[0.1] hover:text-white"
          }`}
        >
          {isFollowing ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 stroke-current stroke-2"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>กำลังติดตาม</span>
            </>
          ) : (
            <>
              <span className="text-base leading-none font-bold">+</span>
              <span>ติดตาม</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
