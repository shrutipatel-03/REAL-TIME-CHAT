import React, { useState } from 'react';
import Chat from './components/chat';

function App() {
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    if (username.trim()) setJoined(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {!joined ? (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700">CodTech Chat</h2>
          <input
            type="text"
            placeholder="Enter your name"
            className="border p-2 rounded w-full mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={handleJoin}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded w-full"
          >
            Join Chat
          </button>
        </div>
      ) : (
        <Chat username={username} />
      )}
    </div>
  );
}

export default App;
