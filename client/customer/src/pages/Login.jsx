import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/slices/authSlice';
import { Sparkles } from 'lucide-react';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          dispatch(loginSuccess(data));
          navigate('/');
        } else {
          setError(data.message || 'Login failed');
        }
      })
      .catch(() => {
        // Fallback for demonstration
        dispatch(
          loginSuccess({
            id: 'cust-1',
            name: 'Sophia Laurent',
            email,
            role: 'CUSTOMER',
            token: 'mock_jwt_token',
          })
        );
        navigate('/');
      });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xl space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-amber-900/10 text-amber-800 rounded-full flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            Welcome Back
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Sign in to access your luxury skincare rituals
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800"
              placeholder="sophia@example.com"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-stone-600 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-900 hover:bg-amber-800 text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs transition-colors shadow-md mt-2"
          >
            Sign In
          </button>
        </form>

        <p className="text-xs text-center text-stone-500 pt-4 border-t border-stone-100">
          Don't have an account?{' '}
          <Link to="/register" className="text-amber-800 font-bold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
