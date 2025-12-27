"use client";
import { useEffect, useMemo, useState } from "react";
import type { Tier } from "@/lib/types";
import { useRouter } from "next/navigation";

type TierWithRange = Tier & { min?: number; max?: number };

// sell tier theo VND
type SellTier = {
  label: string;
  minVnd: number;
  maxVnd: number;
  rate: number;
};

function parseRangeFromLabel(label: string) {
  const text = label.toLowerCase();

  const between = text.match(/từ\s+(\d+)\s*¥?\s*-\s*(\d+)\s*¥?/);
  if (between) return { min: Number(between[1]), max: Number(between[2]) };

  const above = text.match(/trên\s+(\d+)\s*¥?/);
  if (above) return { min: Number(above[1]), max: Infinity };

  const below = text.match(/dưới\s+(\d+)\s*¥?/);
  if (below) return { min: 0, max: Number(below[1]) };

  const single = text.match(/(\d+)\s*¥/);
  if (single) {
    const n = Number(single[1]);
    return { min: n, max: n };
  }

  return null;
}

export default function TierBox() {
  const router = useRouter();

  // ✅ mode: buy = CNY -> VND (mua tệ), sell = VND -> CNY (bán tệ)
  const [mode, setMode] = useState<"buy" | "sell">("buy");

  const [tiers, setTiers] = useState<Tier[]>([]);
  const [sellTiers, setSellTiers] = useState<SellTier[]>([]);
  const [warning, setWarning] = useState("");

  const [amount, setAmount] = useState(""); // amount nhập
  const [result, setResult] = useState("");

  // Payment config từ /api/config
  const [payCfg, setPayCfg] = useState<any>(null);

  // Modal state
  const [showPay, setShowPay] = useState(false);
  const [payAmount, setPayAmount] = useState<number>(0);
  const [payContent, setPayContent] = useState<string>("");
  const [copied, setCopied] = useState<string>("");

  // ✅ Kết quả CNY khi bán
  const [sellCny, setSellCny] = useState<number>(0);
  const [sellRate, setSellRate] = useState<number>(0);

  useEffect(() => {
    fetch("/api/config", { cache: "no-store" })
      .then((r) => r.json())
      .then((cfg) => {
        setTiers(cfg.tiers || []);
        setSellTiers(cfg.sellTiers || []);
        setWarning(cfg.warning || "");
        setPayCfg(cfg.payment || null);
      })
      .catch(() => {});
  }, []);

  // ✅ Convert buy tiers => tiersWithRange (tự parse min/max)
  const tiersWithRange: TierWithRange[] = useMemo(() => {
    const mapped = (tiers || []).map((t) => {
      const range = t.label ? parseRangeFromLabel(t.label) : null;
      return { ...t, min: range?.min, max: range?.max };
    });
    mapped.sort((a, b) => (a.min ?? 0) - (b.min ?? 0));
    return mapped;
  }, [tiers]);

  // ✅ Pick tier theo min/max cho BUY
  const pickBuyTier = useMemo(() => {
    const n = parseFloat(amount);
    if (!n || !tiersWithRange.length) return null;

    return (
      tiersWithRange.find((t) => {
        const min = t.min ?? 0;
        const max = t.max ?? Infinity;
        return n >= min && n <= max;
      }) || tiersWithRange[0]
    );
  }, [amount, tiersWithRange]);

  // ✅ Pick tier theo VND cho SELL
  const pickSellTier = useMemo(() => {
    const vnd = parseFloat(amount);
    if (!vnd || !sellTiers.length) return null;

    return (
      sellTiers.find((t) => vnd >= t.minVnd && vnd <= t.maxVnd) || sellTiers[0]
    );
  }, [amount, sellTiers]);

  const formatVND = (n: number) => n.toLocaleString("vi-VN") + " VND";

  const buildContent = (vnd: number) => {
    const tpl = payCfg?.contentTemplate || "Thanh toán {VND}";
    return tpl
      .replaceAll("{YEN}", amount || "")
      .replaceAll("{VND}", Math.round(vnd).toString());
  };

  // ✅ Tính toán
  const calc = () => {
    const n = parseFloat(amount);
    if (!n) return setResult("");

    // ✅ BUY: CNY -> VND (mua tệ)
    if (mode === "buy") {
      if (!pickBuyTier) return setResult("");
      const vnd = n * pickBuyTier.rate + (pickBuyTier.fee || 0);

      setResult(formatVND(vnd));
      setPayAmount(Math.round(vnd));
      setPayContent(buildContent(vnd));
      setSellCny(0);
      setSellRate(0);
    }

    // ✅ SELL: VND -> CNY (bán tệ)
    if (mode === "sell") {
      if (!pickSellTier) return setResult("");

      const rate = pickSellTier.rate;
      const cny = n / rate;

      setSellRate(rate);
      setSellCny(cny);
      setResult(
        `${formatVND(n)} (Áp dụng: ${rate.toLocaleString("vi-VN")}đ/CNY) ≈ ${cny.toFixed(
          2
        )} CNY`
      );

      // ✅ bán tệ không cần payment modal
      setPayAmount(0);
      setPayContent("");
    }
  };

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(""), 1500);
    } catch {}
  };

  return (
    <div className="bg-amber-100 rounded-2xl shadow-soft p-6 space-y-4">
      <div className="text-red-700 font-bold">{warning}</div>

      {/* ✅ Mode Switch */}
      <div className="flex gap-2">
        <button
          onClick={() => {
            setMode("buy");
            setAmount("");
            setResult("");
          }}
          className={`px-4 py-2 rounded-xl font-black ${
            mode === "buy" ? "bg-blue-700 text-white" : "bg-white text-blue-700"
          }`}
        >
          Mua tệ (CNY → VND)
        </button>

        <button
          onClick={() => {
            setMode("sell");
            setAmount("");
            setResult("");
          }}
          className={`px-4 py-2 rounded-xl font-black ${
            mode === "sell"
              ? "bg-green-700 text-white"
              : "bg-white text-green-700"
          }`}
        >
          Bán tệ (VND → CNY)
        </button>
      </div>

      <div className="bg-gradient-to-b from-sky-600 to-blue-700 rounded-2xl p-5 text-white">
        {/* ✅ HIỂN THỊ BẢNG THEO MODE */}
        {mode === "buy" && (
          <ul className="space-y-2">
            {tiersWithRange.map((t, i) => (
              <li
                key={i}
                className="bg-white/15 rounded-xl px-4 py-3 font-semibold"
              >
                {t.label}:{" "}
                <span className="font-black">
                  {t.rate.toLocaleString("vi-VN")}
                </span>
                {t.fee ? (
                  <span className="opacity-90">
                    {" "}
                    (+{t.fee.toLocaleString("vi-VN")}đ phí)
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        )}

        {mode === "sell" && (
          <ul className="space-y-2">
            {(sellTiers || []).map((t, i) => (
              <li
                key={i}
                className="bg-white/15 rounded-xl px-4 py-3 font-semibold"
              >
                {t.label}:{" "}
                <span className="font-black">
                  {t.rate.toLocaleString("vi-VN")}
                </span>{" "}
                đ/CNY
              </li>
            ))}
          </ul>
        )}

        {/* ✅ INPUT + BUTTON */}
        <div className="mt-5 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="flex items-center gap-2">
            <span className="font-bold">
              {mode === "buy" ? "Nhập số ¥:" : "Nhập số VND:"}
            </span>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={mode === "buy" ? "Ví dụ: 688" : "Ví dụ: 5000000"}
              className="w-48 rounded-xl px-3 py-2 text-slate-900"
            />
          </div>

          <button
            onClick={calc}
            className="rounded-xl bg-white text-blue-700 font-extrabold px-5 py-2 shadow-soft"
          >
            Tính toán
          </button>
        </div>

        {/* ✅ RESULT */}
        {result && (
          <div className="mt-4 font-black text-lg md:text-xl text-center bg-white/10 rounded-xl py-4 px-3">
            {result}
          </div>
        )}

        {/* ✅ NÚT “Đi bán tệ” (mode sell) */}
        {mode === "sell" && result && sellCny > 0 && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => router.push("/gioi-thieu")}
              className="rounded-xl bg-green-600 text-white font-black px-6 py-3 shadow-soft hover:opacity-95"
            >
              Đi Bán tệ với {sellCny.toFixed(2)} CNY ngay »
            </button>
          </div>
        )}

        {/* ✅ NÚT THANH TOÁN (chỉ mode BUY) */}
        {mode === "buy" && result && payAmount > 0 && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setShowPay(true)}
              className="rounded-xl bg-amber-200 text-slate-900 font-black px-5 py-2 shadow-soft hover:opacity-95"
            >
              Thanh toán ở đây
            </button>
          </div>
        )}
      </div>

      {/* ✅ MODAL THANH TOÁN (giữ nguyên, chỉ mở khi BUY) */}
      {showPay && mode === "buy" && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-soft max-w-md w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={() => setShowPay(false)}
              aria-label="Close"
            >
              ✕
            </button>

            <div className="text-xl font-black text-slate-900">Thanh toán</div>
            <div className="text-sm text-slate-500 mt-1">
              Vui lòng chuyển khoản đúng thông tin bên dưới
            </div>

            <div className="mt-4 space-y-2 text-slate-700 text-sm">
              <div>
                <b>Ngân hàng:</b> {payCfg?.bankName || "-"}
              </div>

              <div>
                <b>Chủ tài khoản:</b> {payCfg?.accountName || "-"}
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="truncate">
                  <b>Số tài khoản:</b> {payCfg?.accountNumber || "-"}
                </div>
                {payCfg?.accountNumber && (
                  <button
                    onClick={() => copy(payCfg.accountNumber, "STK")}
                    className="px-3 py-1 rounded-lg bg-slate-100 text-slate-900 font-bold"
                  >
                    Copy
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between gap-3">
                <div>
                  <b>Số tiền:</b>{" "}
                  <span className="text-red-600 font-black">
                    {payAmount.toLocaleString("vi-VN")} VND
                  </span>
                </div>
                <button
                  onClick={() => copy(String(payAmount), "Số tiền")}
                  className="px-3 py-1 rounded-lg bg-slate-100 text-slate-900 font-bold"
                >
                  Copy
                </button>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="truncate">
                  <b>Nội dung:</b> {payContent || "-"}
                </div>
                {payContent && (
                  <button
                    onClick={() => copy(payContent, "Nội dung")}
                    className="px-3 py-1 rounded-lg bg-slate-100 text-slate-900 font-bold"
                  >
                    Copy
                  </button>
                )}
              </div>

              {copied && (
                <div className="text-green-600 font-bold">✅ Đã copy {copied}</div>
              )}
            </div>

            <div className="mt-5 border rounded-2xl p-3 flex items-center justify-center bg-slate-50">
              {payCfg?.qrImage ? (
                <img
                  src={payCfg.qrImage}
                  alt="QR ngân hàng"
                  className="max-h-72 w-auto"
                />
              ) : (
                <div className="text-sm text-slate-500">
                  Chưa có ảnh QR (hãy thêm payment.qrImage trong data/config.json)
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowPay(false)}
                className="rounded-xl bg-slate-100 text-slate-900 font-bold px-4 py-2"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
