// src/pages/calendar/MeetingsPage.jsx
import React from "react";
import MeetingCalendar from "../../components/calendar/MeetingCalendar";
import AvailabilitySlots from "../../components/calendar/AvailabilitySlots";
import RequestsList from "../../components/collaboration/RequestsList";
import { useAuth } from "../../context/AuthContext";

export const MeetingsPage = ({ role }) => {
  const { user } = useAuth();
  const r = role || (user && user.role) || "entrepreneur";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16 }}>
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Meeting Calendar</h1>
        <MeetingCalendar currentRole={r} />
      </div>

      <aside style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <AvailabilitySlots forRole={r} />
        <div style={{ background: "#fff", padding: 12, borderRadius: 8 }}>
          <h3 style={{ marginBottom: 8 }}>Pending Requests</h3>
          <RequestsList currentRole={r} />
        </div>
      </aside>
    </div>
  );
};
