import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../apis/api.js';
import { useAuth } from '../components/providers/AuthProvider.jsx';

export default function Signup() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    email: '',
    fullName: '',
    password: '',
    desc: '',
    role: '',
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await createUser(form);
      const created = res?.data ?? null;
      if (created) {
        setUser(created);
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
        <h2 className="text-xl font-semibold text-gray-900">Signup</h2>

        <form onSubmit={onSubmit} className="mt-4 grid gap-3">
          <input name="fullName" placeholder="Full name" value={form.fullName} onChange={onChange} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200" />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200" />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200" />
          <input name="role" placeholder="Role" value={form.role} onChange={onChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200" />
          <textarea name="desc" placeholder="Description" value={form.desc} onChange={onChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200" />

          <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-60">
            {loading ? (<><span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"/> Signing...</>) : 'Sign up'}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">Already have an account? <a href="/login" className="text-indigo-600 hover:underline">Login</a></p>
      </div>
    </div>
  );
}
