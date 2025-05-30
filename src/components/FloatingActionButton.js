// 본문 시작
import React from "react";

export default function FloatingActionButton({ actions }) {
  return (
    <div style={{
      position: "fixed",
      bottom: 24,
      right: 20,
      display: "flex",
      flexDirection: "column",
      zIndex: 1000
    }}>
      {actions.map((action, idx) => (
        <button
          key={idx}
          style={{
            background: "#3240a8",
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
            border: "none",
            borderRadius: 24,
            padding: "12px 20px",
            marginBottom: 10,
            boxShadow: "0 3px 16px #8fa8ff44",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 7,
            transition: "background 0.18s"
          }}
          onClick={action.onClick}
        >
          <span style={{ fontSize: 20 }}>{action.icon}</span>
          {action.label}
        </button>
      ))}
    </div>
  );
}
// 본문 종료
