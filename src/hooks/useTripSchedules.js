import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export function useTripSchedules(familyId, tripId) {
  const [schedules, setSchedules] = useState([]);
  useEffect(() => {
    if (!familyId || !tripId) return;
    const q = collection(db, "families", familyId, "trips", tripId, "schedules");
    const unsub = onSnapshot(q, (snapshot) => {
      setSchedules(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, [familyId, tripId]);

  const addSchedule = async (schedule) => {
    await addDoc(collection(db, "families", familyId, "trips", tripId, "schedules"), schedule);
  };
  const updateSchedule = async (scheduleId, data) => {
    await updateDoc(doc(db, "families", familyId, "trips", tripId, "schedules", scheduleId), data);
  };
  const deleteSchedule = async (scheduleId) => {
    await deleteDoc(doc(db, "families", familyId, "trips", tripId, "schedules", scheduleId));
  };

  return { schedules, addSchedule, updateSchedule, deleteSchedule };
}
