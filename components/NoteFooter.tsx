"use client";
import { useEffect, useState } from "react";
import type { Config } from "@/lib/types";

export default function NoteFooter() {
  const [cfg, setCfg] = useState<Config | null>(null);

  useEffect(() => {
    fetch("/api/config", { cache: "no-store" })
      .then((r) => r.json())
      .then(setCfg)
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6 pb-10">
      <div className="bg-amber-100 border border-amber-200 rounded-2xl shadow-soft p-6 text-sm leading-relaxed">
        <div className="font-black text-amber-900 mb-2">◆ Lưu ý</div>
        <ul className="list-disc pl-5 space-y-2 text-amber-900">
          {(cfg?.noteBox || []).map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
        <div className="mt-4 space-y-1">
          <div><b>Zalo:</b> <a className="text-blue-700 underline" href={cfg?.contacts?.zalo || "#"} target="_blank">{cfg?.contacts?.zalo || "-"}</a></div>
          <div><b>Telegram:</b> <a className="text-blue-700 underline" href={cfg?.contacts?.telegram || "#"} target="_blank">{cfg?.contacts?.telegram || "-"}</a></div>
        </div>
      </div>

      <footer className="bg-gradient-to-r from-sky-700 to-blue-700 text-white rounded-2xl shadow-soft py-4 text-center font-semibold">
        Copyright © {new Date().getFullYear()} by Meilian.xyz
      </footer>
    </div>
  );
}
