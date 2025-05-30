// AddEditTripModal.jsx – 리팩토링 버전
import React, { useState, useEffect } from "react";

function parseLatLngFromEmbedUrl(url) {
  if (!url) return {};
  const dMatch = url.match(/!2d([-\d.]+)/);
  const aMatch = url.match(/!3d([-\d.]+)/);
  if (dMatch && aMatch) {
    return {
      lng: parseFloat(dMatch[1]),
      lat: parseFloat(aMatch[1])
    };
  }
  return {};
}

export default function AddEditTripModal({ open, onClose, onSave, initData }) {
  const [form, setForm] = useState({ day: "", date: "", place: "", slots: [] });
  const [slot, setSlot] = useState({ time: "", memo: "", mapUrl: "", place: "", type: "", lat: "", lng: "" });
  const [editingSlotId, setEditingSlotId] = useState(null);

  useEffect(() => {
    if (initData) {
      setForm({
        ...initData,
        slots: Array.isArray(initData.schedule)
          ? initData.schedule.map(item => ({ ...item, id: item.id || Date.now() + Math.random() }))
          : []
      });
    } else {
      setForm({ day: "", date: "", place: "", slots: [] });
    }
    setSlot({ time: "", memo: "", mapUrl: "", place: "", type: "", lat: "", lng: "" });
    setEditingSlotId(null);
  }, [initData, open]);

  useEffect(() => {
    const 숙소 = form.slots?.find(s => s.type === "숙소");
    if (숙소) setForm(f => ({ ...f, place: 숙소.place }));
  }, [form.slots]);

  if (!open) return null;

  const handleAddOrEditSlot = () => {
    if (!slot.time || !slot.memo) return;
    const slotData = { ...slot };
    if (slot.mapUrl && (!slot.lat || !slot.lng)) {
      const pos = parseLatLngFromEmbedUrl(slot.mapUrl);
      if (pos.lat && pos.lng) {
        slotData.lat = pos.lat;
        slotData.lng = pos.lng;
      }
    }
    if (editingSlotId !== null) {
      setForm(f => ({
        ...f,
        slots: f.slots.map(s => s.id === editingSlotId ? { ...slotData, id: editingSlotId } : s)
      }));
      setEditingSlotId(null);
    } else {
      setForm(f => ({
        ...f,
        slots: [...f.slots, { ...slotData, id: Date.now() + Math.random() }]
      }));
    }
    setSlot({ time: "", memo: "", mapUrl: "", place: "", type: "", lat: "", lng: "" });
  };

  const handleRemoveSlot = id => {
    setForm(f => ({ ...f, slots: f.slots.filter(s => s.id !== id) }));
    if (editingSlotId === id) {
      setEditingSlotId(null);
      setSlot({ time: "", memo: "", mapUrl: "", place: "", type: "", lat: "", lng: "" });
    }
  };

  const handleEditSlot = id => {
    const s = form.slots.find(s => s.id === id);
    setSlot({ ...s });
    setEditingSlotId(id);
  };

  const handleMapUrlChange = e => {
    const url = e.target.value;
    const pos = parseLatLngFromEmbedUrl(url);
    setSlot(s => ({
      ...s,
      mapUrl: url,
      lat: pos.lat || "",
      lng: pos.lng || ""
    }));
  };

  return (
    <div
      style={{
        position: "fixed", left: 0, top: 0, width: "100vw", height: "100vh",
        background: "rgba(0,0,0,0.25)", zIndex: 1200, display: "flex", alignItems: "center", justifyContent: "center"
      }}
      onClick={onClose}
    >
      <div
        style={{
          minWidth: 320,
          maxWidth: 420,
          width: "90%",
          maxHeight: "90vh",
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 6px 32px #8791bd33",
          display: "flex",
          flexDirection: "column"
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* 스크롤 가능한 영역 */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          <div style={{ fontWeight: 800, fontSize: 22, color: "#3240a8", marginBottom: 12 }}>
            {initData ? "일정 편집" : "일정 추가"}
          </div>

          <input placeholder="일차(숫자)" type="number" value={form.day}
            onChange={e => setForm(f => ({ ...f, day: e.target.value }))} style={inputStyle} />

          <input placeholder="날짜 (예: 2024-06-02)" value={form.date}
            onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={inputStyle} />

          <input placeholder="숙소정보" value={form.place || ""}
            style={{ ...inputStyle, background: "#f7fbff", fontWeight: 700, color: "#25467a" }} readOnly />

          {/* 시간대별 일정 */}
          <div style={{ margin: "10px 0", padding: "12px", background: "#f8fafc", borderRadius: 12 }}>
            <div style={{ fontWeight: 700, color: "#3659b8", fontSize: 15, marginBottom: 7 }}>시간대별 일정</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <input style={inputStyle} placeholder="시간 (예: 09:00)"
                value={slot.time} onChange={e => setSlot(s => ({ ...s, time: e.target.value }))} />
              <input style={inputStyle} placeholder="메모/일정 내용"
                value={slot.memo} onChange={e => setSlot(s => ({ ...s, memo: e.target.value }))} />
              <input style={inputStyle} placeholder="지도URL"
                value={slot.mapUrl} onChange={handleMapUrlChange} />
              <input style={inputStyle} placeholder="장소명"
                value={slot.place} onChange={e => setSlot(s => ({ ...s, place: e.target.value }))} />
              <select style={inputStyle} value={slot.type}
                onChange={e => setSlot(s => ({ ...s, type: e.target.value }))}>
                <option value="">유형 선택</option>
                <option value="숙소">숙소</option>
                <option value="식당">식당</option>
                <option value="명소">명소</option>
                <option value="카페">카페</option>
                <option value="교통">교통</option>
              </select>
              {slot.lat && slot.lng && (
                <div style={{ color: "#7796cd", fontSize: 13 }}>
                  위도: {slot.lat}, 경도: {slot.lng}
                </div>
              )}
              <button type="button"
                style={{ ...buttonStyle, background: "#4678ff", color: "#fff" }}
                onClick={handleAddOrEditSlot}>
                {editingSlotId !== null ? "일정 수정" : "+ 일정 추가"}
              </button>
            </div>

            {/* 일정 리스트 */}
            <div style={{ marginTop: 12 }}>
              {[...form.slots].sort((a, b) => {
                if (!a.time || !/^\d{1,2}:\d{2}/.test(a.time)) return 1;
                if (!b.time || !/^\d{1,2}:\d{2}/.test(b.time)) return -1;
                return a.time.localeCompare(b.time);
              }).map((s) => (
                <div key={s.id} style={{
                  background: "#fff", border: "1.2px solid #b6c2df", borderRadius: 8,
                  padding: "8px 12px", marginBottom: 8, display: "flex",
                  alignItems: "center", justifyContent: "space-between", gap: 8
                }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>
                      {s.time} <span style={{ color: "#767fa3", fontWeight: 400 }}>{s.place}</span>
                      <span style={{
                        marginLeft: 10, color: "#5877dd", background: "#f3f7fd",
                        borderRadius: 5, padding: "1px 7px", fontWeight: 600, fontSize: 13
                      }}>{s.type}</span>
                    </div>
                    <div style={{ color: "#465c8b", fontSize: 14 }}>{s.memo}</div>
                    {s.mapUrl &&
                      <a href={s.mapUrl} target="_blank" rel="noopener noreferrer"
                        style={{ color: "#3a77e5", fontSize: 12, textDecoration: "underline" }}>지도 링크</a>}
                  </div>
                  <div>
                    <button style={{
                      ...buttonStyle, background: "#e8eafc", color: "#4678ff",
                      padding: "5px 10px", marginRight: 4
                    }} onClick={() => handleEditSlot(s.id)} type="button">수정</button>
                    <button style={{
                      ...buttonStyle, background: "#ffe6e6", color: "#b34040",
                      padding: "5px 10px"
                    }} onClick={() => handleRemoveSlot(s.id)} type="button">삭제</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #eee", display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button onClick={onClose} style={buttonStyle}>취소</button>
          <button
            onClick={() => {
              if (!form.day || !form.date) return;
              onSave({ ...form, day: Number(form.day), schedule: form.slots });
            }}
            style={{ ...buttonStyle, background: "#3240a8", color: "#fff" }}
          >저장</button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "10px 12px",
  border: "1.2px solid #b6c2df",
  borderRadius: 9,
  fontSize: 16,
  outline: "none"
};

const buttonStyle = {
  padding: "8px 20px",
  border: "none",
  borderRadius: 7,
  background: "#e8eafc",
  fontWeight: 700,
  fontSize: 16,
  cursor: "pointer"
};
