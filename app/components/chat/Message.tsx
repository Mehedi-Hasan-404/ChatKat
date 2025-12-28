// components/chat/Message.tsx

'use client';

import { Message as MessageType, UserProfile } from '@/lib/types';
import { format } from 'date-fns';
import { useState } from 'react';

interface MessageProps {
  message: MessageType;
  currentUser: UserProfile;
  onReply?: (message: MessageType) => void;
  onDelete?: (messageId: string) => void;
  onReact?: (messageId: string, emoji: string) => void;
}

const REACTION_EMOJIS = ['❤️', '😂', '👍', '😮', '😢', '🙏'];

export const Message = ({ message, currentUser, onReply, onDelete, onReact }: MessageProps) => {
  const isSent = message.sessionId === currentUser.sessionId;
  const time = format(new Date(message.timestamp), 'HH:mm:ss');
  const [showMenu, setShowMenu] = useState(false);
  const [showReactions, setShowReactions] = useState(false);

  const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  const imageRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i;

  const renderContent = () => {
    if (imageRegex.test(message.text)) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={message.text} alt="User content" className="max-w-full rounded-medium mt-1.5 cursor-pointer" onClick={() => window.open(message.text, '_blank')} />;
    }
    const parts = message.text.split(urlPattern);
    return parts.map((part, index) => 
        urlPattern.test(part) 
            ? <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80 break-all">{part}</a> 
            : <span key={index}>{part}</span>
    );
  };

  const handleReaction = (emoji: string) => {
    onReact?.(message.id, emoji);
    setShowReactions(false);
  };

  return (
    <div className={`group relative flex flex-col mb-3 animate-fadeInUp ${isSent ? 'items-end' : 'items-start'}`}>
        {/* Message Actions Bar (appears on hover) */}
        <div className={`absolute -top-8 ${isSent ? 'right-0' : 'left-0'} opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1 bg-bg-main dark:bg-dark-bg-main border border-border-color dark:border-dark-border-color rounded-full px-2 py-1 shadow-md z-10`}>
            {/* React Button */}
            <button 
                onClick={() => setShowReactions(!showReactions)}
                className="p-1.5 hover:bg-bg-light dark:hover:bg-dark-bg-light rounded-full transition-colors"
                title="React"
            >
                <span className="text-lg">😊</span>
            </button>
            
            {/* Reply Button */}
            <button 
                onClick={() => onReply?.(message)}
                className="p-1.5 hover:bg-bg-light dark:hover:bg-dark-bg-light rounded-full transition-colors"
                title="Reply"
            >
                <svg className="w-4 h-4 text-text-secondary dark:text-dark-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
            </button>
            
            {/* 3-Dot Menu */}
            <div className="relative">
                <button 
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-1.5 hover:bg-bg-light dark:hover:bg-dark-bg-light rounded-full transition-colors"
                    title="More options"
                >
                    <svg className="w-4 h-4 text-text-secondary dark:text-dark-text-secondary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                </button>
                
                {/* Dropdown Menu */}
                {showMenu && (
                    <div className="absolute right-0 mt-1 w-40 bg-bg-main dark:bg-dark-bg-main border border-border-color dark:border-dark-border-color rounded-medium shadow-heavy overflow-hidden z-20">
                        <button 
                            onClick={() => {
                                navigator.clipboard.writeText(message.text);
                                setShowMenu(false);
                            }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-bg-light dark:hover:bg-dark-bg-light text-text-dark dark:text-dark-text-dark transition-colors flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy
                        </button>
                        <button 
                            onClick={() => {
                                // Forward functionality would go here
                                alert('Forward feature - coming soon!');
                                setShowMenu(false);
                            }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-bg-light dark:hover:bg-dark-bg-light text-text-dark dark:text-dark-text-dark transition-colors flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            Forward
                        </button>
                        {isSent && (
                            <button 
                                onClick={() => {
                                    if (confirm('Delete this message?')) {
                                        onDelete?.(message.id);
                                    }
                                    setShowMenu(false);
                                }}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>

        {/* Reaction Picker (appears when reaction button clicked) */}
        {showReactions && (
            <div className={`absolute -top-12 ${isSent ? 'right-0' : 'left-0'} bg-bg-main dark:bg-dark-bg-main border border-border-color dark:border-dark-border-color rounded-full px-3 py-2 shadow-heavy z-20 flex gap-2`}>
                {REACTION_EMOJIS.map(emoji => (
                    <button
                        key={emoji}
                        onClick={() => handleReaction(emoji)}
                        className="text-xl hover:scale-125 transition-transform"
                    >
                        {emoji}
                    </button>
                ))}
            </div>
        )}

        <div className={`flex items-end max-w-[85%] ${isSent ? 'flex-row-reverse' : 'flex-row'}`}>
            {!isSent && (
                <div 
                    className="w-8 h-8 rounded-full flex-shrink-0 mr-2 flex items-center justify-center text-sm font-bold bg-gradient-to-br from-purple-400 to-pink-400 dark:from-purple-500 dark:to-pink-500 text-white shadow-md border-2 border-white dark:border-dark-bg-main"
                    style={message.sender.pic ? { 
                        backgroundImage: `url(${message.sender.pic})`, 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center' 
                    } : {}}
                >
                    {!message.sender.pic && (message.sender.name?.charAt(0) || '?').toUpperCase()}
                </div>
            )}
            <div className={`px-4 py-3 rounded-large shadow-md ${
                isSent 
                    ? 'bg-sent-bg dark:bg-dark-sent-bg text-text-light dark:text-dark-text-light rounded-br-small' 
                    : 'bg-received-bg dark:bg-dark-received-bg text-text-dark dark:text-dark-text-dark rounded-bl-small border border-border-color dark:border-dark-border-color'
            }`}>
                {!isSent && <div className="text-sm font-bold text-primary dark:text-dark-primary mb-1">{message.sender.name || 'Anonymous'}</div>}
                <div className="text-base break-words leading-relaxed">
                    {renderContent()}
                </div>
                <div className={`text-xs mt-1.5 float-right ml-2 ${
                    isSent 
                        ? 'opacity-90' 
                        : 'opacity-60 dark:opacity-50'
                }`}>{time}</div>
            </div>
        </div>

        {/* Message Reactions Display (if any) */}
        {message.reactions && message.reactions.length > 0 && (
            <div className={`flex gap-1 mt-1 ${isSent ? 'mr-2' : 'ml-10'}`}>
                {message.reactions.map((reaction, idx) => (
                    <span 
                        key={idx}
                        className="bg-bg-light dark:bg-dark-bg-light border border-border-color dark:border-dark-border-color rounded-full px-2 py-0.5 text-sm"
                    >
                        {reaction}
                    </span>
                ))}
            </div>
        )}
    </div>
  );
};
