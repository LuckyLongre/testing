import React from 'react';
import UserProfile from '../components/dashboradSubcomponents/UserProfile.jsx';
import ProjectSection from '../components/dashboradSubcomponents/ProjectSection.jsx';
import { useAuth } from '../components/providers/AuthProvider.jsx';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
    } finally {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white p-6 relative">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
        <button
          className="ml-4 bg-transparent border border-gray-300 text-gray-800 px-3 py-1 rounded hover:shadow-sm"
          onClick={handleLogout}
          aria-label="Logout"
        >
          Logout
        </button>
      </div>

      <div className="mt-6 grid md:grid-cols-[260px_1fr] gap-6">
        <UserProfile />
        <ProjectSection />
      </div>
    </div>
  );
}
