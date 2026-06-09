"use client";
import { useState } from "react";

export default function LoginPage() {
  const [role, setRole] = useState<"investor" | "entrepreneur">("investor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (role === "investor") {
      window.location.href = "/dashboard/investor";
    } else {
      window.location.href = "/dashboard/entrepreneur";
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4">
            <span className="text-2xl font-bold text-white">N</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Nexus</h1>
          <p className="text-slate-400 mt-1">Investor & Entrepreneur Platform</p>
        </div>

        {/* Card */}
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-8">

          {/* Role Toggle */}
          <div className="flex bg-[#0f172a] rounded-xl p-1 mb-6">
            <button
              onClick={() => setRole("investor")}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                role === "investor"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              💼 Investor
            </button>
            <button
              onClick={() => setRole("entrepreneur")}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                role === "entrepreneur"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              🚀 Entrepreneur
            </button>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-slate-400 mb-2 block">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="nexus-input"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-sm text-slate-400 mb-2 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="nexus-input"
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
              role === "investor"
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            Login as {role === "investor" ? "Investor 💼" : "Entrepreneur 🚀"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-[#334155]"></div>
            <span className="text-slate-500 text-xs px-3">OR</span>
            <div className="flex-1 border-t border-[#334155]"></div>
          </div>

          {/* Register */}
          <p className="text-center text-slate-400 text-sm">
            Don't have an account?{" "}
            <a href="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold">
              Sign Up
            </a>
          </p>
        </div>

        {/* Demo hint */}
        <p className="text-center text-slate-600 text-xs mt-4">
          Demo: any email & password works
        </p>
      </div>
    </div>
  );
}