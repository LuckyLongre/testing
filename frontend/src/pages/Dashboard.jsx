
import React, { useEffect, useState } from "react";
import { useUser } from "../components/providers/UserProvider";
import { getUserProfile } from "../api/api";


function Dashboard() {
  const { user } = useUser();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.email) return;
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getUserProfile(user.email);
        if (data.success && data.data && data.data.user) {
          setProfile(data.data.user);
        } else {
          setError(data.message || "Failed to fetch profile");
        }
      } catch (err) {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  return (
    <div>
      <h2>Dashboard Page</h2>
      {loading && <p>Loading profile...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {profile && (
        <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16, maxWidth: 400 }}>
          <h3>{profile.fullName}</h3>
          <p><b>Email:</b> {profile.email}</p>
          {profile.desc && <p><b>Description:</b> {profile.desc}</p>}
          {profile.role && <p><b>Role:</b> {profile.role}</p>}
          <p><b>Created At:</b> {new Date(profile.createdAt).toLocaleString()}</p>
          <p><b>Updated At:</b> {new Date(profile.updatedAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
