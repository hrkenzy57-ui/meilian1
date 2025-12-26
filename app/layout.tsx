import "./globals.css";
import Header from "./components/Header";

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
        <Header />
        <main className="max-w-[1100px] mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
