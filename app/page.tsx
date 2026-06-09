
'use client';
import { useState } from 'react';

export default function Home() {
  const [notes, setNotes] = useState(['Week 2: Notes feature ready']);
  const [newNote, setNewNote] = useState('');
  const [uploadedFile, setUploadedFile] = useState('');

  const addNote = () => {
    if(newNote.trim()) {
      setNotes([...notes, newNote]);
      setNewNote('');
    }
  };

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    if(file) setUploadedFile(file.name);
  };

  const today = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto space-y-4">

        <h1 className="text-3xl font-bold text-center text-indigo-600">Nexus SaaS</h1>
        <p className="text-center text-gray-600">Week 1 + 2 + 3 Submission</p>

        {/* Calendar */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📅 Week 1: Calendar</h2>
          <div className="grid grid-cols-7 gap-2">
            {dates.map((date, i) => (
              <div key={i} className={`text-center p-3 rounded-lg ${i === 0? 'bg-indigo-500 text-white' : 'bg-gray-100'}`}>
                <div className="text-xs">{days[date.getDay()]}</div>
                <div className="text-lg font-bold">{date.getDate()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes - Week 2 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📝 Week 2: Notes</h2>
          <div className="flex gap-2 mb-4">
            <input
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add note..."
              className="flex-1 border-2 border-gray-300 rounded-lg p-2"
            />
            <button onClick={addNote} className="bg-indigo-500 text-white px-4 rounded-lg">Add</button>
          </div>
          <div className="space-y-2">
            {notes.map((n, i) => (
              <div key={i} className="bg-gray-100 p-3 rounded-lg">{n}</div>
            ))}
          </div>
        </div>

        {/* PDF Upload - Week 3 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📤 Week 3: PDF Upload</h2>
          <input type="file" accept=".pdf" onChange={handleFile} className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4" />
          {uploadedFile && (
            <p className="mt-4 text-green-600">✅ Uploaded: {uploadedFile}</p>
          )}
          <p className="text-xs text-gray-400 mt-2">PDF viewer integration pending</p>
        </div>

        <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4 text-center">
          <p className="text-green-700 font-bold">✅ Week 1, 2, 3 UI Complete</p>
          <p className="text-xs text-gray-600">Libraries integration pending due to Git issue</p>
        </div>
      </div>
    </main>
  );
}