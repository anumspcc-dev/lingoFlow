import React from 'react';
import { motion } from 'motion/react';
import { Flame, Star, BookOpen, Clock, ChevronRight, Play } from 'lucide-react';
import { Lesson } from '../types';

const MOCK_LESSONS: Lesson[] = [
  { id: '1', title: 'Present Continuous', description: 'Talking about what is happening right now.', category: 'Grammar', xpReward: 50, difficulty: 'Easy' },
  { id: '2', title: 'At the Airport', description: 'Essential vocabulary for international travel.', category: 'Vocabulary', xpReward: 75, difficulty: 'Medium' },
  { id: '3', title: 'Ordering Food', description: 'Practice listening to a restaurant dialogue.', category: 'Listening', xpReward: 60, difficulty: 'Easy' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back, Anum!</h1>
          <p className="text-slate-500">You're on a 5-day streak. Keep it up!</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-bold">
            <Flame size={20} />
            <span>5</span>
          </div>
          <div className="flex items-center gap-2 bg-yellow-100 text-yellow-600 px-4 py-2 rounded-full font-bold">
            <Star size={20} />
            <span>1,240 XP</span>
          </div>
        </div>
      </header>

      {/* Daily Goal Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-200"
      >
        <div className="relative z-10 space-y-4">
          <h2 className="text-xl font-semibold">Daily Goal</h2>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-bold">15</span>
            <span className="text-indigo-200 text-xl font-medium mb-1">/ 20 mins</span>
          </div>
          <div className="w-full h-3 bg-indigo-400/30 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-white rounded-full"
            />
          </div>
          <p className="text-indigo-100 text-sm">Just 5 more minutes to reach your daily goal!</p>
        </div>
        {/* Decorative Circles */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-50" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-700 rounded-full blur-3xl opacity-50" />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recommended Lessons */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Recommended for you</h3>
            <button className="text-indigo-600 font-semibold text-sm flex items-center gap-1 hover:underline">
              View all <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="space-y-4">
            {MOCK_LESSONS.map((lesson, idx) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 hover:border-indigo-300 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <BookOpen size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">{lesson.category}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    <span className="text-xs font-medium text-slate-400">{lesson.difficulty}</span>
                  </div>
                  <h4 className="font-bold text-slate-900">{lesson.title}</h4>
                  <p className="text-sm text-slate-500 line-clamp-1">{lesson.description}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md">+{lesson.xpReward} XP</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Play size={16} fill="currentColor" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Side Panel: Quick Stats & Challenges */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-6">
            <h3 className="font-bold text-slate-900">Your Progress</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Lessons</p>
                    <p className="font-bold">42/150</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-600">28%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Time Spent</p>
                    <p className="font-bold">12.5 hrs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-3xl text-white space-y-4 shadow-lg">
            <h3 className="font-bold">Daily Challenge</h3>
            <p className="text-slate-300 text-sm">Speak for 2 minutes about your favorite hobby.</p>
            <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
              Start Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
