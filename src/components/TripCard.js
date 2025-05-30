// TripCard.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { typeColors, getTypeSvg } from "./TypeBadge";

// 날씨 샘플(실제는 API 연동)
function useWeather(date, place) {
  const [weather, setWeather] = useState("");
  useEffect(() => {
    if (!date || !place) return;
    if (place.includes("제주")) setWeather("☀️ 맑음");
    else setWeather("🌤️ 흐림");
  }, [date, place]);
  return weather;
}

// 거리 계산
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const toRad = v => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 1000) / 1000;
}

function getMoveTypeAndTime(distKm) {
  if (distKm < 1) {
    const min = Math.round(distKm * 15) || 1;
    return { type: "도보", min, color: "#4ec46d" };
  } else {
    const min = Math.round(distKm * 2.5) || 1;
    return { type: "차량", min, color: "#2d87e8" };
  }
}

function convertToGoogleEmbedUrl(url) {
  if (!url) return "";
  if (url.includes("google.com/maps/embed")) return url;
  if (url.includes("google.com/maps")) {
    return url.replace("/maps/", "/maps/embed?");
  }
  return "";
}

const getColor = (isToday) => isToday ? "#e0edff" : "#fff";

export default function TripCard({
  trip,
  dragHandleProps,
  isOpen,
  onClick,
  isToday,
  onEdit,
  onDelete
}) {
  const weather = useWeather(trip.date, trip.place);

  const sortedSchedule = [...(trip.schedule || [])].sort((a, b) => {
    if (!a.time || !/^\d{1,2}:\d{2}/.test(a.time)) return 1;
    if (!b.time || !/^\d{1,2}:\d{2}/.test(b.time)) return -1;
    return a.time.localeCompare(b.time);
  });

  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: 18,
        background: getColor(isToday),
        boxShadow: isToday ? "0 4px 24px #a1d1ff66" : "0 2px 8px #dbeafe33",
        padding: "18px 18px 14px",
        cursor: "pointer",
        border: isToday
          ? "2px solid #1d63ca"
          : isOpen
          ? "2px solid #3240a8"
          : "1px solid #e0e7ef",
        position: "relative",
        transition: "border 0.2s, background 0.2s"
      }}
    >
      {/* 드래그 핸들 */}
      <div
        {...dragHandleProps}
        style={{
          display: "inline-block",
          cursor: "grab",
          paddingRight: 10,
          fontSize: 18,
          verticalAlign: "middle",
          userSelect: "none"
        }}
        onClick={(e) => e.stopPropagation()}
        title="드래그해서 순서 이동"
      >
        <span role="img" aria-label="drag">☰</span>
      </div>

      <span style={{ fontWeight: 700, fontSize: 16, marginRight: 8, color: isToday ? "#1d63ca" : "#222" }}>
        {trip.day}일차
      </span>
      <span style={{ color: "#94a3b8", marginRight: 8 }}>{trip.date}</span>
      <span style={{ fontSize: 18, marginRight: 5 }}>{weather}</span>

      <div style={{
        marginTop: 10, fontSize: 15, color: "#3b4153", fontWeight: 500
      }}>
        <span role="img" aria-label="place" style={{ marginRight: 5 }}>📍</span>
        {trip.place || "대표 장소"}
      </div>

      <div style={{
        position: "absolute", right: 16, top: 18, fontSize: 22,
        color: isOpen ? "#3240a8" : "#b6c2df", transition: "color 0.2s"
      }}>
        {isOpen ? "▲" : "▼"}
      </div>

      {/* 상세 영역 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: 50 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: 50 }}
            transition={{ duration: 0.32, ease: "easeInOut" }}
            style={{
              overflow: "hidden",
              marginTop: 18,
              padding: "16px 10px 36px 10px", // 👈 하단 여백 확보
              background: "#f6f8fe",
              borderRadius: 12,
              boxShadow: "0 2px 8px #b2cdfa22"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontWeight: 600, marginBottom: 8 }}>상세 일정 타임라인</div>
            <ul style={{ paddingLeft: 0, listStyle: "none" }}>
              {sortedSchedule.map((item, idx) => {
                const embedUrl = convertToGoogleEmbedUrl(item.mapUrl);
                let moveInfo = null;
                if (
                  idx < sortedSchedule.length - 1 &&
                  item.lat && item.lng &&
                  sortedSchedule[idx + 1].lat && sortedSchedule[idx + 1].lng
                ) {
                  const next = sortedSchedule[idx + 1];
                  const dist = getDistanceKm(item.lat, item.lng, next.lat, next.lng);
                  const { type, min, color } = getMoveTypeAndTime(dist);
                  moveInfo = (
                    <div style={{
                      color, fontWeight: 700, margin: "4px 0 8px 0", fontSize: 14,
                      background: "#f3f7fb", borderRadius: 7,
                      display: "inline-block", padding: "2px 14px",
                    }}>
                      {dist < 1 ? `${Math.round(dist * 1000)}m` : `${dist}km`} {type} {min}분
                    </div>
                  );
                }

                return (
                  <React.Fragment key={item.id || idx}>
                    <li style={{
                      background: "#fff",
                      border: "1.2px solid #b6c2df",
                      borderRadius: 8,
                      padding: "8px 12px",
                      marginBottom: 8
                    }}>
                      <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontWeight: 700, fontSize: 15 }}>{item.time}</span>
                          {item.place && <span style={{ color: "#767fa3", fontWeight: 400 }}>{item.place}</span>}
                        </div>
                        {item.type && (
                          <span style={{
                            display: "inline-flex", alignItems: "center",
                            minWidth: 60, height: 28,
                            padding: "0 14px",
                            borderRadius: 999,
                            fontWeight: 700,
                            fontSize: 15,
                            color: "#fff",
                            background: typeColors[item.type] || "#bdbdbd",
                            boxShadow: `0 1.5px 12px ${typeColors[item.type]}44, 0 0.5px 2px #bdbdbd33`,
                            letterSpacing: "-0.5px",
                            userSelect: "none"
                          }}>
                            {getTypeSvg(item.type)}
                            <span>{item.type}</span>
                          </span>
                        )}
                      </div>
                      <div style={{ color: "#465c8b", fontSize: 14, marginTop: 3 }}>{item.memo || item.content}</div>
                      {embedUrl && (
                        <div style={{ margin: "12px 0 6px 0" }}>
                          <iframe
                            src={embedUrl}
                            title="지도 미리보기"
                            width="98%"
                            height="180"
                            style={{ border: 0, borderRadius: 8, boxShadow: "0 2px 8px #b2cdfa22" }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          />
                        </div>
                      )}
                      {item.mapUrl && (
                        <div>
                          <a
                            href={item.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "#3a77e5",
                              fontSize: 13,
                              textDecoration: "underline"
                            }}
                          >지도 보기</a>
                        </div>
                      )}
                      {moveInfo}
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>
            {/* 편집/삭제 버튼 */}
            <div style={{ textAlign: "right", marginTop: 12 }}>
              <button
                style={{
                  border: "none", background: "#e8f0fe", color: "#3240a8",
                  fontWeight: 700, borderRadius: 6, padding: "6px 14px", marginRight: 6, cursor: "pointer"
                }}
                onClick={e => { e.stopPropagation(); onEdit(); }}
              >편집</button>
              <button
                style={{
                  border: "none", background: "#ffe6e6", color: "#c73737",
                  fontWeight: 700, borderRadius: 6, padding: "6px 14px", cursor: "pointer"
                }}
                onClick={e => { e.stopPropagation(); onDelete(); }}
              >삭제</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isToday && (
        <div style={{
          position: "absolute", left: 12, top: 8, fontSize: 13,
          color: "#fff", background: "#1d63ca", padding: "1px 8px", borderRadius: 12,
          fontWeight: 700, boxShadow: "0 1px 8px #97d7ff33"
        }}>
          오늘
        </div>
      )}
    </div>
  );
}
