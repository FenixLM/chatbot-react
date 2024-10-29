export interface Message {
    text: string;
    sender: 'user' | 'bot';
  }
  
export type SendMessageHandler = (text: string) => void;