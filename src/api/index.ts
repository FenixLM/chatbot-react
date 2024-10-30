// src/api.ts
import axios from 'axios';

interface ChatResponse {
  text: string;
  sender: 'user' | 'bot';
}

// Función para enviar el mensaje a la API y recibir la respuesta
export const sendMessage = async (message: string): Promise<ChatResponse> => {
  return axios
    .post<ChatResponse>(import.meta.env.VITE_FUNCTION_API_URL, {
      message: message,
    })
    .then((response) => {
      console.log(response.data);

      return response.data;
    });
};
