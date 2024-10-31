import { FieldValue } from 'firebase/firestore';

export interface Message {
  text: string;
  sender: 'user' | 'Katthy';
}

export type SendMessageHandler = (text: string) => void;

export interface MessageFirestore {
  id?: string;
  text: string;
  sender: 'user' | 'Katthy';
  uid: string;
  createdAt?: FieldValue;
}
