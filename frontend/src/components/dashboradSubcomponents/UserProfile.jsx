import React from 'react';
import { useAuth } from '../../components/providers/AuthProvider.jsx';
import { User as UserIcon } from 'lucide-react';

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <aside className="bg-linear-to-b from-purple-600 to-indigo-600 p-6 rounded-lg shadow-md text-white flex flex-col gap-4">
      <div className="w-20 h-20 rounded-full flex items-center justify-center bg-linear-to-br from-emerald-400 to-emerald-600 text-white font-bold text-2xl shadow">{(user?.fullName && user.fullName[0]) ?? <UserIcon size={28} color="white" />}</div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <UserIcon size={16} className="opacity-90" />
          <span>{user?.fullName ?? 'Guest User'}</span>
        </div>
        <div className="text-xs opacity-90">{user?.email ?? 'no-email@example.com'}</div>
        <div className="text-xs opacity-90">{user?.role ?? '—'}</div>
        <div className="mt-2 text-sm opacity-95">{user?.desc ?? 'No description provided.'}</div>
      </div>
    </aside>
  );
}
