import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { Message } from '../interfaces/Message.interface';
import { sendMessage } from '../api';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (text: string) => {
    const newMessage: Message = { text, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
        // Llama a la función de la API en lugar de hacer la solicitud directamente aquí
        const response = await sendMessage(text);
        setMessages((prevMessages) => [...prevMessages, { text: response.reply, sender: 'bot' }]);
      } catch (error) {
        console.error('Error al enviar el mensaje', error);
      }
  };

  return (
    <div className="container mx-auto p-4">
       <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
      <div className="chat-box bg-gray-100 p-4 rounded shadow-lg">
        <MessageList messages={messages} />
        <MessageInput onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default Chat;
