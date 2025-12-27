"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  // đóng menu khi đổi size lên desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const Item = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className="block px-4 py-3 text-white font-bold hover:bg-white/15 rounded-xl"
    >
      {label}
    </Link>
  );

  return (
    <header className="bg-gradient-to-r from-sky-700 to-blue-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-2xl font-black">
            ¥
          </div>
          <div className="leading-tight">
            <div className="font-black text-lg">Tỷ giá quy đổi tại Meilian.xyz</div>
            <div className="text-xs opacity-90">
              Cập nhật nhanh · Chính xác · Tham khảo
            </div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 font-bold">
          <Link href="/" className="hover:underline">
            Trang chủ
          </Link>
          <Link href="/gioi-thieu" className="hover:underline">
            Giới thiệu
          </Link>
          <Link href="/lien-he" className="hover:underline">
            Liên hệ
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/15"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu"
        >
          {/* icon hamburger */}
          <div className="w-6 h-[2px] bg-white mb-1"></div>
          <div className="w-6 h-[2px] bg-white mb-1"></div>
          <div className="w-6 h-[2px] bg-white"></div>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden px-4 pb-4">
          <div className="bg-white/10 rounded-2xl p-2">
            <Item href="/" label="Trang chủ" />
            <Item href="/gioi-thieu" label="Giới thiệu" />
            <Item href="/lien-he" label="Liên hệ" />
          </div>
        </div>
      )}
    </header>
  );
}
