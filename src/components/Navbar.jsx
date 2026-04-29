// src/components/NavBar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NavBar = () => {
  const { user, logout } = useAuth();
  if (!user) return null;

  return (
    <nav className="navbar">
      <div style={{maxWidth: '1280px', margin: '0 auto', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Link to="/dashboard" style={{textDecoration: 'none'}}>
          <div className="nav-brand">🧠 Insighta Labs+</div>
        </Link>
        
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profiles">Profiles</Link>
          <Link to="/search">Search</Link>
          <Link to="/account">Account</Link>
          <button onClick={logout} className="nav-logout">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar