export default function GioiThieuPage() {
  // ✅ Chỉ cần sửa nội dung ở đây trên GitHub
  const items = [
    {
      title: "Alipay-支付宝",
      img: "/114.jpg",
      note: `
Tải xuống Alipay - 支付宝 về điện thoại

Bước 1 : Đăng ký bằng SDT hoặc Email 
Bước 2 : Cần xác minh tài khoản bằng hộ chiếu Việt Nam thành công. Tài khoản không bị hạn chế khi chuyển và nhận tiền
Bước 3 : Vào phần Nhận tiền. Nhận tiền cá nhân. Lưu mã QR. Để tạo mã QR nhận tiền
Bước 4 : Gửi ảnh QR cho người khác quét mã để nhận tiền

Lưu ý: 
1. Nếu tài khoản bị hạn chế, không thể nhận tiền.
2. Tài khoản chưa xác minh bằng hộ chiếu, không thể nhận tiền.
3. Tài khoản mới lập, không nên nhận lần đầu số tiền lớn. Nên thử 200, 300 trước.
      `,
    },
    {
      title: "WeChat-微信",
      img: "/115.jpg",
      note: `
Tải xuống  Wechat - 微信 về điện thoại

Bước 1 :  Đã có sẵn tài khoản, đã xác minh bằng hộ chiếu Việt Nam
Bước 2 :  Tài khoản không bị hạn chế khi chuyển và nhận tiền
Bước 3 :  Vào phần Nhận tiền. Nhận tiền cá nhân. Lưu mã QR. Để tạo mã QR nhận tiền
Bước 4 : Gửi ảnh QR cho người khác quét mã để nhận tiền

Lưu ý: 
1. Nếu tài khoản bị hạn chế, không thể nhận tiền.
2. Tài khoản chưa xác minh bằng hộ chiếu, không thể nhận tiền.
3. Tài khoản mới lập, không nên nhận lần đầu số tiền lớn. Nên thử 200, 300 trước.
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
