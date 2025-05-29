import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Change this if backend is hosted elsewhere

const Chat = ({ username }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.emit('join', username);

    socket.on('chat message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('chat history', (history) => {
      setMessages(history);
    });

    return () => {
      socket.disconnect();
    };
  }, [username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('chat message', message);
      setMessage('');
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded shadow-md p-4 flex flex-col h-[80vh]">
      <h3 className="text-lg font-semibold mb-2 text-indigo-700">Welcome, {username}!</h3>
      <div className="flex-1 overflow-y-auto border p-3 rounded mb-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 flex ${
              msg.user === username ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`p-2 rounded-lg max-w-xs ${
                msg.user === username ? 'bg-indigo-100' : 'bg-gray-200'
              }`}
            >
              <div className="text-sm font-medium text-gray-800">{msg.user}</div>
              <div className="text-gray-700">{msg.text}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded p-2"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
      <p className="text-xs text-center mt-3 text-gray-500">
        🎓 Certificate will be issued on your internship end date — <strong>CodTech</strong>
      </p>
    </div>
  );
};

export default Chat;
