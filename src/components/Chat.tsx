import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { Message } from '../interfaces/Message.interface';
import { sendMessage } from '../api';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = async (text: string) => {
    const newMessage: Message = { text, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessage(text);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.text, sender: response.sender },
      ]);
    } catch (error) {
      console.error('Error al enviar el mensaje', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: 'Lo siento, no puedo responder en este momento',
          sender: 'bot',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen '>
      <div className='chat-box bg-gray-100 p-4 rounded shadow-lg w-[800px]'>
        <MessageList messages={messages} isLoading={isLoading} />
        <MessageInput onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default Chat;
