"use client";
import { useEffect, useMemo, useState } from "react";
import type { Tier } from "@/lib/types";

type TierWithRange = Tier & { min?: number; max?: number };

function parseRangeFromLabel(label: string) {
  // Examples:
  // "Mua từ 51¥ - 499¥"
  // "Mua từ 500¥ - 999¥"
  // "Trên 2001¥"
  // "Dưới 50¥"
  const text = label.toLowerCase();

  // 1) Pattern: "mua từ X - Y"
  const between = text.match(/từ\s+(\d+)\s*¥?\s*-\s*(\d+)\s*¥?/);
  if (between) {
    return { min: Number(between[1]), max: Number(between[2]) };
  }

  // 2) Pattern: "trên X"
  const above = text.match(/trên\s+(\d+)\s*¥?/);
  if (above) {
    return { min: Number(above[1]), max: Infinity };
  }

  // 3) Pattern: "dưới X"
  const below = text.match(/dưới\s+(\d+)\s*¥?/);
  if (below) {
    return { min: 0, max: Number(below[1]) };
  }

  // 4) Pattern: exact number (rare)
  const single = text.match(/(\d+)\s*¥/);
  if (single) {
    const n = Number(single[1]);
    return { min: n, max: n };
  }

  return null;
}

export default function TierBox() {
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [warning, setWarning] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");

  // Payment config từ /api/config
  const [payCfg, setPayCfg] = useState<any>(null);

  // Modal state
  const [showPay, setShowPay] = useState(false);
  const [payAmount, setPayAmount] = useState<number>(0);
  const [payContent, setPayContent] = useState<string>("");
  const [copied, setCopied] = useState<string>("");

  useEffect(() => {
    fetch("/api/config", { cache: "no-store" })
      .then((r) => r.json())
      .then((cfg) => {
        setTiers(cfg.tiers || []);
        setWarning(cfg.warning || "");
        setPayCfg(cfg.payment || null);
      })
      .catch(() => {});
  }, []);

  // ✅ Convert tiers => tiersWithRange (tự parse min/max)
  const tiersWithRange: TierWithRange[] = useMemo(() => {
    const mapped = (tiers || []).map((t) => {
      const range = t.label ? parseRangeFromLabel(t.label) : null;
      return {
        ...t,
        min: range?.min,
        max: range?.max,
      };
    });

    // Sort by min ascending (an toàn)
    mapped.sort((a, b) => (a.min ?? 0) - (b.min ?? 0));
    return mapped;
  }, [tiers]);

  // ✅ Pick tier theo min/max -> không phụ thuộc index nữa
  const pickTier = useMemo(() => {
    const n = parseFloat(amount);
    if (!n || !tiersWithRange.length) return null;

    // Find first tier whose range covers n
    const found =
      tiersWithRange.find((t) => {
        const min = t.min ?? 0;
        const max = t.max ?? Infinity;
        return n >= min && n <= max;
      }) || null;

    // fallback: nếu không tìm được -> dùng tier đầu tiên
    return found || tiersWithRange[0];
  }, [amount, tiersWithRange]);

  const formatVND = (n: number) => n.toLocaleString("vi-VN") + " VND";

  const buildContent = (vnd: number) => {
    const tpl = payCfg?.contentTemplate || "Thanh toán {VND}";
    return tpl
      .replaceAll("{YEN}", amount || "")
      .replaceAll("{VND}", Math.round(vnd).toString());
  };

  const calc = () => {
    const n = parseFloat(amount);
    if (!n || !pickTier) return setResult("");

    const vnd = n * pickTier.rate + (pickTier.fee || 0);

    setResult(formatVND(vnd));
    setPayAmount(Math.round(vnd));
    setPayContent(buildContent(vnd));
  };

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(""), 1500);
    } catch {
      // fallback: không làm gì
    }
  };

  return (
    <div className="bg-amber-100 rounded-2xl shadow-soft p-6 space-y-4">
      <div className="text-red-700 font-bold">{warning}</div>

      <div className="bg-gradient-to-b from-sky-600 to-blue-700 rounded-2xl p-5 text-white">
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

          <button
            onClick={calc}
            className="rounded-xl bg-white text-blue-700 font-extrabold px-5 py-2 shadow-soft"
          >
            Tính tiền
          </button>

          {result && (
            <div className="font-black text-lg md:text-xl">
              = <span className="underline">{result}</span>
            </div>
          )}
        </div>

        {/* NÚT THANH TOÁN */}
        {result && payAmount > 0 && (
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

      {/* MODAL THANH TOÁN */}
      {showPay && (
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
            <div className="text-sm text-slate-500 mt-1">
              Giá này chỉ để tham khảo. Có thể nhắn tin cho mình trước khi chuyển
              tiền để thương lượng
            </div>

            {/* Info */}
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

            {/* QR ẢNH TĨNH */}
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
