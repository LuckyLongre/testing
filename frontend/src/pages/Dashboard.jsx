import React from 'react';
import UserProfile from '../components/dashboradSubcomponents/UserProfile.jsx';
import ProjectSection from '../components/dashboradSubcomponents/ProjectSection.jsx';
import '../components/dashboradSubcomponents/dashboard.css';
import './dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <h2 className="page-title">Dashboard</h2>
      <div className="dashboard-layout">
        <UserProfile />
        <ProjectSection />
      </div>
    </div>
  );
}
