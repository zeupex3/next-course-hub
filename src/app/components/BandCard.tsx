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
    <article className="group h-full bg-slate-50/70 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:bg-white hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between">
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight group-hover:text-emerald-800 transition-colors">
              {band.name}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                {band.genre}
              </span>
              <span className="text-sm text-gray-600 font-small">
                ก่อตั้งปี {band.formedYear}
              </span>
            </div>
          </div>

          <span className="shrink-0 px-3 py-1.5 rounded-lg text-sm font-regular bg-gray-100 text-gray-700 border border-gray-200">
            {band.members.length} สมาชิก
          </span>
        </div>

        <div className="relative w-full h-56 my-4 rounded-xl overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-100">
          <Image
            src={band.imageUrl}
            alt={band.name}
            fill
            className="object-contain p-2 hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            type="button"
            onClick={() => onLike(band.id)}
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-base font-bold border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 active:scale-95 transition-all cursor-pointer select-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 fill-rose-500 stroke-rose-500"
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
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-base font-bold transition-all active:scale-95 cursor-pointer select-none border ${
              isFollowing
                ? "bg-emerald-900 border-emerald-900 text-white shadow-sm hover:bg-emerald-950"
                : "bg-white border-emerald-800 text-emerald-800 hover:bg-emerald-50"
            }`}
          >
            {isFollowing ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 stroke-current stroke-2"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>ติดตามแล้ว</span>
              </>
            ) : (
              <>
                <span className="text-lg leading-none font-bold">+</span>
                <span>ติดตาม</span>
              </>
            )}
          </button>
        </div>

        <div className="my-5 border-t border-gray-100" />

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
            สมาชิกในวง
          </h3>

          <div className="space-y-3">
            {band.members.map((member, index) => (
              <div
                key={index}
                className="flex items-center gap-3.5 p-3 rounded-xl bg-gray-50/80 border border-gray-100 hover:bg-emerald-50/50 hover:border-emerald-100 transition-colors"
              >
                {member.imageUrl ? (
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-white shadow-xs shrink-0">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg shrink-0">
                    {member.name[0]}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-m text-gray-900 text-base truncate">
                    {member.name}
                  </p>
                  <p className="text-sm text-emerald-700 font-regular truncate mt-0.5">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}