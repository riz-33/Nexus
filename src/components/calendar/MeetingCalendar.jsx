import React, { useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";

const MeetingCalendar = () => {
  // const [events, setEvents] = useState([]);

  // Slot select handler (user selects date/time)
  // const handleSelect = (info) => {
  //   const title = prompt("Enter Meeting Title:");
  //   if (title) {
  //     const newEvent = {
  //       title,
  //       start: info.startStr,
  //       end: info.endStr,
  //     };
  //     setEvents([...events, newEvent]);
  //   }
  // };

  // Clicking event (accept/decline meeting mock)
  // const handleEventClick = (info) => {
  //   const action = window.confirm(
  //     `Do you want to delete meeting: ${info.event.title}?`
  //   );
  //   if (action) info.event.remove();
  // };

  return (
    <div style={{ background: "#fff", padding: 20, borderRadius: 8 }}>
      {/* <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        select={handleSelect}
        events={events}
        eventClick={handleEventClick}
        height="80vh"
      /> */}
    </div>
  );
};

export default MeetingCalendar;
