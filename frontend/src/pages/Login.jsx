import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../components/providers/UserProvider";
import { loginUser as loginUserApi } from "../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { loginUser } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
      if (e.target.name === "email") {
        setEmail(e.target.value);
      } else if (e.target.name === "password") {
        setPassword(e.target.value);
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const data = await loginUserApi(email, password);
      if (data.success) {
        setSuccess("Login successful!");
        if (data.data && data.data.user) {
          loginUser(data.data.user);
          navigate("/dashboard");
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
            value={email}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
        />
        <button type="submit" disabled={loading} style={{ width: "100%", padding: 10 }}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
        {success && <div style={{ color: "green", marginTop: 10 }}>{success}</div>}
      </form>

      <div style={{ marginTop: 16, textAlign: "center" }}>
        Don't have an account? <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
