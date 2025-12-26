"use client";
import { useEffect, useMemo, useState } from "react";
import type { Tier } from "@/lib/types";

export default function TierBox() {
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [warning, setWarning] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    fetch("/api/config", { cache: "no-store" })
      .then((r) => r.json())
      .then((cfg) => {
        setTiers(cfg.tiers || []);
        setWarning(cfg.warning || "");
      })
      .catch(() => {});
  }, []);

  const pickTier = useMemo(() => {
    const n = parseFloat(amount);
    if (!n || !tiers.length) return null;
    if (n < 50) return tiers[0];
    if (n >= 51 && n <= 499) return tiers[1] || tiers[0];
    if (n >= 500 && n <= 999) return tiers[2] || tiers[0];
    if (n >= 1000 && n <= 2000) return tiers[3] || tiers[0];
    return tiers[4] || tiers[tiers.length - 1];
  }, [amount, tiers]);

  const calc = () => {
    const n = parseFloat(amount);
    if (!n || !pickTier) return setResult("");
    const vnd = n * pickTier.rate + (pickTier.fee || 0);
    setResult(vnd.toLocaleString("vi-VN") + " VND");
  };

  return (
    <div className="bg-amber-100 rounded-2xl shadow-soft p-6 space-y-4">
      <div className="text-red-700 font-bold">{warning}</div>

      <div className="bg-gradient-to-b from-sky-600 to-blue-700 rounded-2xl p-5 text-white">
        <ul className="space-y-2">
          {tiers.map((t, i) => (
            <li key={i} className="bg-white/15 rounded-xl px-4 py-3 font-semibold">
              {t.label}: <span className="font-black">{t.rate.toLocaleString("vi-VN")}</span>
              {t.fee ? <span className="opacity-90"> (+{t.fee.toLocaleString("vi-VN")}đ phí)</span> : null}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="flex items-center gap-2">
            <span className="font-bold">Nhập số ¥:</span>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Ví dụ: 688"
              className="w-40 rounded-xl px-3 py-2 text-slate-900"
            />
          </div>

          <button onClick={calc} className="rounded-xl bg-white text-blue-700 font-extrabold px-5 py-2 shadow-soft">
            Tính tiền
          </button>

          {result && (
            <div className="font-black text-lg md:text-xl">
              = <span className="underline">{result}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
