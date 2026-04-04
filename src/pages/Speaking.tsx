import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mic, User, Bot, Loader2, Info } from 'lucide-react';
import { geminiService } from '../services/gemini';
import { ChatMessage } from '../types';
import { cn } from '../lib/utils';

export default function Speaking() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm your English tutor. How are you feeling today? Would you like to practice a specific topic, or just chat?", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      history.push({ role: 'user', parts: [{ text: input }] });

      const response = await geminiService.getChatResponse(history);
      const botMessage: ChatMessage = { role: 'model', text: response || "I'm sorry, I couldn't process that.", timestamp: Date.now() };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting. Please try again.", timestamp: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] md:h-[calc(100vh-6rem)] bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="font-bold text-slate-900">AI Tutor</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-slate-400 font-medium tracking-wide uppercase">Online</span>
            </div>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
          <Info size={20} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex gap-3 max-w-[85%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm",
                msg.role === 'user' ? "bg-indigo-600 text-white" : "bg-white text-indigo-600 border border-slate-200"
              )}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={cn(
                "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                msg.role === 'user' 
                  ? "bg-indigo-600 text-white rounded-tr-none" 
                  : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
              )}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shadow-sm">
              <Bot size={16} />
            </div>
            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-indigo-600" />
              <span className="text-xs text-slate-400 font-medium">Tutor is thinking...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 bg-white border-t border-slate-100">
        <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
          <button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all">
            <Mic size={20} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={cn(
              "p-3 rounded-xl transition-all shadow-md",
              input.trim() && !isLoading 
                ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 active:scale-95" 
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            )}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
