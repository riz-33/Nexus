// src/components/calendar/AvailabilitySlots.jsx
import React, { useState } from "react";
import { List, TimePicker, Input, Button, Modal } from "antd";
import dayjs from "dayjs";
import { useMeetings } from "../../context/MeetingsContext";
import { useAuth } from "../../context/AuthContext";

const AvailabilitySlots = ({ forRole }) => {
  const { availability, addAvailability, deleteAvailability } = useMeetings();
  const { user } = useAuth();
  const role = forRole || (user && user.role) || "entrepreneur";

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [day, setDay] = useState(dayjs().format("YYYY-MM-DD"));

  const handleAdd = () => {
    if (!start || !end) {
      Modal.warning({ title: "Select start and end time" });
      return;
    }
    const slot = {
      id: Date.now(),
      day,
      start: start.format("HH:mm"),
      end: end.format("HH:mm"),
      role,
    };
    addAvailability(slot);
    setStart(null);
    setEnd(null);
  };

  return (
    <div style={{ background: "#fff", padding: 12, borderRadius: 8 }}>
      <h3 style={{ marginBottom: 8 }}>Availability Slots ({role})</h3>
      <div style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
        <Input value={day} onChange={(e) => setDay(e.target.value)} style={{ width: 120 }} />
        <TimePicker value={start} onChange={(v) => setStart(v)} format="HH:mm" />
        <TimePicker value={end} onChange={(v) => setEnd(v)} format="HH:mm" />
        <Button onClick={handleAdd}>Add Slot</Button>
      </div>

      <List
        size="small"
        bordered
        dataSource={availability.filter((a) => a.role === role)}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button key="del" danger onClick={() => deleteAvailability(item.id)}>
                Delete
              </Button>,
            ]}
          >
            {item.day} — {item.start} to {item.end}
          </List.Item>
        )}
      />
    </div>
  );
};

export default AvailabilitySlots;
