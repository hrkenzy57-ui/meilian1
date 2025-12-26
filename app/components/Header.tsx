import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        background: "#1e5ddb",
        color: "white",
        padding: "14px 16px",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* Logo / Title */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "white",
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            ¥
          </div>

          <div>
            <div style={{ fontSize: 18 }}>Tỷ giá quy đổi tại Meilian.xyz</div>
            <div style={{ fontSize: 12, opacity: 0.85 }}>
              Cập nhật nhanh · Chính xác · Tham khảo
            </div>
          </div>
        </Link>

        {/* Menu */}
        <nav style={{ display: "flex", gap: 18, fontWeight: 600 }}>
          <Link href="/" style={{ color: "white", textDecoration: "none" }}>
            Trang chủ
          </Link>
          <Link
            href="/gioi-thieu"
            style={{ color: "white", textDecoration: "none" }}
          >
            Giới thiệu
          </Link>
          <Link
            href="/lien-he"
            style={{ color: "white", textDecoration: "none" }}
          >
            Liên hệ
          </Link>
        </nav>
      </div>
    </header>
  );
}
