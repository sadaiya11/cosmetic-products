import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminLogin } from '../store/slices/adminAuthSlice';
import { ShieldCheck, Sparkles } from 'lucide-react';

export default function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      adminLogin({
        id: 'admin-1',
        name: 'Master Admin',
        email: email || 'admin@aurora.com',
        role: 'ADMIN',
        token: 'mock_admin_token',
      })
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl w-full max-w-md space-y-6 shadow-2xl text-slate-100">
        <div className="text-center">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-amber-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-white">
            AURORA Admin Portal
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Restricted access portal for cosmetic store management
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block uppercase font-bold text-slate-400 mb-1">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 text-sm"
              placeholder="admin@aurora.com"
            />
          </div>

          <div>
            <label className="block uppercase font-bold text-slate-400 mb-1">
              Secret Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs transition-colors shadow-lg mt-2"
          >
            Access Dashboard
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-500 pt-4 border-t border-slate-800">
          <ShieldCheck className="w-4 h-4 text-amber-500" />
          <span>Authorized Staff Only • SSL Protected</span>
        </div>
      </div>
    </div>
  );
}
