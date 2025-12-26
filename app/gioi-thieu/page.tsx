import HeaderBlue from "@/components/HeaderBlue";
import NoteFooter from "@/components/NoteFooter";

export default function GioiThieuPage() {
  return (
    <main className="min-h-screen">
      <HeaderBlue />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-black text-slate-900">Giới thiệu</h1>

        <div className="mt-6 bg-white rounded-2xl shadow-soft p-6 leading-relaxed text-slate-700">
          <p>
            Meilian.xyz cung cấp tỷ giá tham khảo, cập nhật nhanh và chính xác để
            hỗ trợ quy đổi chi phí và giao dịch.
          </p>

          <p className="mt-4">
            Dữ liệu tỷ giá được hiển thị nhằm mục đích tham khảo và có thể thay
            đổi theo thị trường.
          </p>
        </div>

        <div className="mt-10">
          <NoteFooter />
        </div>
      </div>
    </main>
  );
}
