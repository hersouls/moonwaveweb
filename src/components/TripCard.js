// src/components/TripCard.js
import React from "react";

export default function TripCard({ trip }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 18, boxShadow: "0 2px 8px #0001",
      marginBottom: 20, padding: 18
    }}>
      <div style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 6 }}>
        {trip.day} · {trip.date} · {trip.weather}
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", fontSize: "1rem" }}>
        {trip.schedule.map((item, idx) => (
          <li key={idx} style={{ marginBottom: 6 }}>
            <span style={{ fontWeight: 500 }}>{item.time ? `[${item.time}] ` : ""}</span>
            {item.url ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: "#4b72fa", textDecoration: "underline" }}>
                {item.label}
              </a>
            ) : (
              item.label
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
