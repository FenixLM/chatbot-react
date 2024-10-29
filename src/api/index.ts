// src/api.ts
import axios from 'axios';

interface ChatResponse {
  reply: string;
}

// Función para enviar el mensaje a la API y recibir la respuesta
export const sendMessage = async (message: string): Promise<ChatResponse> => {
  return axios.post<ChatResponse>('https://tu-api.com/chat', { message }).then(response => response.data);
};
