import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input })
    });
    const data = await res.json();
    setMessages([...messages, { user: input, bot: data.response }]);
    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="history">
        {messages.map((msg, idx) => (
          <div key={idx} className="chat-msg">
            <div className="user-msg"><b>You:</b> {msg.user}</div>
            <div className="bot-msg"><b>Bot:</b> {msg.bot}</div>
          </div>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask me anything..." />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default App;
