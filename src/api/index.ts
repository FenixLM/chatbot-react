// src/api.ts
import axios from 'axios';

interface ChatResponse {
  text: string;
  sender: 'user' | 'Katthy';
}

export const sendMessage = async (message: string): Promise<ChatResponse> => {
  return axios
    .post<ChatResponse>(import.meta.env.VITE_FUNCTION_API_URL, {
      message: message,
    })
    .then((response) => {
      return response.data;
    });
};
