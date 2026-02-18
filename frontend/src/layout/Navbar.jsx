
import { useUser } from "../components/providers/UserProvider";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(() => navigate("/login"));
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">BRD Generator</Link>
        <div className="nav-links">
          <NavLink to="/" end className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
          {user && (
            <NavLink to="/dashboard" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Dashboard</NavLink>
          )}
        </div>
      </div>
      <div className="navbar-right">
        {!user && (
          <Link to="/login" className="login-btn">Login</Link>
        )}
        {user && (
          <>
            <span className="nav-user">{user.fullName || user.email}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
