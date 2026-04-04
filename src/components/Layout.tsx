import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageSquare, PenTool, User, Trophy } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: MessageSquare, label: 'Speaking', path: '/speaking' },
    { icon: PenTool, label: 'Writing', path: '/writing' },
    { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20 md:pb-0 md:pl-20">
      {/* Sidebar for Desktop */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-20 bg-white border-r border-slate-200 flex-col items-center py-8 gap-8 z-50">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
          L
        </div>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "p-3 rounded-xl transition-all duration-200 hover:bg-indigo-50 group relative",
              location.pathname === item.path ? "bg-indigo-100 text-indigo-600" : "text-slate-400"
            )}
          >
            <item.icon size={24} />
            <span className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      {/* Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 flex justify-around py-3 px-4 z-50">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              location.pathname === item.path ? "text-indigo-600" : "text-slate-400"
            )}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
