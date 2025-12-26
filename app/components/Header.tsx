import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-700 text-white">
      <div className="max-w-[1100px] mx-auto flex items-center justify-between px-4 py-4 gap-4">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center gap-3 no-underline text-white">
          <div className="w-10 h-10 rounded-full bg-white/25 flex items-center justify-center text-xl font-bold">
            ¥
          </div>

          <div>
            <div className="text-lg font-bold leading-tight">
              Tỷ giá quy đổi tại Meilian.xyz
            </div>
            <div className="text-xs opacity-90">
              Cập nhật nhanh · Chính xác · Tham khảo
            </div>
          </div>
        </Link>

        {/* Menu */}
        <nav className="flex items-center gap-5 font-semibold text-sm">
          <Link href="/" className="text-white no-underline hover:underline">
            Trang chủ
          </Link>
          <Link
            href="/gioi-thieu"
            className="text-white no-underline hover:underline"
          >
            Giới thiệu
          </Link>
          <Link href="/lien-he" className="text-white no-underline hover:underline">
            Liên hệ
          </Link>
        </nav>
      </div>
    </header>
  );
}
