import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PenTool, CheckCircle2, AlertCircle, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { geminiService } from '../services/gemini';
import { Correction } from '../types';
import { cn } from '../lib/utils';

export default function Writing() {
  const [text, setText] = useState('');
  const [correction, setCorrection] = useState<Correction | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async () => {
    if (!text.trim() || isLoading) return;
    setIsLoading(true);
    try {
      const result = await geminiService.getCorrection(text);
      setCorrection(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Writing Lab</h1>
        <p className="text-slate-500">Practice your writing and get instant AI feedback.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm focus-within:border-indigo-300 transition-all">
            <div className="flex items-center gap-2 mb-4 text-slate-400">
              <PenTool size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">Your Draft</span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write something in English... (e.g., 'I has been to London last year.')"
              className="w-full h-64 bg-transparent border-none focus:ring-0 resize-none text-lg leading-relaxed text-slate-700 placeholder:text-slate-300"
            />
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
              <span className="text-xs text-slate-400 font-medium">{text.length} characters</span>
              <button
                onClick={handleCheck}
                disabled={!text.trim() || isLoading}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg",
                  text.trim() && !isLoading
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 active:scale-95"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                )}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Check Grammar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {!correction && !isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center p-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 mb-4 shadow-sm">
                  <PenTool size={32} />
                </div>
                <h3 className="font-bold text-slate-400">No feedback yet</h3>
                <p className="text-slate-400 text-sm mt-2">Write something on the left to get instant AI corrections and explanations.</p>
              </motion.div>
            ) : isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl border border-slate-200"
              >
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600" size={24} />
                </div>
                <h3 className="font-bold text-slate-900 mt-6">Analyzing your text</h3>
                <p className="text-slate-500 text-sm mt-2">Our AI is checking for grammar, spelling, and natural phrasing...</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                {/* Corrected Version */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm overflow-hidden relative">
                  <div className="flex items-center gap-2 mb-4 text-green-600">
                    <CheckCircle2 size={18} />
                    <span className="text-xs font-bold uppercase tracking-wider">Corrected Version</span>
                  </div>
                  <p className="text-lg leading-relaxed text-slate-800 font-medium">
                    {correction?.corrected}
                  </p>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 opacity-50 blur-3xl" />
                </div>

                {/* Explanation */}
                <div className="bg-indigo-50 rounded-3xl p-6 border border-indigo-100">
                  <div className="flex items-center gap-2 mb-4 text-indigo-600">
                    <AlertCircle size={18} />
                    <span className="text-xs font-bold uppercase tracking-wider">Explanation</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed italic">
                    "{correction?.explanation}"
                  </p>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200">
                  <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center font-bold">
                    +15
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Writing XP Earned!</p>
                    <p className="text-xs text-slate-500">Keep practicing to reach your daily goal.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
