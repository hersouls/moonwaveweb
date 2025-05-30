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

  // 메인 색상 변수
  const mainColor = "#3663f7";

  if (!user) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f4f7fd 0%, #e7eefb 100%)",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
      }}>
        <div style={{
          width: "100%", maxWidth: 350, background: "#fff", borderRadius: 20, boxShadow: "0 4px 32px #e3eaf933", padding: 32,
          display: "flex", flexDirection: "column", alignItems: "center"
        }}>
          <h1 style={{
            fontSize: "2.3rem", fontWeight: 800, letterSpacing: "2px", marginBottom: 8,
            color: mainColor, lineHeight: 1.1
          }}>Moonwave</h1>
          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "14px 0", fontSize: 18, borderRadius: 12,
              background: mainColor, color: "#fff", border: "none", fontWeight: 700,
              boxShadow: "0 2px 10px #bed3eb2c", marginBottom: 16, letterSpacing: "1px"
            }}
          >
            Google 계정으로 로그인
          </button>
          <div style={{ color: "#8595b7", fontSize: 15 }}>로그인 후 이용해 주세요!</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f4f7fd 0%, #e7eefb 100%)"
    }}>
      {/* 상단 바 */}
      <div style={{
        width: "100%", maxWidth: 640, margin: "0 auto",
        display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 0 18px 0"
      }}>
        <h1 style={{
          fontSize: "2.3rem", fontWeight: 800, letterSpacing: "2px", margin: 0,
          color: mainColor, lineHeight: 1.1
        }}>Moonwave</h1>
        <div style={{
          position: "absolute", top: 32, right: 32, display: "flex", alignItems: "center", gap: 12
        }}>
          <span style={{
            fontWeight: 600, color: "#365", background: "#f6f8fd", borderRadius: 7,
            padding: "6px 14px", fontSize: 16
          }}>
            {user.displayName}
          </span>
          <button onClick={handleLogout} style={{
            padding: "7px 16px", borderRadius: 7,
            background: "linear-gradient(90deg,#e8eafc 60%,#c1c8ef 100%)",
            color: mainColor, border: "none", fontWeight: 700, cursor: "pointer",
            boxShadow: "0 1px 6px #e7ebfc7e"
          }}>로그아웃</button>
        </div>
      </div>

      {/* 본문 카드 */}
      <main style={{
        maxWidth: 540, margin: "30px auto 0 auto", background: "#fff",
        borderRadius: 20, boxShadow: "0 2px 24px #bed3eb1c", padding: 24, minHeight: 360
      }}>
        {/* 카드 제목만 수정 (예: TripList 상단에 직접 삽입) */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 18, fontWeight: 700, fontSize: "1.5rem", color: "#234af3" }}>
          <span style={{ fontSize: "2rem", marginRight: 10 }}>🌊</span>
          제주도 가족여행
        </div>
        <TripList familyId={familyId} onTripSelect={setTripId} />
      </main>
    </div>
  );
}

export default App;
