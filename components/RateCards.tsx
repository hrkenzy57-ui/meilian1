"use client";
import { useEffect, useState } from "react";
import type { Rates } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function RateCards() {
  const router = useRouter();

  const [rates, setRates] = useState<Omit<Rates, "topup">>({
    buy: 0,
    sell: 0,
  });

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/rates", { cache: "no-store" });
      const data = await res.json();
      if (data?.ok && data?.rates) {
        setRates({
          buy: Number(data.rates.buy ?? 0),
          sell: Number(data.rates.sell ?? 0),
        });
      }
    };

    load();
    const t = setInterval(load, 30000);
    return () => clearInterval(t);
  }, []);

  // ✅ GIỮ logic cộng/trừ phí như bạn đang thấy
  const buy = rates.buy + 0;
  const sell = rates.sell + 50;

  // ✅ Hàm nhảy xuống box quy đổi (scroll chắc chắn)
  const goToConvert = (mode: "buy" | "sell") => {
    // ✅ query trước, hash sau (đúng chuẩn)
    router.push(`/?mode=${mode}#quy-doi`);

    // ✅ force scroll để chắc chắn luôn nhảy
    setTimeout(() => {
      document.getElementById("quy-doi")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const Card = ({
    label,
    value,
    mode,
  }: {
    label: string;
    value: number;
    mode: "buy" | "sell";
  }) => (
    <button
      type="button"
      onClick={() => goToConvert(mode)}
      className="rounded-2xl bg-gradient-to-b from-sky-600 to-blue-700 text-white shadow-soft px-5 py-6 text-center hover:opacity-95 transition w-full"
    >
      <div className="text-lg font-extrabold">{label}</div>
      <div className="mt-2 text-3xl font-black">
        {value.toLocaleString("vi-VN")} VND
      </div>
      <div className="mt-2 text-sm opacity-90 font-semibold">
        Bấm để tính quy đổi ↓
      </div>
    </button>
  );

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* ✅ Mua vào => mở tab Bán tệ (VND → CNY) */}
      <Card label="Mua vào" value={buy} mode="sell" />

      {/* ✅ Bán ra => mở tab Mua tệ (CNY → VND) */}
      <Card label="Bán ra" value={sell} mode="buy" />
    </div>
  );
}
