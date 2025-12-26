export default function GioiThieuPage() {
  // ✅ Chỉ cần sửa nội dung ở đây trên GitHub
  const items = [
    {
      title: "Alipay",
      img: "/114.jpg",
      note: `
- Đơn nạp tệ: Số lẻ, hay số nhiều mình đều giao dịch.
- Có thể chuyển qua Alipay.
- Thời gian xử lý: 1–5 phút tùy thời điểm.
      `,
    },
    {
      title: "WeChat",
      img: "/115.jpg",
      note: `
- Đơn nạp tệ: Số lẻ, hay số nhiều mình đều giao dịch.
- Có thể chuyển qua WeChat.
- Thời gian xử lý: 1–5 phút tùy thời điểm.
      `,
    },
  ];

  return (
    <div style={{ padding: "30px 15px", maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ fontSize: 44, fontWeight: 800, marginBottom: 20 }}>
        Giới thiệu
      </h1>

      <p style={{ color: "#444", marginBottom: 24 }}>
        Meilian.xyz cung cấp tỷ giá tham khảo, cập nhật nhanh và chính xác để hỗ trợ
        quy đổi chi phí và giao dịch. Dữ liệu chỉ mang tính chất tham khảo và có thể
        thay đổi theo thị trường.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 22,
        }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: "#fff",
              borderRadius: 18,
              boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
              padding: 18,
            }}
          >
            <img
              src={item.img}
              alt={item.title}
              style={{
                width: "100%",
                borderRadius: 14,
                marginBottom: 14,
                display: "block",
              }}
            />

            <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12 }}>
              {item.title}
            </h2>

            <div
              style={{
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: 14,
                padding: 14,
                fontSize: 15,
                lineHeight: 1.6,
                whiteSpace: "pre-line",
                color: "#333",
              }}
            >
              {item.note}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
