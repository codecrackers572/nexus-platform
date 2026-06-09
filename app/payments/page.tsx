"use client";
import { useState } from "react";

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [balance, setBalance] = useState(48500);

  const [transactions, setTransactions] = useState([
    { id: 1, type: "Received", from: "John Davis", to: "You", amount: 50000, status: "Completed", date: "Jun 5, 2026", icon: "⬇️" },
    { id: 2, type: "Sent", from: "You", to: "TechStart AI", amount: 15000, status: "Completed", date: "Jun 6, 2026", icon: "⬆️" },
    { id: 3, type: "Received", from: "Maria Lopez", to: "You", amount: 25000, status: "Pending", date: "Jun 7, 2026", icon: "⬇️" },
    { id: 4, type: "Transfer", from: "You", to: "GreenEnergy", amount: 10000, status: "Completed", date: "Jun 8, 2026", icon: "↔️" },
    { id: 5, type: "Received", from: "Robert Kim", to: "You", amount: 8000, status: "Pending", date: "Jun 9, 2026", icon: "⬇️" },
  ]);

  const handleTransaction = () => {
    if (!amount || !recipient) return;
    const amt = parseFloat(amount);
    const newTx = {
      id: transactions.length + 1,
      type: modalType === "deposit" ? "Received" : modalType === "withdraw" ? "Sent" : "Transfer",
      from: modalType === "deposit" ? recipient : "You",
      to: modalType === "deposit" ? "You" : recipient,
      amount: amt,
      status: "Pending",
      date: "Jun 9, 2026",
      icon: modalType === "deposit" ? "⬇️" : modalType === "withdraw" ? "⬆️" : "↔️",
    };
    setTransactions([newTx, ...transactions]);
    if (modalType === "deposit") setBalance(balance + amt);
    if (modalType === "withdraw") setBalance(balance - amt);
    setAmount("");
    setRecipient("");
    setShowModal(false);
  };

  const openModal = (type: string) => {
    setModalType(type);
    setShowModal(true);
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
          <span className="text-white font-bold text-lg">💳 Payments</span>
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
            JD
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Wallet Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-2xl p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-indigo-200 text-sm font-medium">Wallet Balance</p>
              <h2 className="text-white text-3xl font-bold mt-1">
                ${balance.toLocaleString()}
              </h2>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
              💳
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="nexus-badge-green text-xs">● Active</span>
            <span className="text-indigo-200 text-xs">Nexus Wallet</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { type: "deposit", label: "Deposit", icon: "⬇️", color: "bg-emerald-600 hover:bg-emerald-700" },
            { type: "withdraw", label: "Withdraw", icon: "⬆️", color: "bg-red-600 hover:bg-red-700" },
            { type: "transfer", label: "Transfer", icon: "↔️", color: "bg-indigo-600 hover:bg-indigo-700" },
          ].map((action) => (
            <button
              key={action.type}
              onClick={() => openModal(action.type)}
              className={`${action.color} text-white py-3 rounded-xl font-semibold text-sm transition-all`}
            >
              <div className="text-xl mb-1">{action.icon}</div>
              {action.label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: "Total Received", value: "$83,000", icon: "⬇️", color: "text-emerald-400" },
            { label: "Total Sent", value: "$25,000", icon: "⬆️", color: "text-red-400" },
            { label: "Pending", value: "$33,000", icon: "⏳", color: "text-amber-400" },
            { label: "This Month", value: "$48,500", icon: "📅", color: "text-indigo-400" },
          ].map((stat, i) => (
            <div key={i} className="nexus-card">
              <div className="text-xl mb-1">{stat.icon}</div>
              <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-slate-400 text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Deal Funding Section */}
        <div className="nexus-card mb-6">
          <h2 className="text-lg font-bold text-white mb-4">🤝 Fund a Deal</h2>
          <div className="space-y-3">
            {[
              { name: "TechStart AI", target: "$100,000", raised: "$65,000", percent: 65 },
              { name: "GreenEnergy Co", target: "$200,000", raised: "$120,000", percent: 60 },
              { name: "HealthPlus", target: "$50,000", raised: "$35,000", percent: 70 },
            ].map((deal, i) => (
              <div key={i} className="bg-[#0f172a] rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold text-sm">{deal.name}</span>
                  <span className="text-emerald-400 text-xs font-bold">{deal.percent}%</span>
                </div>
                <div className="w-full bg-[#1e293b] rounded-full h-2 mb-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${deal.percent}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-xs">{deal.raised} / {deal.target}</span>
                  <button
                    onClick={() => openModal("transfer")}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                  >
                    💰 Invest
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div className="nexus-card">
          <h2 className="text-lg font-bold text-white mb-4">
            📜 Transaction History
          </h2>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-3 border-b border-[#334155] last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0f172a] rounded-xl flex items-center justify-center text-xl">
                    {tx.icon}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{tx.type}</div>
                    <div className="text-slate-400 text-xs mt-0.5">
                      {tx.from} → {tx.to}
                    </div>
                    <div className="text-slate-500 text-xs">{tx.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold text-sm ${
                    tx.type === "Received" ? "text-emerald-400" : "text-red-400"
                  }`}>
                    {tx.type === "Received" ? "+" : "-"}${tx.amount.toLocaleString()}
                  </div>
                  <span className={`text-xs font-semibold ${
                    tx.status === "Completed" ? "text-emerald-400" : "text-amber-400"
                  }`}>
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-end justify-center z-50 px-4 pb-6">
          <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-white font-bold text-lg mb-4">
              {modalType === "deposit" ? "⬇️ Deposit Funds" :
               modalType === "withdraw" ? "⬆️ Withdraw Funds" : "↔️ Transfer Funds"}
            </h3>

            <div className="mb-4">
              <label className="text-slate-400 text-sm mb-2 block">Amount ($)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="nexus-input"
              />
            </div>

            <div className="mb-6">
              <label className="text-slate-400 text-sm mb-2 block">
                {modalType === "deposit" ? "From" : "To"}
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder={modalType === "deposit" ? "Sender name" : "Recipient name"}
                className="nexus-input"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="nexus-btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleTransaction}
                disabled={!amount || !recipient}
                className={`flex-1 py-3 rounded-xl font-semibold text-white transition-all ${
                  amount && recipient
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-slate-600 cursor-not-allowed"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}