"use client";
import { useState } from "react";

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [showSignModal, setShowSignModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [signature, setSignature] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const [documents, setDocuments] = useState([
    { id: 1, name: "Investment Agreement - TechStart AI", type: "Contract", size: "2.4 MB", status: "Signed", date: "Jun 5, 2026", icon: "📄" },
    { id: 2, name: "Term Sheet - GreenEnergy Co", type: "Term Sheet", size: "1.1 MB", status: "In Review", date: "Jun 7, 2026", icon: "📋" },
    { id: 3, name: "NDA - HealthPlus", type: "NDA", size: "0.8 MB", status: "Draft", date: "Jun 8, 2026", icon: "🔒" },
    { id: 4, name: "Pitch Deck - EduVerse", type: "Presentation", size: "5.2 MB", status: "In Review", date: "Jun 9, 2026", icon: "📊" },
    { id: 5, name: "Financial Report Q1", type: "Report", size: "3.1 MB", status: "Signed", date: "Jun 1, 2026", icon: "💰" },
  ]);

  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    const newDoc = {
      id: documents.length + 1,
      name: file.name,
      type: "Document",
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      status: "Draft",
      date: "Jun 9, 2026",
      icon: "📄",
    };
    setDocuments([newDoc, ...documents]);
  };

  const handleSign = () => {
    if (!signature) return;
    setDocuments(documents.map(d =>
      d.id === selectedDoc.id ? { ...d, status: "Signed" } : d
    ));
    setShowSignModal(false);
    setSignature("");
  };

  const filteredDocs = documents.filter(d => {
    if (activeTab === "all") return true;
    if (activeTab === "draft") return d.status === "Draft";
    if (activeTab === "review") return d.status === "In Review";
    if (activeTab === "signed") return d.status === "Signed";
    return true;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Signed": return "bg-emerald-500/20 text-emerald-400";
      case "In Review": return "bg-amber-500/20 text-amber-400";
      case "Draft": return "bg-slate-500/20 text-slate-400";
      default: return "bg-slate-500/20 text-slate-400";
    }
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
          <span className="text-white font-bold text-lg">📄 Documents</span>
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
            JD
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Upload Area */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const file = e.dataTransfer.files[0];
            if (file) {
              const newDoc = {
                id: documents.length + 1,
                name: file.name,
                type: "Document",
                size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
                status: "Draft",
                date: "Jun 9, 2026",
                icon: "📄",
              };
              setDocuments([newDoc, ...documents]);
            }
          }}
          className={`nexus-card mb-6 text-center border-2 border-dashed transition-all ${
            dragOver ? "border-indigo-500 bg-indigo-600/10" : "border-[#334155]"
          }`}
        >
          <div className="text-4xl mb-3">📁</div>
          <p className="text-white font-semibold mb-1">Upload Document</p>
          <p className="text-slate-400 text-sm mb-4">
            Drag & drop or tap to upload PDF, DOC, PPTX
          </p>
          <label className="nexus-btn-primary cursor-pointer px-6 py-2 text-sm">
            Choose File
            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.pptx"
              onChange={handleUpload}
            />
          </label>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Total", value: documents.length, color: "text-white" },
            { label: "In Review", value: documents.filter(d => d.status === "In Review").length, color: "text-amber-400" },
            { label: "Signed", value: documents.filter(d => d.status === "Signed").length, color: "text-emerald-400" },
          ].map((stat, i) => (
            <div key={i} className="nexus-card text-center py-4">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-slate-400 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {[
            { id: "all", label: "All" },
            { id: "draft", label: "Draft" },
            { id: "review", label: "In Review" },
            { id: "signed", label: "Signed" },
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

        {/* Documents List */}
        <div className="nexus-card">
          <h2 className="text-lg font-bold text-white mb-4">
            📋 Documents ({filteredDocs.length})
          </h2>
          <div className="space-y-3">
            {filteredDocs.map((doc) => (
              <div key={doc.id} className="bg-[#0f172a] rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{doc.icon}</span>
                    <div>
                      <div className="text-white font-semibold text-sm">{doc.name}</div>
                      <div className="text-slate-400 text-xs mt-0.5">
                        {doc.type} · {doc.size} · {doc.date}
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusStyle(doc.status)}`}>
                    {doc.status}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-[#1e293b] hover:bg-[#334155] text-slate-300 text-xs font-semibold rounded-lg transition-all border border-[#334155]">
                    👁️ Preview
                  </button>
                  {doc.status !== "Signed" && (
                    <button
                      onClick={() => {
                        setSelectedDoc(doc);
                        setShowSignModal(true);
                      }}
                      className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-all"
                    >
                      ✍️ Sign
                    </button>
                  )}
                  <button className="flex-1 py-2 bg-[#1e293b] hover:bg-[#334155] text-slate-300 text-xs font-semibold rounded-lg transition-all border border-[#334155]">
                    ⬇️ Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* E-Sign Modal */}
      {showSignModal && selectedDoc && (
        <div className="fixed inset-0 bg-black/70 flex items-end justify-center z-50 px-4 pb-6">
          <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-white font-bold text-lg mb-1">✍️ E-Signature</h3>
            <p className="text-slate-400 text-sm mb-4">{selectedDoc.name}</p>

            {/* Signature Pad Mock */}
            <div className="bg-white rounded-xl p-4 mb-4">
              <p className="text-slate-400 text-xs mb-2 text-center">Type your signature below</p>
              <input
                type="text"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="Your Full Name"
                className="w-full border-b-2 border-slate-300 text-slate-800 text-xl font-signature text-center bg-transparent focus:outline-none focus:border-indigo-500 py-2"
                style={{ fontFamily: "cursive" }}
              />
            </div>

            <div className="bg-[#0f172a] rounded-xl p-3 mb-4">
              <p className="text-slate-400 text-xs">
                By signing, you agree to the terms of this document. This e-signature is legally binding.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setShowSignModal(false); setSignature(""); }}
                className="nexus-btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleSign}
                disabled={!signature}
                className={`flex-1 py-3 rounded-xl font-semibold text-white transition-all ${
                  signature
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-slate-600 cursor-not-allowed"
                }`}
              >
                ✅ Sign Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}