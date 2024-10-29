import React, { useState } from 'react';
import { SendMessageHandler } from '../interfaces/Message.interface';

interface MessageInputProps {
  onSend: SendMessageHandler;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [text, setText] = useState<string>('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe tu mensaje..."
        className="input input-bordered w-full"
      />
      <button onClick={handleSend} className="btn btn-primary mt-2 w-full">
        Enviar
      </button>
    </div>
  );
};

export default MessageInput;
