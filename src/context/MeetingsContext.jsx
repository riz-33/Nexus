// src/context/MeetingsContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useAuth } from "./AuthContext"; // path may vary - adjust if different

const LOCAL_MEETINGS = "nexus_meetings_v1";
const LOCAL_REQUESTS = "nexus_meeting_requests_v1";
const LOCAL_AVAIL = "nexus_availability_v1";

const MeetingsContext = createContext();

export const MeetingsProvider = ({ children }) => {
  const { user } = useAuth(); // to get current logged in user if needed
  const [meetings, setMeetings] = useState([]);
  const [requests, setRequests] = useState([]);
  const [availability, setAvailability] = useState([]);

  // load from localStorage once
  useEffect(() => {
    try {
      const m = JSON.parse(localStorage.getItem(LOCAL_MEETINGS) || "[]");
      const r = JSON.parse(localStorage.getItem(LOCAL_REQUESTS) || "[]");
      const a = JSON.parse(localStorage.getItem(LOCAL_AVAIL) || "[]");
      setMeetings(m);
      setRequests(r);
      setAvailability(a);
    } catch (e) {
      console.error("Error loading meetings data:", e);
    }
  }, []);

  // persist changes
  useEffect(() => {
    localStorage.setItem(LOCAL_MEETINGS, JSON.stringify(meetings));
  }, [meetings]);

  useEffect(() => {
    localStorage.setItem(LOCAL_REQUESTS, JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem(LOCAL_AVAIL, JSON.stringify(availability));
  }, [availability]);

  // helper: opposite role
  const oppositeRole = (role) =>
    role === "investor" ? "entrepreneur" : "investor";

  // Availability CRUD
  const addAvailability = (slot) => {
    setAvailability((s) => [...s, slot]);
  };
  const deleteAvailability = (id) => {
    setAvailability((s) => s.filter((x) => x.id !== id));
  };

  // Meetings CRUD
  const addMeeting = (meeting) => {
    setMeetings((m) => [...m, meeting]);
  };
  const deleteMeeting = (id) => {
    setMeetings((m) => m.filter((x) => x.id !== id));
  };

  // Requests (pending meeting requests)
  const addRequest = (request) => {
    setRequests((r) => [...r, request]);
  };

  const acceptRequest = (requestId) => {
    const req = requests.find((r) => r.id === requestId);
    if (!req) return;
    const meeting = {
      id: Date.now(),
      date: req.date,
      time: req.time,
      title: req.title,
      participants: [req.fromUserId || null, req.toUserId || null],
      createdByUserId: req.toUserId, // accepter
      status: "confirmed",
      createdAt: dayjs().toISOString(),
    };
    setMeetings((m) => [...m, meeting]);
    setRequests((r) => r.filter((x) => x.id !== requestId));
  };

  const declineRequest = (requestId) => {
    setRequests((r) => r.filter((x) => x.id !== requestId));
  };

  // counts
  const pendingCount = requests.length;
  const upcomingCount = meetings.filter((mt) =>
    dayjs(mt.date).isAfter(dayjs().subtract(1, "day"))
  ).length;

  return (
    <MeetingsContext.Provider
      value={{
        meetings,
        requests,
        availability,
        addAvailability,
        deleteAvailability,
        addMeeting,
        deleteMeeting,
        addRequest,
        acceptRequest,
        declineRequest,
        pendingCount,
        upcomingCount,
        oppositeRole,
      }}
    >
      {children}
    </MeetingsContext.Provider>
  );
};

export const useMeetings = () => useContext(MeetingsContext);
