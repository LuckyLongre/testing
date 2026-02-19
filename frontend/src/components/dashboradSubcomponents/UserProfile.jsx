import React from 'react';
import { useAuth } from '../../components/providers/AuthProvider.jsx';
import { User as UserIcon } from 'lucide-react';
import './dashboard.css';

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <aside className="user-profile">
      <div className="avatar">{(user?.fullName && user.fullName[0]) ?? <UserIcon size={28} color="white" />}</div>
      <div className="user-info">
        <div className="name"><UserIcon size={16} className="user-icon" /> {user?.fullName ?? 'Guest User'}</div>
        <div className="email">{user?.email ?? 'no-email@example.com'}</div>
        <div className="role">{user?.role ?? '—'}</div>
        <div className="desc">{user?.desc ?? 'No description provided.'}</div>
      </div>
    </aside>
  );
}
