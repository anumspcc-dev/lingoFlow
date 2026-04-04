import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Speaking from './pages/Speaking';
import Writing from './pages/Writing';
import { Trophy, User, Settings, LogOut, Shield, Bell, Globe } from 'lucide-react';

function Leaderboard() {
  const users = [
    { name: 'Anum', xp: 1240, rank: 1, avatar: 'A' },
    { name: 'Sarah', xp: 1150, rank: 2, avatar: 'S' },
    { name: 'John', xp: 980, rank: 3, avatar: 'J' },
    { name: 'Elena', xp: 850, rank: 4, avatar: 'E' },
    { name: 'Mike', xp: 720, rank: 5, avatar: 'M' },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Leaderboard</h1>
        <p className="text-slate-500">Compete with learners around the world.</p>
      </header>
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        {users.map((user, idx) => (
          <div key={user.name} className={`flex items-center justify-between p-6 ${idx !== users.length - 1 ? 'border-b border-slate-100' : ''} hover:bg-slate-50 transition-colors`}>
            <div className="flex items-center gap-4">
              <span className={`w-8 font-bold text-lg ${idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-slate-400' : idx === 2 ? 'text-amber-600' : 'text-slate-300'}`}>
                #{user.rank}
              </span>
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl">
                {user.avatar}
              </div>
              <span className="font-bold text-slate-900">{user.name}</span>
            </div>
            <span className="font-bold text-indigo-600">{user.xp} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
          <Settings size={24} />
        </button>
      </header>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center space-y-4">
        <div className="w-24 h-24 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-3xl mx-auto shadow-xl shadow-indigo-100">
          A
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Anum</h2>
          <p className="text-slate-500">Intermediate Learner</p>
        </div>
        <div className="flex justify-center gap-4 pt-4">
          <div className="bg-slate-50 px-6 py-3 rounded-2xl">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Followers</p>
            <p className="text-xl font-bold text-slate-900">124</p>
          </div>
          <div className="bg-slate-50 px-6 py-3 rounded-2xl">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Following</p>
            <p className="text-xl font-bold text-slate-900">86</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { icon: Bell, label: 'Notifications', color: 'text-blue-600', bg: 'bg-blue-50' },
          { icon: Shield, label: 'Privacy & Security', color: 'text-green-600', bg: 'bg-green-50' },
          { icon: Globe, label: 'Language Settings', color: 'text-purple-600', bg: 'bg-purple-50' },
          { icon: LogOut, label: 'Sign Out', color: 'text-red-600', bg: 'bg-red-50' },
        ].map((item) => (
          <button key={item.label} className="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all group">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-xl flex items-center justify-center`}>
                <item.icon size={24} />
              </div>
              <span className="font-bold text-slate-700">{item.label}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Settings size={16} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/speaking" element={<Speaking />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}
