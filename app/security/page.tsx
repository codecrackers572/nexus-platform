"use client";
import { useState } from "react";

export default function SecurityPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("password");

  const getPasswordStrength = (pass: string) => {
    if (pass.length === 0) return { strength: 0, label: "", color: "" };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    if (pass.length >= 12) score++;

    if (score <= 1) return { strength: 20, label: "Very Weak", color: "bg-red-500" };
    if (score === 2) return { strength: 40, label: "Weak", color: "bg-orange-500" };
    if (score === 3) return { strength: 60, label: "Fair", color: "bg-amber-500" };
    if (score === 4) return { strength: 80, label: "Strong", color: "bg-emerald-500" };
    return { strength: 100, label: "Very Strong", color: "bg-emerald-400" };
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      if (next) (next as HTMLInputElement).focus();
    }
  };

  const handleVerifyOtp = () => {
    const code = otp.join("");
    if (code.length === 6) {
      setTwoFAEnabled(true);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handlePasswordSave = () => {
    if (password && password === confirmPassword) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setPassword("");
      setConfirmPassword("");
    }
  };

  const { strength, label, color } = getPasswordStrength(password);

  const sessions = [
    { device: "Chrome on Android", location: "Karachi, PK", time: "Now", current: true },
    { device: "Firefox on Windows", location: "Lahore, PK", time: "2 hours ago", current: false },
    { device: "Safari on iPhone", location: "Dubai, UAE", time: "Yesterday", current: false },
  ];

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
          <span className="text-white font-bold text-lg">🔒 Security</span>
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
            JD
          </div>
        </div>
      </nav>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg">
          ✅ Changes saved successfully!
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Security Score */}
        <div className="nexus-card mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-bold text-lg">Security Score</h2>
              <p className="text-slate-400 text-sm mt-1">
                {twoFAEnabled ? "Your account is well protected" : "Enable 2FA to improve security"}
              </p>
            </div>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border-4 ${
              twoFAEnabled ? "border-emerald-500 text-emerald-400" : "border-amber-500 text-amber-400"
            }`}>
              {twoFAEnabled ? "95%" : "60%"}
            </div>
          </div>
          <div className="w-full bg-[#0f172a] rounded-full h-2 mt-4">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                twoFAEnabled ? "bg-emerald-500" : "bg-amber-500"
              }`}
              style={{ width: twoFAEnabled ? "95%" : "60%" }}
            ></div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: "password", label: "🔑 Password" },
            { id: "2fa", label: "📱 2FA" },
            { id: "sessions", label: "💻 Sessions" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white"
                  : "bg-[#1e293b] text-slate-400 border border-[#334155]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Password Tab */}
        {activeTab === "password" && (
          <div className="nexus-card">
            <h2 className="text-lg font-bold text-white mb-6">🔑 Change Password</h2>

            <div className="mb-4">
              <label className="text-slate-400 text-sm mb-2 block">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="nexus-input"
              />

              {/* Password Strength Meter */}
              {password.length > 0 && (
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-slate-400">Password Strength</span>
                    <span className={`text-xs font-semibold ${
                      strength >= 80 ? "text-emerald-400" :
                      strength >= 60 ? "text-amber-400" : "text-red-400"
                    }`}>{label}</span>
                  </div>
                  <div className="w-full bg-[#0f172a] rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${color}`}
                      style={{ width: `${strength}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {[
                      { check: password.length >= 8, label: "8+ characters" },
                      { check: /[A-Z]/.test(password), label: "Uppercase letter" },
                      { check: /[0-9]/.test(password), label: "Number" },
                      { check: /[^A-Za-z0-9]/.test(password), label: "Special character" },
                    ].map((req, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className={`text-xs ${req.check ? "text-emerald-400" : "text-slate-500"}`}>
                          {req.check ? "✅" : "⭕"} {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="text-slate-400 text-sm mb-2 block">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="nexus-input"
              />
              {confirmPassword && (
                <p className={`text-xs mt-2 ${
                  password === confirmPassword ? "text-emerald-400" : "text-red-400"
                }`}>
                  {password === confirmPassword ? "✅ Passwords match" : "❌ Passwords do not match"}
                </p>
              )}
            </div>

            <button
              onClick={handlePasswordSave}
              disabled={!password || password !== confirmPassword}
              className={`nexus-btn-primary w-full ${
                !password || password !== confirmPassword ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              💾 Save Password
            </button>
          </div>
        )}

        {/* 2FA Tab */}
        {activeTab === "2fa" && (
          <div className="nexus-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">📱 Two-Factor Auth</h2>
                <p className="text-slate-400 text-sm mt-1">
                  {twoFAEnabled ? "2FA is active" : "Add extra security layer"}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                twoFAEnabled
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-slate-500/20 text-slate-400"
              }`}>
                {twoFAEnabled ? "✅ Enabled" : "❌ Disabled"}
              </div>
            </div>

            {!twoFAEnabled && (
              <>
                {!otpSent ? (
                  <div className="text-center">
                    <div className="text-5xl mb-4">📱</div>
                    <p className="text-slate-400 text-sm mb-6">
                      We'll send a 6-digit OTP to your registered phone number to verify
                    </p>
                    <button
                      onClick={() => setOtpSent(true)}
                      className="nexus-btn-primary w-full"
                    >
                      📤 Send OTP Code
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-slate-400 text-sm text-center mb-6">
                      Enter the 6-digit code sent to your phone
                    </p>

                    {/* OTP Input */}
                    <div className="flex gap-2 justify-center mb-6">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          id={`otp-${i}`}
                          type="number"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          className="w-11 h-12 bg-[#0f172a] border border-[#334155] text-white text-center text-lg font-bold rounded-xl focus:outline-none focus:border-indigo-500"
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleVerifyOtp}
                      className="nexus-btn-primary w-full mb-3"
                    >
                      ✅ Verify OTP
                    </button>
                    <button
                      onClick={() => { setOtpSent(false); setOtp(["","","","","",""]); }}
                      className="nexus-btn-secondary w-full text-sm"
                    >
                      Resend Code
                    </button>
                  </div>
                )}
              </>
            )}

            {twoFAEnabled && (
              <div className="text-center">
                <div className="text-5xl mb-4">🛡️</div>
                <p className="text-emerald-400 font-semibold mb-2">2FA Successfully Enabled!</p>
                <p className="text-slate-400 text-sm mb-6">
                  Your account is now protected with two-factor authentication
                </p>
                <button
                  onClick={() => { setTwoFAEnabled(false); setOtpSent(false); setOtp(["","","","","",""]); }}
                  className="nexus-btn-secondary w-full text-sm"
                >
                  Disable 2FA
                </button>
              </div>
            )}
          </div>
        )}

        {/* Sessions Tab */}
        {activeTab === "sessions" && (
          <div className="nexus-card">
            <h2 className="text-lg font-bold text-white mb-4">💻 Active Sessions</h2>
            <div className="space-y-3">
              {sessions.map((session, i) => (
                <div key={i} className="bg-[#0f172a] rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1e293b] rounded-xl flex items-center justify-center text-xl">
                      💻
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">{session.device}</div>
                      <div className="text-slate-400 text-xs mt-0.5">
                        📍 {session.location} · {session.time}
                      </div>
                    </div>
                  </div>
                  {session.current ? (
                    <span className="nexus-badge-green text-xs">Current</span>
                  ) : (
                    <button className="text-red-400 hover:text-red-300 text-xs font-semibold">
                      Revoke
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}