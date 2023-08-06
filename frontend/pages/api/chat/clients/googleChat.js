import React, { useState } from 'react';
// import { sendMessage } from './chat-api';

const App = () => {
  const [spaceName, setSpaceName] = useState('my_space');
  const [message, setMessage] = useState('Hello from the Google Chat API!');

  const handleSubmit = (e) => {
    e.preventDefault();

    sendMessage(spaceName, message);
  };

  return (
    <div>
      <h1>Send a message to Gmail Chat</h1>
      <input
        type="text"
        placeholder="Space name"
        defaultValue={spaceName}
        onChange={(e) => setSpaceName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Message"
        defaultValue={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
};

export default App;