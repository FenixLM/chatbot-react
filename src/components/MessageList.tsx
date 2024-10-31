import React, { useEffect, useRef } from 'react';
import { Message } from '../interfaces/Message.interface';
import imgUser from '../assets/img/profile-user.png';
import imgBot from '../assets/img/profile-bot.png';

import '../assets/css/chat.css';
import { User } from 'firebase/auth';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  user: User | null | undefined;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  isLoading,
  user,
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const welcomeMessage = {
    sender: 'katthy',
    text: 'Hola, soy Katthy, tu asesora virtual especializada en calzado. ¿En qué puedo ayudarte?',
  };
  const allMessages = [welcomeMessage, ...messages];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allMessages]);

  return (
    <div className='message-list overflow-y-auto h-[500px] p-4'>
      {allMessages.map((msg, index) => (
        <div
          key={index}
          className={`chat ${
            msg.sender === 'user' ? 'chat-end' : 'chat-start'
          } mb-4`}
        >
          <div className='chat-image avatar flex-col'>
            <div className='w-10 rounded-full'>
              <img
                alt='Tailwind CSS chat bubble component'
                src={msg.sender === 'user' ? imgUser : imgBot}
              />
            </div>
            <h6 className='chat-name font-bold capitalize text-center truncate max-w-28'>
              {msg.sender === 'user' ? user?.displayName : 'Katthy'}
            </h6>
          </div>

          <div className='chat-header'></div>
          <div className='chat-bubble'> {msg.text}</div>
          <div className='chat-footer opacity-50'>
            <time className='text-xs opacity-50'>
              {' '}
              {new Date().toLocaleTimeString()}
            </time>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className='chat chat-start mb-4'>
          <div className='chat-image avatar flex-col'>
            <div className='w-10 rounded-full'>
              <img alt='Bot avatar' src={imgBot} />
            </div>
            <h6 className='chat-name font-bold capitalize text-center'>
              Katthy
            </h6>
          </div>
          <div className='chat-bubble flex items-center'>
            <div className='flex gap-1'>
              escribiendo
              <span className='typing-dots'>.</span>
              <span className='typing-dots' style={{ animationDelay: '0.3s' }}>
                .
              </span>
              <span className='typing-dots' style={{ animationDelay: '0.6s' }}>
                .
              </span>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
