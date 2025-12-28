// components/chat/ChatInput.tsx

'use client';

import { useChat } from '@/lib/hooks/useChat';
import Image from 'next/image';
import { useState, useRef, ChangeEvent } from 'react';

export const ChatInput = () => {
    const [text, setText] = useState('');
    const { sendMessage, setTyping, uploadAndSendMessage } = useChat();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSend = () => {
        if (text.trim()) {
            sendMessage(text);
            setText('');
        }
    };
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        } else {
            setTyping(true);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            uploadAndSendMessage(file);
        }
    };

    return (
        <div className="flex-shrink-0 p-4 bg-bg-main dark:bg-dark-bg-main border-t border-border-color dark:border-dark-border-color">
            <div className="flex items-center gap-2 p-2 rounded-full bg-bg-light dark:bg-dark-bg-light shadow-light border border-border-color dark:border-dark-border-color focus-within:ring-2 focus-within:ring-primary dark:focus-within:ring-dark-primary transition-all">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full text-text-secondary dark:text-dark-text-secondary hover:text-text-dark dark:hover:text-dark-text-dark hover:bg-border-color dark:hover:bg-dark-border-color transition-all"
                    aria-label="Attach file"
                >
                    <Image src="/icons/attachment.svg" alt="Attach" width={20} height={20} className="dark:invert" />
                </button>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-grow bg-transparent outline-none px-3 text-base text-text-dark dark:text-dark-text-dark placeholder:text-text-secondary dark:placeholder:text-dark-text-secondary"
                />
                <button
                    onClick={handleSend}
                    disabled={!text.trim()}
                    className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full transition-all enabled:bg-primary dark:enabled:bg-dark-primary enabled:hover:scale-110 enabled:hover:shadow-md disabled:bg-text-secondary dark:disabled:bg-dark-text-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                >
                    <Image src="/icons/send.svg" alt="Send" width={18} height={18} className="invert" />
                </button>
            </div>
        </div>
    );
};
