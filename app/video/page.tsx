"use client";
import { useState } from "react";

export default function VideoCallPage() {
  const [callActive, setCallActive] = useState(false);
  const [audioOn, setAudioOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [screenShare, setScreenShare] = useState(false);
  const [callTime, setCallTime] = useState(0);
  const [timer, setTimer] = useState<any>(null);

  const contacts = [
    { name: "John Davis", role: "Investor", status: "Online", avatar: "JD" },
    { name: "Sarah Chen", role: "Entrepreneur", status: "Online", avatar: "SC" },
    { name: "Ahmed Khan", role: "Investor", status: "Busy", avatar: "AK" },
    { name: "Priya Sharma", role: "Co-Investor", status: "Offline", avatar: "PS" },
  ];

  const startCall = () => {
    setCallActive(true);
    setCallTime(0);
    const t = setInterval(() => {
      setCallTime(prev => prev + 1);
    }, 1000);
    setTimer(t);
  };

  const endCall = () => {
    setCallActive(false);
    setScreenShare(false);
    setAudioOn(true);
    setVideoOn(true);
    if (timer) clearInterval(timer);
    setCallTime(0);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

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
          <span className="text-white font-bold text-lg">🎥 Video Call</span>
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
            JD
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Active Call UI */}
        {callActive ? (
          <div className="nexus-card mb-6">

            {/* Video Area */}
            <div className="relative bg-[#0f172a] rounded-2xl overflow-hidden mb-4"
              style={{ aspectRatio: "16/9" }}>

              {/* Main Video */}
              <div className="w-full h-full flex items-center justify-center">
                {videoOn ? (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-slate-900 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto mb-3">
                        SC
                      </div>
                      <p className="text-white font-semibold">Sarah Chen</p>
                      <p className="text-slate-400 text-sm">Entrepreneur</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-[#1e293b] flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl mb-2">📷</div>
                      <p className="text-slate-400">Camera Off</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Call Timer */}
              <div className="absolute top-3 left-3 bg-black/60 px-3 py-1 rounded-full">
                <span className="text-white text-sm font-mono">
                  🔴 {formatTime(callTime)}
                </span>
              </div>

              {/* Screen Share Badge */}
              {screenShare && (
                <div className="absolute top-3 right-3 bg-indigo-600/80 px-3 py-1 rounded-full">
                  <span className="text-white text-xs font-semibold">
                    🖥️ Screen Sharing
                  </span>
                </div>
              )}

              {/* Self Video */}
              <div className="absolute bottom-3 right-3 w-20 h-16 bg-slate-700 rounded-xl border-2 border-indigo-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">You</span>
              </div>
            </div>

            {/* Call Controls */}
            <div className="flex items-center justify-center gap-4">

              {/* Audio */}
              <button
                onClick={() => setAudioOn(!audioOn)}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all ${
                  audioOn
                    ? "bg-[#334155] hover:bg-[#475569]"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {audioOn ? "🎤" : "🔇"}
              </button>

              {/* End Call */}
              <button
                onClick={endCall}
                className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-2xl transition-all shadow-lg"
              >
                📵
              </button>

              {/* Video */}
              <button
                onClick={() => setVideoOn(!videoOn)}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all ${
                  videoOn
                    ? "bg-[#334155] hover:bg-[#475569]"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {videoOn ? "📹" : "🚫"}
              </button>

              {/* Screen Share */}
              <button
                onClick={() => setScreenShare(!screenShare)}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all ${
                  screenShare
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-[#334155] hover:bg-[#475569]"
                }`}
              >
                🖥️
              </button>
            </div>

            {/* Status Row */}
            <div className="flex justify-center gap-6 mt-4">
              <span className={`text-xs ${audioOn ? "text-emerald-400" : "text-red-400"}`}>
                {audioOn ? "🎤 Mic On" : "🔇 Mic Off"}
              </span>
              <span className={`text-xs ${videoOn ? "text-emerald-400" : "text-red-400"}`}>
                {videoOn ? "📹 Cam On" : "🚫 Cam Off"}
              </span>
              <span className={`text-xs ${screenShare ? "text-indigo-400" : "text-slate-400"}`}>
                {screenShare ? "🖥️ Sharing" : "🖥️ Not Sharing"}
              </span>
            </div>
          </div>

        ) : (

          /* Pre-Call UI */
          <div className="nexus-card mb-6 text-center">
            <div className="text-6xl mb-4">🎥</div>
            <h2 className="text-white font-bold text-xl mb-2">Start a Video Call</h2>
            <p className="text-slate-400 text-sm mb-6">
              Connect with investors and entrepreneurs face to face
            </p>
            <button
              onClick={startCall}
              className="nexus-btn-primary px-8 py-3 text-base"
            >
              🚀 Start Call Now
            </button>
          </div>
        )}

        {/* Contacts */}
        <div className="nexus-card">
          <h2 className="text-lg font-bold text-white mb-4">
            👥 Contacts
          </h2>
          <div className="space-y-3">
            {contacts.map((contact, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[#334155] last:border-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                      {contact.avatar}
                    </div>
                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#1e293b] ${
                      contact.status === "Online" ? "bg-emerald-400" :
                      contact.status === "Busy" ? "bg-amber-400" : "bg-slate-500"
                    }`}></span>
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{contact.name}</div>
                    <div className="text-slate-400 text-xs">{contact.role} · {contact.status}</div>
                  </div>
                </div>
                <button
                  onClick={startCall}
                  disabled={contact.status === "Offline"}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    contact.status === "Offline"
                      ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                >
                  📞 Call
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}