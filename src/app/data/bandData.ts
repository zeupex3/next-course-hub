import { Band } from "../type/band";

export const bands: Band[] = [
  {
    id: 1,
    name: "Loso",
    genre: "Rock",
    imageUrl: "https://images.genius.com/090ff430a164f084312b187b7032afaf.530x530x1.png",
    members: [
      { name: "เสก", role: "นักร้องนำ" },
      { name: "เสก", role: "กีตาร์" },
      { name: "รัฐ", role: "เบส" },
      { name: "ใหญ่", role: "กลอง" },
    ],
  },
  {
    id: 2,
    name: "SillyFool",
    genre: "Rock",
    imageUrl: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12e0692c-ea98-4e48-b816-43e352068f3b/dfxf5lg-1b073aa5-43c7-4ab1-9156-f1aed346c8e5.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi8xMmUwNjkyYy1lYTk4LTRlNDgtYjgxNi00M2UzNTIwNjhmM2IvZGZ4ZjVsZy0xYjA3M2FhNS00M2M3LTRhYjEtOTE1Ni1mMWFlZDM0NmM4ZTUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.GMA-o0H5ECwkRkEA-o9_mcpeD-ZRgkudeviGjOuvc48",
    members: [
      { name: "โต", role: "นักร้องนำ" },
      { name: "ต้น", role: "กีตาร์" },
      { name: "ต่อ", role: "กลอง" },
      { name: "หรั่ง", role: "มือเบส" },
    ],
  },
  {
    id: 3,
    name: "Solitude is Bliss",
    genre: "Psychedelic Rock",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSyOHUH3NRwLtp4Lk7kevgb8goekVcK4MnYK386f7-H9ZsCQSfdjvzT7Hk&s=10",
    members: [
      { name: "เฟน", role: "นักร้องนำ" },
      { name: "เบียร์", role: "กีตาร์" },
      { name: "โด่ง", role: "เบส" },
      { name: "อาร์ท", role: "กลอง" },
    ],
  },
];