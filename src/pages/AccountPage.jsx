// src/pages/AccountPage.jsx
import { useAuth } from '../contexts/AuthContext';

const AccountPage = () => {
  const { user } = useAuth();
  
  if (!user) return <div className="error">Not logged in</div>;

  return (
    <div className="account-page">
      <div>
        <h1>Your Account</h1>
        <p style={{color: 'var(--text-secondary)', marginTop: '0.5rem'}}>View and manage your account information</p>
      </div>

      <div className="account-card">
        <h2>Profile Information</h2>
        
        <div className="account-field">
          <div className="account-label">Username</div>
          <div className="account-value">{user.username || '—'}</div>
        </div>

        <div className="account-field">
          <div className="account-label">Email</div>
          <div className="account-value">{user.email}</div>
        </div>

        <div className="account-field">
          <div className="account-label">Role</div>
          <div className="account-value">
            <span style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              borderRadius: '0.5rem',
              background: user.role === 'admin' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)',
              color: user.role === 'admin' ? 'var(--danger)' : 'var(--accent)',
              fontWeight: '600',
              fontSize: '0.875rem'
            }}>
              {user.role}
            </span>
          </div>
        </div>

        <div className="account-field">
          <div className="account-label">User ID</div>
          <div className="account-value" style={{fontSize: '0.85rem', fontFamily: 'monospace'}}>{user.id}</div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage