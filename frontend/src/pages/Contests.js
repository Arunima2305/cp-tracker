import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";

export default function ContestsCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchCodeforces() {
      try {
        const res = await axios.get("https://codeforces.com/api/contest.list?gym=false");
        const contests = res.data.result.map(c => ({
          title: c.name,
          start: new Date(c.startTimeSeconds * 1000).toISOString(),
          end: new Date((c.startTimeSeconds + c.durationSeconds) * 1000).toISOString(),
          url: `https://codeforces.com/contests/${c.id}`,
          backgroundColor:
            c.phase === "BEFORE"
              ? "#74c0fc"
              : c.phase === "CODING"
              ? "#51cf66"
              : "#adb5bd",
          borderColor:
            c.phase === "BEFORE"
              ? "#1f8ef1"
              : c.phase === "CODING"
              ? "#229954"
              : "#868e96",
        }));
        setEvents(contests);
      } catch (e) {
        setEvents([]);
      }
    }
    fetchCodeforces();
  }, []);

  return (
    <div className="p-8 bg-[#f6f4ee] min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-6">
        <h1 className="text-3xl font-bold mb-4">All Coding Contests</h1>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={info => {
            info.jsEvent.preventDefault();
            window.open(info.event.url, "_blank");
          }}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek"
          }}
          height="auto"
        />
      </div>
    </div>
  );
}
