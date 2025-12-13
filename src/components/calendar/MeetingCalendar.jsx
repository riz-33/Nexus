// src/components/calendar/MeetingCalendar.jsx
import React, { useState } from "react";
import { Calendar as AntdCalendar, Modal, Badge } from "antd";
import dayjs from "dayjs";
import { useMeetings } from "../../context/MeetingsContext";
import { useAuth } from "../../context/AuthContext";
import MeetingRequestModal from "../collaboration/MeetingRequestModal";

const MeetingCalendar = ({ currentRole }) => {
  const { meetings, deleteMeeting } = useMeetings();
  const { user } = useAuth();
  const role = currentRole || (user && user.role) || "entrepreneur";

  const [selectedDate, setSelectedDate] = useState(null);
  const [openRequestModal, setOpenRequestModal] = useState(false);

  const handleSelect = (value) => {
    setSelectedDate(value);
    setOpenRequestModal(true);
  };

  const dateCellRender = (value) => {
    const dateStr = value.format("YYYY-MM-DD");
    const daily = meetings.filter((m) => m.date === dateStr);
    if (!daily.length) return null;

    return (
      <ul style={{ paddingLeft: 8 }}>
        {daily.map((ev) => (
          <li
            key={ev.id}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Badge status="processing" text={`${ev.time ? ev.time + " — " : ""}${ev.title}`} />
            <span
              style={{ marginLeft: 8, cursor: "pointer", color: "red", fontWeight: "600" }}
              onClick={(e) => {
                e.stopPropagation();
                Modal.confirm({
                  title: "Delete meeting?",
                  content: `${ev.title} on ${ev.date} ${ev.time || ""}`,
                  onOk() {
                    deleteMeeting(ev.id);
                  },
                });
              }}
            >
              ✕
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={{ background: "#fff", padding: 16, borderRadius: 8 }}>
      <AntdCalendar dateCellRender={dateCellRender} onSelect={handleSelect} />
      <MeetingRequestModal
        open={openRequestModal}
        onClose={() => setOpenRequestModal(false)}
        selectedDate={selectedDate}
        currentRole={role}
        currentUser={user}
      />
    </div>
  );
};

export default MeetingCalendar;
