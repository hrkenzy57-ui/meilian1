"use client";
import { useEffect, useState } from "react";
import type { Config } from "@/lib/types";

export default function HeaderBlue() {
  const [cfg, setCfg] = useState<Config | null>(null);
  useEffect(() => {
    fetch("/api/config", { cache: "no-store" }).then((r) => r.json()).then(setCfg).catch(() => {});
  }, []);

  return (
    <header className="bg-gradient-to-r from-sky-700 to-blue-700 text-white shadow-soft">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-2xl font-black">¥</div>
          <div>
            <div className="font-extrabold tracking-wide leading-tight">{cfg?.siteName || "MEILIAN TỶ GIÁ"}</div>
            <div className="text-xs opacity-90">Cập nhật nhanh • Chính xác • Tham khảo</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          {(cfg?.menu || []).map((m) => (
            <a key={m.href} href={m.href} className="opacity-95 hover:opacity-100 hover:underline">{m.label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}
