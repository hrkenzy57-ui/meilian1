import "./globals.css";
import HeaderBlue from "@/components/HeaderBlue";

export const metadata = {
  title: "Meilian Tỷ Giá",
  description: "Tỷ giá CNY ↔ VND cập nhật nhanh",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-slate-50 text-slate-900">
        <HeaderBlue />
        {children}
      </body>
    </html>
  );
}
