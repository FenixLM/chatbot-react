import React from 'react';
import { Message } from '../interfaces/Message.interface';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="message-list overflow-y-auto h-64 p-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat ${msg.sender === 'user' ? 'chat-end' : 'chat-start'} mb-4`}
        >
          <div className="chat-bubble bg-blue-500 text-white p-2 rounded-md">
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
