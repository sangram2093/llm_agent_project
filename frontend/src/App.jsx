import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { user: input, bot: null };
    setMessages([...messages, userMsg]);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input })
    });
    const data = await res.json();

    const newMsg = { user: input, bot: data.response || '[Error]' };
    setMessages(prev => [...prev.slice(0, -1), newMsg]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="app">
      <div className="chat-history">
        {messages.map((msg, idx) => (
          <div key={idx} className="chat-message">
            <div className="user-message"><strong>You:</strong> {msg.user}</div>
            <div className="bot-message"><strong>Gemini:</strong> {msg.bot}</div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default App;
