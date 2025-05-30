// src/hooks/useFamilyTrips.js
import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export function useFamilyTrips(familyId) {
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    if (!familyId) return;
    const tripsRef = collection(db, "families", familyId, "trips");
    const unsub = onSnapshot(tripsRef, (snapshot) => {
      setTrips(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, [familyId]);

  const addTrip = async (trip) => {
    await addDoc(collection(db, "families", familyId, "trips"), trip);
  };
  const updateTrip = async (tripId, data) => {
    await updateDoc(doc(db, "families", familyId, "trips", tripId), data);
  };
  const deleteTrip_ = async (tripId) => {
    await deleteDoc(doc(db, "families", familyId, "trips", tripId));
  };

  return { trips, addTrip, updateTrip, deleteTrip: deleteTrip_ };
}
