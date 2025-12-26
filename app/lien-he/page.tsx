export default function LienHePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-5xl font-extrabold mb-6">Liên hệ</h1>

      <p className="text-slate-700 text-lg mb-8">
        Nếu bạn cần hỗ trợ nạp tiền, quy đổi tỷ giá hoặc tư vấn giao dịch,
        vui lòng liên hệ qua các kênh bên dưới:
      </p>

      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 space-y-4">
        <div className="text-xl font-bold text-yellow-900">♦ Thông tin liên hệ</div>

        <div className="text-slate-800 text-base leading-relaxed">
          <p>
            ✅ <b>Zalo:</b>{" "}
            <a
              href="https://zalo.me/"
              target="_blank"
              className="text-blue-700 font-semibold underline"
            >
              https://zalo.me/
            </a>
          </p>

          <p>
            ✅ <b>Telegram:</b>{" "}
            <a
              href="https://t.me/"
              target="_blank"
              className="text-blue-700 font-semibold underline"
            >
              https://t.me/
            </a>
          </p>

          <p className="mt-4 text-slate-600 text-sm">
            * Lưu ý: Tất cả tỷ giá trên website chỉ mang tính chất tham khảo & so sánh.
          </p>
        </div>
      </div>
    </div>
  );
}
