import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../api/api";

const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    desc: "",
    role: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const data = await signupUser(form);
      if (data.success) {
        setSuccess("Signup successful!");
        setForm({ email: "", fullName: "", desc: "", role: "", password: "" });
        setTimeout(() => {
          navigate("/login");
        }, 1200);
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
        />
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
        />
        <input
          type="text"
          name="desc"
          placeholder="Description"
          value={form.desc}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
        />
        <button type="submit" disabled={loading} style={{ width: "100%", padding: 10 }}>
          {loading ? "Signing up..." : "Signup"}
        </button>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
        {success && <div style={{ color: "green", marginTop: 10 }}>{success}</div>}
      </form>

      <div style={{ marginTop: 16, textAlign: "center" }}>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Signup;
