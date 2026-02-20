import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../apis/api.js';
import { useAuth } from '../components/providers/AuthProvider.jsx';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await loginUser(form);
      const user = res?.data ?? null;
      if (user) {
        setUser(user);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-white p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900">Login</h2>

        <form onSubmit={onSubmit} className="mt-4 grid gap-3">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? (
              <><span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"/> Logging in...</>
            ) : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Don't have an account? <Link to="/signup" className="text-indigo-600 hover:underline">Signup</Link>
        </p>
      </div>
    </div>
  );
}
