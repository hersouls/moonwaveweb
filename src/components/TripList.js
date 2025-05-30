import React, { useState, useMemo, useCallback } from "react";
import { useFamilyTrips } from "../hooks/useFamilyTrips";
import TripCard from "./TripCard";
import FloatingActionButton from "./FloatingActionButton";
import AddEditTripModal from "./AddEditTripModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function TripList({ familyId, onTripSelect }) {
  const { trips, addTrip, updateTrip, deleteTrip } = useFamilyTrips(familyId);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);

  // 👇 펼쳐진 카드 idx를 상태로 관리
  const [openTripIdx, setOpenTripIdx] = useState(null);

  const orderedTrips = useMemo(
    () => [...trips].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [trips]
  );

  const handleDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;
      const items = Array.from(orderedTrips);
      const [reordered] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reordered);
      items.forEach((trip, idx) => {
        if (trip.order !== idx) updateTrip(trip.id, { order: idx });
      });
    },
    [orderedTrips, updateTrip]
  );

  const openAddModal = () => { setEditIdx(null); setModalOpen(true); };
  const openEditModal = (idx) => { setEditIdx(idx); setModalOpen(true); };
  const handleSave = (data) => {
    if (editIdx !== null) {
      updateTrip(orderedTrips[editIdx].id, data);
    } else {
      addTrip({ ...data, order: trips.length });
    }
    setModalOpen(false);
  };
  const handleDelete = (idx) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteTrip(orderedTrips[idx].id);
      setOpenTripIdx(null); // 카드 삭제 시 펼침 닫기
    }
  };

  const todayIdx = 0;
  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "28px 0 60px 0", fontFamily: "Noto Sans KR, sans-serif" }}>
      <h1 style={{ textAlign: "center", fontWeight: 900, fontSize: "2.2rem", color: "#3240a8", letterSpacing: "-1px", marginBottom: 24 }}>
        🌊 Moonwave 여행일정
      </h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="trip-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {orderedTrips.map((trip, idx) => (
                <Draggable key={trip.id} draggableId={String(trip.id)} index={idx}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={{
                        ...provided.draggableProps.style,
                        marginBottom: 18,
                        boxShadow: snapshot.isDragging ? "0 4px 24px #b2cdfa55" : undefined
                      }}
                    >
                      <TripCard
                        trip={trip}
                        dragHandleProps={provided.dragHandleProps}
                        isOpen={openTripIdx === idx} // 👈 펼쳐진 카드만 상세 보임
                        onClick={() => setOpenTripIdx(openTripIdx === idx ? null : idx)}
                        isToday={idx === todayIdx}
                        onEdit={() => openEditModal(idx)}
                        onDelete={() => handleDelete(idx)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <FloatingActionButton actions={[
        { label: "일정 추가", icon: "＋", onClick: openAddModal },
        { label: "오늘로 이동", icon: "⤵️", onClick: () => setOpenTripIdx(todayIdx) }
      ]} />
      <AddEditTripModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initData={editIdx !== null ? orderedTrips[editIdx] : null}
      />
    </div>
  );
}
