// src/pages/ProfileDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

const ProfileDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/api/profiles/${id}`);
        if (!res.ok) throw new Error('Profile not found');
        const data = await res.json();
        setProfile(data.data);
      } catch (err) {
        console.error(err);
        navigate('/profiles');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (user?.role !== 'admin') return alert('Admin only');
    if (window.confirm('Are you sure you want to delete this profile?')) {
      try {
        await api.delete(`/api/profiles/${id}`);
        navigate('/profiles');
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  if (loading) return <div className="loading-spinner">Loading profile</div>;
  if (!profile) return <div className="error">Profile not found</div>;

  return (
    <div className="profile-detail">
      <div className="detail-header">
        <div>
          <a href="/profiles" className="back-link">← Back to Profiles</a>
          <h1 style={{marginTop: '1rem'}}>{profile.name}</h1>
        </div>
      </div>

      <div className="detail-card">
        <div className="detail-section">
          <h2>Basic Information</h2>
          <div className="detail-row">
            <div className="detail-label">Name</div>
            <div className="detail-value">{profile.name}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">Gender</div>
            <div className="detail-value">
              {profile.gender}
              <span className="probability">({Math.round(profile.gender_probability * 100)}% confidence)</span>
            </div>
          </div>
          <div className="detail-row">
            <div className="detail-label">Age</div>
            <div className="detail-value">{profile.age} years</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">Age Group</div>
            <div className="detail-value">{profile.age_group}</div>
          </div>
        </div>

        <div className="detail-section">
          <h2>Location</h2>
          <div className="detail-row">
            <div className="detail-label">Country</div>
            <div className="detail-value">{profile.country_name}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">Country Code</div>
            <div className="detail-value">{profile.country_id}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">Country Confidence</div>
            <div className="detail-value">{Math.round(profile.country_probability * 100)}%</div>
          </div>
        </div>

        <div className="detail-section">
          <h2>Metadata</h2>
          <div className="detail-row">
            <div className="detail-label">Created</div>
            <div className="detail-value">{new Date(profile.created_at).toLocaleString()}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">Profile ID</div>
            <div className="detail-value" style={{fontSize: '0.875rem', fontFamily: 'monospace'}}>{profile.id}</div>
          </div>
        </div>
      </div>

      {user?.role === 'admin' && (
        <button onClick={handleDelete} className="btn-danger">Delete Profile</button>
      )}
    </div>
  );
};

export default ProfileDetail