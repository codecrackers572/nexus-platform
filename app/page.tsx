"use client";
import { useState } from "react";

export default function HomePage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    { icon: "📅", title: "Smart Scheduling", desc: "Book meetings with investors and entrepreneurs seamlessly", color: "indigo" },
    { icon: "🎥", title: "Video Calls", desc: "Face to face meetings with built-in controls", color: "blue" },
    { icon: "📄", title: "Document Chamber", desc: "Upload, review and e-sign deals securely", color: "purple" },
    { icon: "💳", title: "Payments", desc: "Deposit, withdraw and fund deals instantly", color: "emerald" },
    { icon: "🔒", title: "Security", desc: "2FA protection and role-based access control", color: "amber" },
    { icon: "🤝", title: "Deal Flow", desc: "Connect investors with the right entrepreneurs", color: "rose" },
  ];

  const stats = [
    { value: "500+", label: "Investors" },
    { value: "$2.4M", label: "Funds Raised" },
    { value: "120+", label: "Startups" },
    { value: "98%", label: "Success Rate" },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a]">

      {/* Navbar */}
      <nav className="bg-[#1e293b]/80 backdrop-blur-sm border-b border-[#334155] px-4 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
            <span className="text-white font-bold text-xl">Nexus</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="text-slate-400 hover:text-white text-sm font-medium transition-all"
            >
              Login
            </a>
            <a
              href="/register"
              className="nexus-btn-primary text-sm py-2 px-4"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-600/20 border border-indigo-500/30 rounded-full px-4 py-2 mb-6">
          <span className="text-indigo-400 text-sm font-semibold">
            🚀 Investor & Entrepreneur Platform
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Where Investors Meet
          <span className="text-indigo-400"> Great Ideas</span>
        </h1>

        <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
          Nexus connects visionary investors with innovative entrepreneurs.
          Schedule meetings, sign deals, and fund the future — all in one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="/register"
            className="nexus-btn-primary text-base py-4 px-8"
          >
            💼 Join as Investor
          </a>
          <a
            href="/register"
            className="nexus-btn-secondary text-base py-4 px-8"
          >
            🚀 Join as Entrepreneur
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="nexus-card text-center">
              <div className="text-2xl font-bold text-indigo-400">{stat.value}</div>
              <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="text-left mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-2">
            Everything You Need
          </h2>
          <p className="text-slate-400 text-center mb-8">
            Powerful features for modern deal-making
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
                className={`nexus-card transition-all duration-200 ${
                  hoveredFeature === i ? "border-indigo-500/50 bg-indigo-600/5" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                    <p className="text-slate-400 text-sm">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Ready to Get Started?
          </h2>
          <p className="text-indigo-200 mb-6">
            Join hundreds of investors and entrepreneurs on Nexus
          </p>
          <a
            href="/register"
            className="inline-block bg-white text-indigo-600 font-bold py-3 px-8 rounded-xl hover:bg-indigo-50 transition-all"
          >
            Create Free Account →
          </a>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-[#334155] text-center">
          <p className="text-slate-500 text-sm">
            © 2026 Nexus Platform · Built for Investors & Entrepreneurs
          </p>
        </div>
      </div>
    </div>
  );
}