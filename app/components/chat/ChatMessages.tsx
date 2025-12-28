// components/chat/ChatMessages.tsx

'use client';

import { useChat } from '@/lib/hooks/useChat';
import { Message } from './Message';
import { useEffect, useRef, useState } from 'react';
import { Message as MessageType } from '@/lib/types';

export const ChatMessages = () => {
  const { messages, user, deleteMessage, addReaction } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [replyingTo, setReplyingTo] = useState<MessageType | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleReply = (message: MessageType) => {
    setReplyingTo(message);
    // You can pass this to ChatInput to show reply UI
  };

  const handleDelete = (messageId: string) => {
    deleteMessage?.(messageId);
  };

  const handleReact = (messageId: string, emoji: string) => {
    addReaction?.(messageId, emoji);
  };

  if (!user) {
    return <div className="flex-grow flex items-center justify-center"><p>Loading chat...</p></div>;
  }

  return (
    <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 bg-bg-light dark:bg-dark-bg-light scrollbar-thin">
      {messages.map(msg => (
        <Message 
          key={msg.id} 
          message={msg} 
          currentUser={user}
          onReply={handleReply}
          onDelete={handleDelete}
          onReact={handleReact}
        />
      ))}
    </div>
  );
};
