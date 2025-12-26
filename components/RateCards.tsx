"use client";
import { useEffect, useState } from "react";
import type { Rates } from "@/lib/types";

export default function RateCards() {
  const [rates, setRates] = useState<Rates>({ buy: 0, sell: 0, topup: 0 });

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/config", { cache: "no-store" });
      const data = await res.json();
      setRates(data.rates);
    };
    load();
    const t = setInterval(load, 30000);
    return () => clearInterval(t);
  }, []);

  const Card = ({ label, value }: { label: string; value: number }) => (
    <div className="rounded-2xl bg-gradient-to-b from-sky-600 to-blue-700 text-white shadow-soft px-5 py-6 text-center">
      <div className="text-lg font-extrabold">{label}</div>
      <div className="mt-2 text-3xl font-black">{value.toLocaleString("vi-VN")} VND</div>
    </div>
  );

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card label="Mua vào" value={rates.buy} />
      <Card label="Bán ra" value={rates.sell} />
      <Card label="Topup/Game" value={rates.topup} />
    </div>
  );
}
