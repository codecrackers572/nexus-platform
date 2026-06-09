"use client";
import { useState } from "react";

export default function InvestorDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: "Total Invested", value: "$248,500", icon: "💰", change: "+12.5%" },
    { label: "Active Deals", value: "8", icon: "📊", change: "+2" },
    { label: "Portfolio Value", value: "$1.2M", icon: "📈", change: "+8.3%" },
    { label: "Returns", value: "$52,300", icon: "💵", change: "+18.2%" },
  ];

  const deals = [
    { name: "TechStart AI", sector: "AI/ML", amount: "$50,000", status: "Active", return: "+24%" },
    { name: "GreenEnergy Co", sector: "CleanTech", amount: "$35,000", status: "Pending", return: "+12%" },
    { name: "HealthPlus", sector: "HealthTech", amount: "$28,000", status: "Signed", return: "+18%" },
    { name: "EduVerse", sector: "EdTech", amount: "$15,000", status: "Active", return: "+9%" },
  ];

  const meetings = [
    { name: "Sarah Chen", role: "Entrepreneur", time: "Today, 3:00 PM", type: "Video Call" },
    { name: "Ahmed Khan", role: "Entrepreneur", time: "Tomorrow, 11:00 AM", type: "Meeting" },
    { name: "Priya Sharma", role: "Co-Investor", time: "Jun 12, 2:00 PM", type: "Video Call" },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a]">

      {/* Navbar */}
      <nav className="bg-[#1e293b] border-b border-[#334155] px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-white font-bold text-lg">Nexus</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="nexus-badge-blue">💼 Investor</span>
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
              JD
            </div>
          </div>
        </div>
      </nav>

      {/* Nav Tabs */}
      <div className="bg-[#1e293b] border-b border-[#334155] px-4">
        <div className="max-w-7xl mx-auto flex gap-1 overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: "📊" },
            { id: "calendar", label: "Calendar", icon: "📅" },
            { id: "documents", label: "Documents", icon: "📄" },
            { id: "payments", label: "Payments", icon: "💳" },
            { id: "video", label: "Video Call", icon: "🎥" },
            { id: "security", label: "Security", icon: "🔒" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id !== "overview") {
                  window.location.href = `/${tab.id}`;
                } else {
                  setActiveTab(tab.id);
                }
              }}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-indigo-500 text-indigo-400"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Welcome back, John 👋</h1>
          <p className="text-slate-400 mt-1">Here's your investment overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, i) => (
            <div key={i} className="nexus-card">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
              <div className="text-xs text-emerald-400 mt-1 font-semibold">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Active Deals */}
        <div className="nexus-card mb-6">
          <h2 className="text-lg font-bold text-white mb-4">📊 Active Deals</h2>
          <div className="space-y-3">
            {deals.map((deal, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[#334155] last:border-0">
                <div>
                  <div className="text-white font-semibold text-sm">{deal.name}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{deal.sector}</div>
                </div>
                <div className="text-right">
                  <div className="text-white text-sm font-semibold">{deal.amount}</div>
                  <div className={`text-xs mt-0.5 font-semibold ${
                    deal.status === "Active" ? "text-emerald-400" :
                    deal.status === "Pending" ? "text-amber-400" : "text-indigo-400"
                  }`}>
                    {deal.status}
                  </div>
                </div>
                <div className="text-emerald-400 text-sm font-bold ml-3">
                  {deal.return}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div className="nexus-card mb-6">
          <h2 className="text-lg font-bold text-white mb-4">📅 Upcoming Meetings</h2>
          <div className="space-y-3">
            {meetings.map((meeting, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[#334155] last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {meeting.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{meeting.name}</div>
                    <div className="text-slate-400 text-xs">{meeting.time}</div>
                  </div>
                </div>
                <span className="nexus-badge-blue text-xs">{meeting.type}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => window.location.href = "/calendar"}
            className="nexus-btn-primary w-full mt-4 text-sm"
          >
            📅 View Full Calendar
          </button>
        </div>

        {/* Quick Actions */}
        <div className="nexus-card">
          <h2 className="text-lg font-bold text-white mb-4">⚡ Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => window.location.href = "/calendar"}
              className="nexus-btn-secondary text-sm py-3"
            >
              📅 Schedule Meeting
            </button>
            <button
              onClick={() => window.location.href = "/video"}
              className="nexus-btn-secondary text-sm py-3"
            >
              🎥 Start Video Call
            </button>
            <button
              onClick={() => window.location.href = "/documents"}
              className="nexus-btn-secondary text-sm py-3"
            >
              📄 View Documents
            </button>
            <button
              onClick={() => window.location.href = "/payments"}
              className="nexus-btn-secondary text-sm py-3"
            >
              💳 Make Payment
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}