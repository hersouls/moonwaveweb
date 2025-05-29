// src/pages/TripList.js
import React from "react";
import { trips } from "../data/trips";
import TripCard from "../components/TripCard";

export default function TripList() {
  return (
    <div style={{
      maxWidth: 480, margin: "0 auto", padding: 16, background: "#f8f9fa",
      minHeight: "100vh"
    }}>
      <h1 style={{ fontSize: "1.8rem", margin: "24px 0 16px 0" }}>🌊 Moonwave 여행일정</h1>
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
}
