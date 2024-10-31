import React, { useEffect, useState } from 'react';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import { Message, MessageFirestore } from '../interfaces/Message.interface';
import { sendMessage } from '../api';
import { UserAuth } from '../context/AuthContext';
import { addDocument, getDocumentsByUser } from '../services/firestoreService';

const Chat: React.FC = () => {
  const authContext = UserAuth();
  const user = authContext?.user;
  const logout = authContext?.logout;

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserMessages = async () => {
      if (user) {
        const userMessages = await handleGetMessages();
        setMessages(userMessages);
      }
    };

    fetchUserMessages();
  }, [user]);

  const handleLogout = () => {
    // Implementa la lógica para cerrar sesión
    if (logout) {
      logout();
    }
  };

  const handleGetMessages = async () => {
    try {
      const response = await getDocumentsByUser(
        'messages',
        user ? user.uid : ''
      );
      return response;
    } catch (error) {
      console.error('Error al obtener los mensajes', error);
      throw new Error('Error al obtener los mensajes');
    }
  };

  const handleSendMessageFirestore = async (data: MessageFirestore) => {
    try {
      const response = await addDocument('messages', data);
      return response;
    } catch (error) {
      console.error('Error al enviar el mensaje a Firestore', error);
      throw new Error('Error al enviar el mensaje a Firestore');
    }
  };

  const handleSendMessage = async (text: string) => {
    const newMessage: Message = { text, sender: 'user' };
    const dataSendUserFirestore: MessageFirestore = {
      text,
      sender: 'user',
      uid: user ? user.uid : '',
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    await handleSendMessageFirestore(dataSendUserFirestore);
    setIsLoading(true);

    try {
      const response = await sendMessage(text);

      const dataResponseBotFirestore: MessageFirestore = {
        text: response.text,
        sender: response.sender,
        uid: user ? user.uid : '',
      };
      await handleSendMessageFirestore(dataResponseBotFirestore);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.text, sender: response.sender },
      ]);
    } catch (error) {
      console.error('Error al enviar el mensaje', error);
      const dataResponseBotFirestore: MessageFirestore = {
        text: 'Lo siento, no puedo responder en este momento',
        sender: 'Katthy',
        uid: user ? user.uid : '',
      };
      await handleSendMessageFirestore(dataResponseBotFirestore);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: dataResponseBotFirestore.text,
          sender: dataResponseBotFirestore.sender,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='flex justify-between items-center w-full md:w-[800px] p-4 bg-gray-100 shadow-lg'>
        <span className='font-bold text-lg'>
          {user ? user.displayName : 'Usuario Anónimo'}
        </span>
        <button
          className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </div>
      <div className='chat-box bg-gray-100 p-4 rounded shadow-lg w-full md:w-[800px]'>
        <MessageList messages={messages} isLoading={isLoading} user={user} />
        <MessageInput onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default Chat;
