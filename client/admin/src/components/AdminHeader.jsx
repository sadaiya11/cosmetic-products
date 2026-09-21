import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { adminLogout } from '../store/slices/adminAuthSlice';
import { LogOut, Bell, ShieldCheck } from 'lucide-react';

export default function AdminHeader() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.adminAuth);

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-2 text-slate-400 text-xs font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>Secure Session • {user?.name || 'Administrator'}</span>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 text-slate-400 hover:text-slate-200 transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-1.5 right-1.5 animate-ping" />
        </button>

        <div className="h-4 w-px bg-slate-800" />

        <button
          onClick={() => dispatch(adminLogout())}
          className="flex items-center space-x-2 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
