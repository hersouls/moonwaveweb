import React, { useState } from "react";
import { useTripSchedules } from "../hooks/useTripSchedules";

export default function TripSchedules({ familyId, tripId }) {
  const { schedules, addSchedule, deleteSchedule } = useTripSchedules(familyId, tripId);
  const [input, setInput] = useState("");
  const [time, setTime] = useState("");

  return (
    <div>
      <h3>일정 목록</h3>
      <ul>
        {schedules.map(s => (
          <li key={s.id}>
            <b>{s.time}</b> {s.content || s.memo}
            <button onClick={() => deleteSchedule(s.id)}>삭제</button>
          </li>
        ))}
      </ul>
      <input
        value={time}
        onChange={e => setTime(e.target.value)}
        placeholder="시간 (예: 09:00)"
      />
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="일정 내용"
      />
      <button
        onClick={() => {
          if (!time.trim() && !input.trim()) return;
          addSchedule({ time, content: input });
          setTime("");
          setInput("");
        }}
      >
        일정 추가
      </button>
    </div>
  );
}
