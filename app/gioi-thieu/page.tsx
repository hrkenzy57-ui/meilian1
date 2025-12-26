"use client";

import { useEffect, useState } from "react";

export default function GioiThieuPage() {
  const [notes, setNotes] = useState({
    alipay: "",
    wechat: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Load notes từ server
  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await fetch("/api/notes");
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        console.error("Fetch notes error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, []);

  // Save notes lên server
  async function saveNotes() {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notes),
      });

      const data = await res.json();
      if (data.success) setMessage("✅ Đã lưu ghi chú thành công!");
      else setMessage("❌ Lưu thất bại!");
    } catch (err) {
      console.error("Save notes error:", err);
      setMessage("❌ Có lỗi khi lưu!");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  }

  const items = [
    {
      key: "alipay",
      title: "Alipay",
      img: "/114.jpg",
    },
    {
      key: "wechat",
      title: "WeChat",
      img: "/115.jpg",
    },
  ];

  return (
    <div style={{ padding: "30px 15px", maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ fontSize: 44, fontWeight: 800, marginBottom: 20 }}>
        Giới thiệu
      </h1>

      <p style={{ color: "#444", marginBottom: 20 }}>
        Trang này hiển thị thông tin về Alipay và WeChat. Bạn có thể ghi chú và
        bấm lưu để hệ thống lưu vĩnh viễn.
      </p>

      {/* Button Save */}
      <button
        onClick={saveNotes}
        disabled={saving || loading}
        style={{
          padding: "10px 18px",
          borderRadius: 10,
          border: "none",
          background: saving ? "#aaa" : "#2563eb",
          color: "white",
          fontSize: 15,
          cursor: saving ? "not-allowed" : "pointer",
          marginBottom: 18,
        }}
      >
        {saving ? "Đang lưu..." : "Lưu ghi chú"}
      </button>

      {message && (
        <div style={{ marginBottom: 15, fontSize: 14, fontWeight: 600 }}>
          {message}
        </div>
      )}

      {loading ? (
        <div>Đang tải dữ liệu...</div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 22,
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                background: "white",
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

              <textarea
                value={notes[item.key as "alipay" | "wechat"]}
                onChange={(e) =>
                  setNotes({ ...notes, [item.key]: e.target.value })
                }
                placeholder="Nhập ghi chú..."
                style={{
                  width: "100%",
                  height: 160,
                  padding: 12,
                  borderRadius: 12,
                  border: "1px solid #ddd",
                  fontSize: 15,
                  outline: "none",
                  resize: "vertical",
                }}
              />

              <p style={{ marginTop: 8, fontSize: 13, color: "#666" }}>
                * Ghi chú sẽ được lưu vào server khi bạn bấm “Lưu ghi chú”
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
