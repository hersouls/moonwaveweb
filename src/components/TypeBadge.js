// src/components/TypeBadge.js
import React from "react";

// 유형별 컬러
export const typeColors = {
  "숙소": "#5ca1e9",
  "식당": "#ffb46e",
  "명소": "#5ee8b0",
  "카페": "#ff87b2",
  "교통": "#bdb7f7"
};

// 유형별 SVG 아이콘 (컬러 원형 + emoji/픽토그램)
export function getTypeSvg(type) {
  switch (type) {
    case "숙소":
      return (
        <svg width="18" height="18" style={{ marginRight: 6 }} viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="9" fill="#5ca1e9" />
          <text x="10" y="15" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">🏨</text>
        </svg>
      );
    case "식당":
      return (
        <svg width="18" height="18" style={{ marginRight: 6 }} viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="9" fill="#ffb46e" />
          <text x="10" y="15" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">🍽️</text>
        </svg>
      );
    case "명소":
      return (
        <svg width="18" height="18" style={{ marginRight: 6 }} viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="9" fill="#5ee8b0" />
          <text x="10" y="15" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">⭐</text>
        </svg>
      );
    case "카페":
      return (
        <svg width="18" height="18" style={{ marginRight: 6 }} viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="9" fill="#ff87b2" />
          <text x="10" y="15" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">☕</text>
        </svg>
      );
    case "교통":
      return (
        <svg width="18" height="18" style={{ marginRight: 6 }} viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="9" fill="#bdb7f7" />
          <text x="10" y="15" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">🚙</text>
        </svg>
      );
    default:
      return null;
  }
}

// 디버깅용(옵션)
console.log("TypeBadge loaded", typeColors);
