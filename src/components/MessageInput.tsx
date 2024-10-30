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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className='mt-4 flex space-x-2 items-center'>
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='Escribe tu mensaje...'
        className='input input-bordered w-full'
      />
      <button onClick={handleSend} className='btn btn-success'>
        <span className='material-symbols-outlined text-white'>send</span>
      </button>
    </div>
  );
};

export default MessageInput;
