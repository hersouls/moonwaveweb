import React, { useState, useEffect } from "react";
import { auth, provider } from "./firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously
} from "firebase/auth";
import TripList from "./components/TripList";

function App() {
  const familyId = "moonwave-family";
  const [user, setUser] = useState(null);
  const [tripId, setTripId] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      alert("Google 로그인 실패: " + e.message);
    }
  };

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      alert("이메일 로그인 실패: " + e.message);
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("회원가입 완료! 로그인 해주세요.");
    } catch (e) {
      alert("회원가입 실패: " + e.message);
    }
  };

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth);
    } catch (e) {
      alert("게스트 로그인 실패: " + e.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const mainColor = "#3663f7";

  if (!user) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f4f7fd 0%, #e7eefb 100%)",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
      }}>
        <div style={{
          width: "100%", maxWidth: 400, background: "#fff", borderRadius: 20,
          boxShadow: "0 4px 32px #e3eaf933", padding: 32,
          display: "flex", flexDirection: "column", gap: 12
        }}>
          <h2 style={{ fontWeight: 800, fontSize: 20, color: "#3240a8", textAlign: "center" }}>
            Moonwave 로그인
          </h2>

          <button onClick={handleGoogleLogin} style={loginBtnStyle}>
            Google 계정으로 로그인
          </button>

          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <button onClick={handleEmailLogin} style={loginBtnStyle}>이메일 로그인</button>
          <button onClick={handleRegister} style={{ ...loginBtnStyle, background: "#d1d5db", color: "#333" }}>
            회원가입
          </button>

          <button onClick={handleGuestLogin} style={{ ...loginBtnStyle, background: "#e4e8ff", color: "#3240a8" }}>
            게스트 체험하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f4f7fd 0%, #e7eefb 100%)"
    }}>
      <div style={{
        width: "100%", maxWidth: 640, margin: "0 auto",
        display: "flex", flexDirection: "column", alignItems: "center", padding: "30px 0 10px 0"
      }}>
        <div style={{
          position: "absolute", top: 32, right: 32, display: "flex", alignItems: "center", gap: 12
        }}>
          <span style={{
            fontWeight: 600, color: "#365", background: "#f6f8fd", borderRadius: 7,
            padding: "6px 14px", fontSize: 16
          }}>
            {user.isAnonymous ? "게스트" : user.displayName || user.email}
          </span>
          <button onClick={handleLogout} style={{
            padding: "7px 16px", borderRadius: 7,
            background: "linear-gradient(90deg,#e8eafc 60%,#c1c8ef 100%)",
            color: mainColor, border: "none", fontWeight: 700, cursor: "pointer",
            boxShadow: "0 1px 6px #e7ebfc7e"
          }}>로그아웃</button>
        </div>
      </div>

      <main style={{
        maxWidth: 540, margin: "30px auto 0 auto", background: "#fff",
        borderRadius: 20, boxShadow: "0 2px 24px #bed3eb1c", padding: 24, minHeight: 360
      }}>
        <TripList familyId={familyId} onTripSelect={setTripId} />
      </main>
    </div>
  );
}

const loginBtnStyle = {
  width: "100%",
  padding: "12px 0",
  fontSize: 16,
  borderRadius: 10,
  background: "#3663f7",
  color: "#fff",
  border: "none",
  fontWeight: 700,
  cursor: "pointer",
  letterSpacing: "0.5px"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: 8,
  fontSize: 15
};

export default App;
