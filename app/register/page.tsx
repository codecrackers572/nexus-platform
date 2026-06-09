"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"investor" | "entrepreneur">("investor");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");

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

  const handleFinish = () => {
    if (role === "investor") {
      window.location.href = "/dashboard/investor";
    } else {
      window.location.href = "/dashboard/entrepreneur";
    }
  };

  const { strength, label, color } = getPasswordStrength(password);

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4">
            <span className="text-2xl font-bold text-white">N</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Join Nexus</h1>
          <p className="text-slate-400 mt-1">Create your account</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step >= s
                  ? "bg-indigo-600 text-white"
                  : "bg-[#1e293b] text-slate-400 border border-[#334155]"
              }`}>
                {step > s ? "✓" : s}
              </div>
              {s < 3 && (
                <div className={`w-8 h-0.5 ${
                  step > s ? "bg-indigo-600" : "bg-[#334155]"
                }`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-8">

          {/* Step 1 - Role Selection */}
          {step === 1 && (
            <div>
              <h2 className="text-white font-bold text-xl mb-2">Choose Your Role</h2>
              <p className="text-slate-400 text-sm mb-6">
                How will you use Nexus?
              </p>

              <div className="space-y-3 mb-6">
                <button
                  onClick={() => setRole("investor")}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    role === "investor"
                      ? "border-indigo-500 bg-indigo-600/10"
                      : "border-[#334155] hover:border-[#475569]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">💼</span>
                    <div>
                      <div className="text-white font-semibold">Investor</div>
                      <div className="text-slate-400 text-xs mt-0.5">
                        Discover and fund promising startups
                      </div>
                    </div>
                    {role === "investor" && (
                      <span className="ml-auto text-indigo-400">✓</span>
                    )}
                  </div>
                </button>

                <button
                  onClick={() => setRole("entrepreneur")}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    role === "entrepreneur"
                      ? "border-emerald-500 bg-emerald-600/10"
                      : "border-[#334155] hover:border-[#475569]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🚀</span>
                    <div>
                      <div className="text-white font-semibold">Entrepreneur</div>
                      <div className="text-slate-400 text-xs mt-0.5">
                        Raise funds and grow your startup
                      </div>
                    </div>
                    {role === "entrepreneur" && (
                      <span className="ml-auto text-emerald-400">✓</span>
                    )}
                  </div>
                </button>
              </div>

              <button
                onClick={() => setStep(2)}
                className="nexus-btn-primary w-full"
              >
                Continue →
              </button>
            </div>
          )}

          {/* Step 2 - Personal Info */}
          {step === 2 && (
            <div>
              <h2 className="text-white font-bold text-xl mb-2">Personal Info</h2>
              <p className="text-slate-400 text-sm mb-6">Tell us about yourself</p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-slate-400 text-sm mb-2 block">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Davis"
                    className="nexus-input"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-sm mb-2 block">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="nexus-input"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-sm mb-2 block">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="nexus-input"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-sm mb-2 block">
                    {role === "investor" ? "Investment Firm" : "Startup Name"}
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={role === "investor" ? "Davis Capital" : "TechStart AI"}
                    className="nexus-input"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="nexus-btn-secondary flex-1"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!name || !email}
                  className={`flex-1 py-3 rounded-xl font-semibold text-white transition-all ${
                    name && email
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-slate-600 cursor-not-allowed"
                  }`}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 3 - Password */}
          {step === 3 && (
            <div>
              <h2 className="text-white font-bold text-xl mb-2">Set Password</h2>
              <p className="text-slate-400 text-sm mb-6">Create a strong password</p>

              <div className="mb-4">
                <label className="text-slate-400 text-sm mb-2 block">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="nexus-input"
                />

                {password.length > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-slate-400">Strength</span>
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
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="bg-[#0f172a] rounded-xl p-4 mb-6">
                <p className="text-slate-400 text-xs mb-2 font-semibold">Account Summary</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Role</span>
                    <span className={role === "investor" ? "text-indigo-400" : "text-emerald-400"}>
                      {role === "investor" ? "💼 Investor" : "🚀 Entrepreneur"}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Name</span>
                    <span className="text-white">{name}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Email</span>
                    <span className="text-white">{email}</span>
                  </div>
                  {company && (
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Company</span>
                      <span className="text-white">{company}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="nexus-btn-secondary flex-1"
                >
                  ← Back
                </button>
                <button
                  onClick={handleFinish}
                  disabled={!password || strength < 40}
                  className={`flex-1 py-3 rounded-xl font-semibold text-white transition-all ${
                    password && strength >= 40
                      ? role === "investor"
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-slate-600 cursor-not-allowed"
                  }`}
                >
                  🚀 Create Account
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Login Link */}
        <p className="text-center text-slate-400 text-sm mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}