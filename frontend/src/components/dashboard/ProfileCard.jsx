import React from "react";
import "./ProfileCard.css";

export default function ProfileCard({ profile }) {
  if (!profile) return <div className="profile-card">No profile available</div>;

  return (
    <div className="profile-card">
      <h3 className="pc-name">{profile.fullName || profile.email}</h3>
      <p className="pc-email">{profile.email}</p>
      {profile.desc && <p className="pc-desc">{profile.desc}</p>}
      {profile.role && (
        <p className="pc-role">
          <strong>Role:</strong> {profile.role}
        </p>
      )}
      <p className="pc-meta">
        <small>Created: {profile.createdAt ? new Date(profile.createdAt).toLocaleString() : "-"}</small>
      </p>
    </div>
  );
}
