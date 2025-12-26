export default function NoteFooter() {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
      <div className="font-bold text-yellow-900 mb-3">♦ Lưu ý</div>

      <ul className="list-disc pl-6 space-y-2 text-slate-800 text-[15px] leading-relaxed">
        <li>
          <b>Lưu ý:</b> Tất cả các giá trị cung cấp trên trang web này chỉ mang
          tính chất tham khảo, so sánh.
        </li>

        <li>
          <b>Đơn nạp tệ:</b> Số lẻ hay số nhiều mình đều giao dịch. Có thể chuyển
          qua Alipay hoặc WeChat.
        </li>
      </ul>
    </div>
  );
}
