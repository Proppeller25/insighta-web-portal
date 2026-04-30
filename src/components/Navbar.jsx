import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NavBar = () => {
  const { user, logout, logoutPending } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-shell">
        <Link to="/dashboard" className="nav-home-link">
          <div className="nav-brand">
            <span className="nav-brand-mark">IL</span>
            <span>Insighta Labs+</span>
          </div>
        </Link>

        <div className="nav-links">
          <NavLink to="/dashboard" className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}>
            Dashboard
          </NavLink>
          <NavLink to="/profiles" className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}>
            Profiles
          </NavLink>
          <NavLink to="/search" className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}>
            Search
          </NavLink>
          <NavLink to="/account" className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}>
            Account
          </NavLink>
          <button onClick={logout} className="nav-logout" disabled={logoutPending}>
            {logoutPending ? 'Signing out...' : 'Logout'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
