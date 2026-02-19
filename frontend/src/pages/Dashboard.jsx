import React from 'react';
import UserProfile from '../components/dashboradSubcomponents/UserProfile.jsx';
import ProjectSection from '../components/dashboradSubcomponents/ProjectSection.jsx';
import '../components/dashboradSubcomponents/dashboard.css';
import './dashboard.css';
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
    <div className="dashboard-page">
      <h2 className="page-title">Dashboard</h2>
      <button className="logout-btn" onClick={handleLogout} aria-label="Logout">Logout</button>
      <div className="dashboard-layout">
        <UserProfile />
        <ProjectSection />
      </div>
    </div>
  );
}
