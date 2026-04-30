import { useAuth } from '../contexts/AuthContext';

const AccountPage = () => {
  const { user, logout, logoutPending, authError } = useAuth();

  if (!user) return <div className="error">Not logged in</div>;

  return (
    <div className="account-page">
      <div className="account-hero">
        <div>
          <h1>Your Account</h1>
          <p className="account-subtitle">View your identity details and manage your session.</p>
        </div>
        <button className="btn-danger account-logout-btn" onClick={logout} disabled={logoutPending}>
          {logoutPending ? 'Signing out...' : 'Logout'}
        </button>
      </div>

      {authError ? <div className="error account-error">{authError}</div> : null}

      <div className="account-card">
        <div className="account-header">
          <div className="account-avatar" aria-hidden="true">
            {user.username?.slice(0, 2).toUpperCase() || 'IL'}
          </div>
          <div>
            <h2>Profile Information</h2>
            <p className="account-subcopy">Authenticated through GitHub and synced with the Insighta backend.</p>
          </div>
        </div>

        <div className="account-field">
          <div className="account-label">Username</div>
          <div className="account-value">{user.username || '-'}</div>
        </div>

        <div className="account-field">
          <div className="account-label">GitHub ID</div>
          <div className="account-value">{user.github_id || '-'}</div>
        </div>

        <div className="account-field">
          <div className="account-label">Email</div>
          <div className="account-value">{user.email || '-'}</div>
        </div>

        <div className="account-field">
          <div className="account-label">Role</div>
          <div className="account-value">
            <span className={`role-pill role-pill-${user.role}`}>{user.role}</span>
          </div>
        </div>

        <div className="account-field">
          <div className="account-label">User ID</div>
          <div className="account-value account-mono">{user.id}</div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
