import React, { useState } from "react";
import { Badge, Calendar, Modal, Input } from "antd";
import dayjs from "dayjs";

const MeetingCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  // Open modal when date is selected
  const handleSelect = (value) => {
    setSelectedDate(value);
    setOpen(true);
  };

  // Add meeting
  const handleAddEvent = () => {
    if (!title.trim()) return;

    const newEvent = {
      id: Date.now(),
      date: selectedDate.format("YYYY-MM-DD"),
      title,
    };

    setEvents([...events, newEvent]);
    setTitle("");
    setOpen(false);
  };

  // Delete meeting
  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  // Render meetings in date cell
  const dateCellRender = (value) => {
    const formattedDate = value.format("YYYY-MM-DD");
    const dailyEvents = events.filter((e) => e.date === formattedDate);

    return (
      <ul style={{ paddingLeft: 10 }}>
        {dailyEvents.map((event) => (
          <li
            key={event.id}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Badge status="processing" text={event.title} />

            <span
              onClick={() => deleteEvent(event.id)}
              style={{
                cursor: "pointer",
                color: "red",
                marginLeft: 8,
                fontWeight: "bold",
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
      <Calendar dateCellRender={dateCellRender} onSelect={handleSelect} />

      {/* Meeting Add Modal */}
      <Modal
        title="Add Meeting"
        open={open}
        onOk={handleAddEvent}
        onCancel={() => setOpen(false)}
        okText="Add"
      >
        <p>
          Date:{" "}
          <b>{selectedDate ? selectedDate.format("DD MMM YYYY") : ""}</b>
        </p>
        <Input
          placeholder="Meeting Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default MeetingCalendar;
