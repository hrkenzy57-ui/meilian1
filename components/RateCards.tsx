"use client";
import { useEffect, useState } from "react";
import type { Rates } from "@/lib/types";

export default function RateCards() {
  const [rates, setRates] = useState<Rates>({ buy: 0, sell: 0, topup: 0 });

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/rates", { cache: "no-store" });
      const data = await res.json();
      if (data?.ok && data?.rates) setRates(data.rates);
    };

    load();
    const t = setInterval(load, 30000);
    return () => clearInterval(t);
  }, []);

  // ✅ GIỮ logic cộng/trừ phí như bạn đang thấy
  const buy = rates.buy + 0;
  const sell = rates.sell + 50;
  const topup = rates.topup + 20;

  const Card = ({ label, value }: { label: string; value: number }) => (
    <div className="rounded-2xl bg-gradient-to-b from-sky-600 to-blue-700 text-white shadow-soft px-5 py-6 text-center">
      <div className="text-lg font-extrabold">{label}</div>
      <div className="mt-2 text-3xl font-black">
        {value.toLocaleString("vi-VN")} VND
      </div>
    </div>
  );

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card label="Mua vào" value={buy} />
      <Card label="Bán ra" value={sell} />
      <Card label="Topup/Game" value={topup} />
    </div>
  );
}
