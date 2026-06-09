
export default function Home() {
  const today = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-2">Nexus SaaS</h1>
        <p className="text-center text-gray-600 mb-6">Productivity App - Week 1</p>
        
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📅 This Week</h2>
          <div className="grid grid-cols-7 gap-2">
            {dates.map((date, i) => (
              <div key={i} className={`text-center p-3 rounded-lg ${i === 0 ? 'bg-indigo-500 text-white' : 'bg-gray-100'}`}>
                <div className="text-xs">{days[date.getDay()]}</div>
                <div className="text-lg font-bold">{date.getDate()}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center">FullCalendar integration pending</p>
        </div>

        <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4 mt-6 text-center">
          <p className="text-green-700 font-semibold">✅ Setup + UI Complete</p>
          <p className="text-xs text-gray-600 mt-1">Submitted via GitHub Web Editor</p>
        </div>
      </div>
    </main>
  );
}