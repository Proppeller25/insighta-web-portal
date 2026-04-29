// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../utils/api' // optional

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, recent: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/api/profiles?limit=5&page=1');
        const data = await res.json();
        setStats({ total: data.total, recent: data.data });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="loading-spinner">Loading dashboard</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-welcome">
        <h1 style={{background: 'none', color: 'white', marginBottom: 0}}>Welcome back, {user?.username || user?.email}!</h1>
        <p>Here's an overview of your profiles data</p>
      </div>

      <div className="stats-grid">
        <div className="stats-card">
          <h3>Total Profiles</h3>
          <p className="big-number">{stats.total}</p>
          <p style={{fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0}}>in the system</p>
        </div>
        <div className="stats-card">
          <h3>Recent Profiles</h3>
          <p className="big-number">{stats.recent.length}</p>
          <p style={{fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0}}>displayed below</p>
        </div>
      </div>

      <div className="recent-profiles">
        <h2>Recently Added Profiles</h2>
        {stats.recent.length > 0 ? (
          <div>
            {stats.recent.map(p => (
              <div key={p.id} className="profile-item">
                <div className="profile-info">
                  <div className="profile-name">{p.name}</div>
                  <div className="profile-details">{p.age} years • {p.country_name}</div>
                </div>
                <a href={`/profiles/${p.id}`} className="profile-link">View</a>
              </div>
            ))}
          </div>
        ) : (
          <p style={{textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem 0'}}>No recent profiles</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;