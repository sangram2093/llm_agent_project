CREATE TABLE chat_history (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR,
  prompt TEXT,
  response TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
