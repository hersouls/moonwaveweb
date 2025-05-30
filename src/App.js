import React, { useState, useEffect } from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import TripList from "./components/TripList";

function App() {
  const familyId = "moonwave-family";
  const [user, setUser] = useState(null);
  const [tripId, setTripId] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(setUser);
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      alert("로그인 실패: " + e.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: 80 }}>
        <h2>Moonwave 여행일정 (Firebase 실시간)</h2>
        <p style={{ color: "#566", marginBottom: 40 }}>로그인 후 이용해 주세요!</p>
        <button
          onClick={handleLogin}
          style={{
            padding: "14px 30px", fontSize: 18, borderRadius: 9,
            background: "#4285f4", color: "#fff", border: "none", cursor: "pointer"
          }}
        >
          Google 계정으로 로그인
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Moonwave 가족 여행일정 (Firebase 실시간)</h1>
        <div>
          <span style={{ marginRight: 16, fontWeight: 600 }}>{user.displayName}</span>
          <button onClick={handleLogout} style={{
            padding: "7px 16px", borderRadius: 7, background: "#e8eafc", color: "#3240a8",
            border: "none", fontWeight: 700, cursor: "pointer"
          }}>로그아웃</button>
        </div>
      </div>
      <TripList familyId={familyId} onTripSelect={setTripId} />
    </div>
  );
}

export default App;
