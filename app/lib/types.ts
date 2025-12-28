// lib/types.ts

export interface UserProfile {
  name: string;
  pic: string;
  sessionId: string;
}

export interface Message {
  id: string;
  text: string;
  timestamp: number;
  sender: {
    name: string;
    pic: string;
  };
  sessionId: string;
  reactions?: string[]; // Array of emoji reactions
  replyTo?: {
    id: string;
    text: string;
    sender: string;
  };
}

export interface TypingUser {
  name: string;
  sessionId: string;
}

export interface OnlineUser {
  name: string;
  sessionId: string;
}

export interface ChatService {
  init(onMessages: (messages: Message[]) => void, onOnlineUsers: (users: OnlineUser[]) => void, onTypingUsers: (users: TypingUser[]) => void): void;
  sendMessage(message: Omit<Message, 'id' | 'timestamp'>): Promise<void>;
  deleteMessage?(messageId: string): Promise<void>;
  addReaction?(messageId: string, emoji: string): Promise<void>;
  uploadImage(file: File): Promise<string>;
  setTypingStatus(user: UserProfile, isTyping: boolean): void;
  setupPresence(user: UserProfile): void;
  cleanup(): void;
}
