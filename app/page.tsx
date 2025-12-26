"use client";

import ClockTitle from "@/components/ClockTitle";
import RateCards from "@/components/RateCards";
import TierBox from "@/components/TierBox";
import NoteFooter from "@/components/NoteFooter";
import { useEffect, useState } from "react";

export default function Home() {
  const [remoteRates, setRemoteRates] = useState<{
    buy: number;
    sell: number;
    topup: number;
  } | null>(null);

  const [ratesStatus, setRatesStatus] = useState<
    "idle" | "loading" | "ok" | "error"
  >("idle");

  async function fetchRates() {
    try {
      setRatesStatus("loading");
      const res = await fetch("/api/rates", { cache: "no-store" });
      const data = await res.json();
      if (data?.ok && data?.rates) {
        setRemoteRates({
          buy: Number(data.rates.buy ?? 0),
          sell: Number(data.rates.sell ?? 0),
          topup: Number(data.rates.topup ?? 0),
        });
        setRatesStatus("ok");
      } else {
        setRatesStatus("error");
      }
    } catch (e) {
      setRatesStatus("error");
    }
  }

  useEffect(() => {
    fetchRates();
    const t = setInterval(fetchRates, 60_000);
    return () => clearInterval(t);
  }, []);

  const buy = remoteRates?.buy;
  const sell = remoteRates?.sell;
  const topup = remoteRates?.topup;

  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <ClockTitle title="Tỷ giá quy đổi tại Meilian.xyz" />
        <RateCards />
        <div className="mt-10">
          <TierBox />
        </div>
        <div className="mt-10" id="lien-he">
          <NoteFooter />
        </div>
      </div>
    </main>
  );
}
