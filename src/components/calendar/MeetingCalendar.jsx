import React, { useState } from "react";
import dayjs from "dayjs";
import { useMeetings } from "../../context/MeetingsContext";
import { useAuth } from "../../context/AuthContext";
import MeetingRequestModal from "../collaboration/MeetingRequestModal";
import {
  Calendar as AntdCalendar,
  Modal,
  Badge,
  Input,
  TimePicker,
  Button,
} from "antd";

const MeetingCalendar = ({ currentRole }) => {
  const { meetings, deleteMeeting } = useMeetings();
  const { user } = useAuth();
  const role = currentRole || (user && user.role) || "entrepreneur";
  const [selectedDate, setSelectedDate] = useState(null);
  const [openRequestModal, setOpenRequestModal] = useState(false);
  // const [events, setEvents] = useState([]);
  // const [title, setTitle] = useState("");
  // const [time, setTime] = useState(null);

  // Open modal when date is selected
  const handleSelect = (value) => {
    setSelectedDate(value);
    setOpenRequestModal(true);
  };

  // Render meetings in date cell
  const dateCellRender = (value) => {
    const dateStr = value.format("YYYY-MM-DD");
    const daily = meetings.filter((m) => m.date === dateStr);
    if (!daily.length) return null;

    return (
      <ul style={{ paddingLeft: 8 }}>
        {daily.map((event) => (
          <li
            key={event.id}
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Badge
              status="processing"
              text={`${event.time ? event.time + " — " : ""}${event.title}`}
            />

            <span
              style={{
                cursor: "pointer",
                color: "red",
                marginLeft: 8,
                fontWeight: 600,
              }}
              onClick={(e) => {
                e.stopPropagation();
                // confirm then delete
                Modal.confirm({
                  title: "Delete meeting?",
                  content: `${event.title} on ${event.date} ${
                    event.time || ""
                  }`,
                  onOk() {
                    deleteMeeting(event.id);
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
    <div
      style={{
        background: "#fff",
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        borderRadius: 8,
      }}
    >
      <AntdCalendar cellRender={dateCellRender} onSelect={handleSelect} />

      {/* Meeting Add Modal */}
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
