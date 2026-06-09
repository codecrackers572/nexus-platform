"use client";
import { useState } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function CalendarPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingType, setMeetingType] = useState("Video Call");
  const [activeFilter, setActiveFilter] = useState("All");

  const [meetings, setMeetings] = useState([
    { id: 1, date: 9, title: "Investor Pitch", time: "10:00 AM", type: "Video Call", status: "Confirmed" },
    { id: 2, date: 11, title: "Deal Review", time: "2:00 PM", type: "Meeting", status: "Pending" },
    { id: 3, date: 14, title: "Portfolio Update", time: "11:00 AM", type: "Video Call", status: "Confirmed" },
    { id: 4, date: 18, title: "Contract Signing", time: "3:00 PM", type: "Meeting", status: "Pending" },
  ]);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleAddMeeting = () => {
    if (!meetingTitle || !meetingTime || !selectedDate) return;
    const newMeeting = {
      id: meetings.length + 1,
      date: selectedDate,
      title: meetingTitle,
      time: meetingTime,
      type: meetingType,
      status: "Pending",
    };
    setMeetings([...meetings, newMeeting]);
    setMeetingTitle("");
    setMeetingTime("");
    setShowModal(false);
  };

  const handleAccept = (id: number) => {
    setMeetings(meetings.map(m =>
      m.id === id ? { ...m, status: "Confirmed" } : m
    ));
  };

  const handleDecline = (id: number) => {
    setMeetings(meetings.filter(m => m.id !== id));
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const filteredMeetings = meetings.filter(m => {
    if (activeFilter === "All") return true;
    return m.status === activeFilter;
  });

  const meetingDates = meetings.map(m => m.date);

  return (
    <div className="min-h-screen bg-[#0f172a]">

      {/* Navbar */}
      <nav className="bg-[#1e293b] border-b border-[#334155] px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="text-slate-400 hover:text-white flex items-center gap-2 text-sm"
          >
            ← Back
          </button>
          <span className="text-white font-bold text-lg">📅 Calendar</span>
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
            JD
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Calendar Card */}
        <div className="nexus-card mb-6">

          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevMonth}
              className="w-9 h-9 bg-[#0f172a] rounded-xl flex items-center justify-center text-slate-400 hover:text-white"
            >
              ‹
            </button>
            <h2 className="text-white font-bold text-lg">
              {MONTHS[currentMonth]} {currentYear}
            </h2>
            <button
              onClick={nextMonth}
              className="w-9 h-9 bg-[#0f172a] rounded-xl flex items-center justify-center text-slate-400 hover:text-white"
            >
              ›
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(day => (
              <div key={day} className="text-center text-xs text-slate-500 font-semibold py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array(firstDay).fill(null).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array(daysInMonth).fill(null).map((_, i) => {
              const day = i + 1;
              const isToday =
                day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear();
              const hasMeeting = meetingDates.includes(day);
              const isSelected = selectedDate === day;

              return (
                <button
                  key={day}
                  onClick={() => {
                    setSelectedDate(day);
                    setShowModal(true);
                  }}
                  className={`relative aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-medium transition-all ${
                    isSelected
                      ? "bg-indigo-600 text-white"
                      : isToday
                      ? "bg-indigo-600/30 text-indigo-400 border border-indigo-500"
                      : "text-slate-300 hover:bg-[#334155]"
                  }`}
                >
                  {day}
                  {hasMeeting && (
                    <span className="absolute bottom-1 w-1 h-1 bg-emerald-400 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {["All", "Confirmed", "Pending"].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? "bg-indigo-600 text-white"
                  : "bg-[#1e293b] text-slate-400 border border-[#334155]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Meetings List */}
        <div className="nexus-card">
          <h2 className="text-lg font-bold text-white mb-4">
            📋 Meetings ({filteredMeetings.length})
          </h2>
          {filteredMeetings.length === 0 ? (
            <p className="text-slate-400 text-center py-6">No meetings found</p>
          ) : (
            <div className="space-y-3">
              {filteredMeetings.map((meeting) => (
                <div key={meeting.id} className="bg-[#0f172a] rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-white font-semibold">{meeting.title}</div>
                      <div className="text-slate-400 text-xs mt-1">
                        📅 June {meeting.date} · ⏰ {meeting.time}
                      </div>
                      <div className="text-slate-400 text-xs mt-0.5">
                        🎥 {meeting.type}
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      meeting.status === "Confirmed"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}>
                      {meeting.status}
                    </span>
                  </div>
                  {meeting.status === "Pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAccept(meeting.id)}
                        className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-all"
                      >
                        ✅ Accept
                      </button>
                      <button
                        onClick={() => handleDecline(meeting.id)}
                        className="flex-1 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 text-xs font-semibold rounded-lg transition-all"
                      >
                        ❌ Decline
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Meeting Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-end justify-center z-50 px-4 pb-6">
          <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-white font-bold text-lg mb-4">
              📅 Add Meeting — June {selectedDate}
            </h3>

            <div className="mb-4">
              <label className="text-slate-400 text-sm mb-2 block">Meeting Title</label>
              <input
                type="text"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                placeholder="e.g. Investor Pitch"
                className="nexus-input"
              />
            </div>

            <div className="mb-4">
              <label className="text-slate-400 text-sm mb-2 block">Time</label>
              <input
                type="time"
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
                className="nexus-input"
              />
            </div>

            <div className="mb-6">
              <label className="text-slate-400 text-sm mb-2 block">Type</label>
              <div className="flex gap-2">
                {["Video Call", "Meeting", "Call"].map(type => (
                  <button
                    key={type}
                    onClick={() => setMeetingType(type)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                      meetingType === type
                        ? "bg-indigo-600 text-white"
                        : "bg-[#0f172a] text-slate-400 border border-[#334155]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="nexus-btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMeeting}
                className="nexus-btn-primary flex-1"
              >
                Add Meeting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}