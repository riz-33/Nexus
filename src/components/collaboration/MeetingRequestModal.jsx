// src/components/collaboration/MeetingRequestModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Input, TimePicker, Button, Select } from "antd";
import dayjs from "dayjs";
import { useMeetings } from "../../context/MeetingsContext";

const { Option } = Select;

const MeetingRequestModal = ({ open, onClose, selectedDate, currentRole }) => {
  const role = currentRole || localStorage.getItem("role") || "entrepreneur";
  const { addRequest, oppositeRole } = useMeetings();

  const [title, setTitle] = useState("");
  const [time, setTime] = useState(null);
  const [toRole, setToRole] = useState(oppositeRole(role));

  useEffect(() => {
    setToRole(oppositeRole(role));
    setTitle("");
    setTime(null);
  }, [open, role]);

  const handleSend = () => {
    if (!selectedDate) return;
    if (!title.trim()) {
      Modal.warning({ title: "Enter meeting title" });
      return;
    }
    const req = {
      id: Date.now(),
      date: selectedDate.format("YYYY-MM-DD"),
      time: time ? time.format("HH:mm") : null,
      title: title.trim(),
      fromRole: role,
      toRole,
      status: "pending",
      createdAt: dayjs().toISOString(),
    };
    addRequest(req);
    onClose();
  };

  return (
    <Modal title="Send Meeting Request" open={open} onOk={handleSend} onCancel={onClose} okText="Send">
      <p>
        Date: <b>{selectedDate ? selectedDate.format("DD MMM YYYY") : ""}</b>
      </p>

      <div style={{ marginBottom: 8 }}>
        <TimePicker value={time} onChange={(v) => setTime(v)} format="HH:mm" style={{ width: "100%" }} />
      </div>

      <Input
        placeholder="Meeting title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: 8 }}
      />

      <div>
        <label style={{ marginRight: 8 }}>Send to:</label>
        <Select value={toRole} onChange={setToRole} style={{ width: 180 }}>
          <Option value="investor">Investor</Option>
          <Option value="entrepreneur">Entrepreneur</Option>
        </Select>
      </div>
    </Modal>
  );
};

export default MeetingRequestModal;
