"use client";
import { useEffect, useMemo, useState } from "react";

export default function ClockTitle({ title }: { title: string }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const display = useMemo(() => {
    const pad = (n: number) => String(n).padStart(2, "0");
    const d = now;
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} ${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()}`;
  }, [now]);

  return (
    <div className="text-center py-8">
      <h1 className="text-3xl md:text-5xl font-black tracking-tight">{title}</h1>
      <div className="mt-3 text-2xl md:text-3xl font-semibold text-slate-800">{display}</div>
    </div>
  );
}
