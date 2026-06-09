"use client";
import { useState } from "react";

export default function EntrepreneurDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: "Funds Raised", value: "$124,000", icon: "💰", change: "+22.5%" },
    { label: "Active Investors", value: "6", icon: "👥", change: "+1" },
    { label: "Pitch Views", value: "1,240", icon: "👁️", change: "+15%" },
    { label: "Deals Closed", value: "3", icon: "🤝", change: "+1" },
  ];

  const investors = [
    { name: "John Davis", amount: "$50,000", status: "Active", sector: "AI/ML" },
    { name: "Maria Lopez", amount: "$35,000", status: "Pending", sector: "FinTech" },
    { name: "Robert Kim", amount: "$28,000", status: "Signed", sector: "General" },
    { name: "Lisa Wang", amount: "$11,000", status: "Active", sector: "SaaS" },
  ];

  const tasks = [
    { task: "Submit Q2 Financial Report", due: "Today", priority: "High" },
    { task: "Review Investment Agreement", due: "Tomorrow", priority: "High" },
    { task: "Update Pitch Deck", due: "Jun 13", priority: "Medium" },
    { task: "Schedule Demo Call", due: "Jun 14", priority: "Low" },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a]">

      {/* Navbar */}
      <nav className="bg-[#1e293b] border-b border-[#334155] px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-white font-bold text-lg">Nexus</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="nexus-badge-green">🚀 Entrepreneur</span>
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-sm font-bold">
              AK
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
                  ? "border-emerald-500 text-emerald-400"
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
          <h1 className="text-2xl font-bold text-white">Welcome back, Ahmed 👋</h1>
          <p className="text-slate-400 mt-1">Here's your startup overview</p>
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

        {/* Funding Progress */}
        <div className="nexus-card mb-6">
          <h2 className="text-lg font-bold text-white mb-4">🎯 Funding Goal</h2>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400">Raised: $124,000</span>
            <span className="text-slate-400">Goal: $250,000</span>
          </div>
          <div className="w-full bg-[#0f172a] rounded-full h-3">
            <div
              className="bg-emerald-500 h-3 rounded-full transition-all"
              style={{ width: "49.6%" }}
            ></div>
          </div>
          <p className="text-emerald-400 text-sm font-semibold mt-2">49.6% Complete</p>
        </div>

        {/* Investors */}
        <div className="nexus-card mb-6">
          <h2 className="text-lg font-bold text-white mb-4">👥 My Investors</h2>
          <div className="space-y-3">
            {investors.map((inv, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[#334155] last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {inv.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{inv.name}</div>
                    <div className="text-slate-400 text-xs">{inv.sector}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white text-sm font-semibold">{inv.amount}</div>
                  <div className={`text-xs mt-0.5 font-semibold ${
                    inv.status === "Active" ? "text-emerald-400" :
                    inv.status === "Pending" ? "text-amber-400" : "text-indigo-400"
                  }`}>
                    {inv.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div className="nexus-card mb-6">
          <h2 className="text-lg font-bold text-white mb-4">✅ Pending Tasks</h2>
          <div className="space-y-3">
            {tasks.map((t, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[#334155] last:border-0">
                <div>
                  <div className="text-white text-sm font-semibold">{t.task}</div>
                  <div className="text-slate-400 text-xs mt-0.5">Due: {t.due}</div>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  t.priority === "High" ? "bg-red-500/20 text-red-400" :
                  t.priority === "Medium" ? "bg-amber-500/20 text-amber-400" :
                  "bg-slate-500/20 text-slate-400"
                }`}>
                  {t.priority}
                </span>
              </div>
            ))}
          </div>
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
              📄 Upload Document
            </button>
            <button
              onClick={() => window.location.href = "/payments"}
              className="nexus-btn-secondary text-sm py-3"
            >
              💳 View Wallet
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}