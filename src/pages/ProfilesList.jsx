// src/pages/ProfilesList.jsx
import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { useSearchParams, Link } from 'react-router-dom';

const ProfilesList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [profiles, setProfiles] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    gender: searchParams.get('gender') || '',
    age_group: searchParams.get('age_group') || '',
    country_id: searchParams.get('country_id') || '',
    min_age: searchParams.get('min_age') || '',
    max_age: searchParams.get('max_age') || '',
    sort_by: searchParams.get('sort_by') || 'created_at',
    order: searchParams.get('order') || 'desc',
    page: parseInt(searchParams.get('page')) || 1,
    limit: parseInt(searchParams.get('limit')) || 10,
  });

  const fetchProfiles = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.gender) params.append('gender', filters.gender);
    if (filters.age_group) params.append('age_group', filters.age_group);
    if (filters.country_id) params.append('country_id', filters.country_id);
    if (filters.min_age) params.append('min_age', filters.min_age);
    if (filters.max_age) params.append('max_age', filters.max_age);
    params.append('sort_by', filters.sort_by);
    params.append('order', filters.order);
    params.append('page', filters.page);
    params.append('limit', filters.limit);
    try {
      const res = await api.get(`/api/profiles?${params.toString()}`);
      const data = await res.json();
      setProfiles(data.data);
      setTotal(data.total);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
    // sync URL params
    const newParams = {};
    if (filters.gender) newParams.gender = filters.gender;
    if (filters.age_group) newParams.age_group = filters.age_group;
    if (filters.country_id) newParams.country_id = filters.country_id;
    if (filters.min_age) newParams.min_age = filters.min_age;
    if (filters.max_age) newParams.max_age = filters.max_age;
    newParams.sort_by = filters.sort_by;
    newParams.order = filters.order;
    newParams.page = filters.page;
    newParams.limit = filters.limit;
    setSearchParams(newParams);
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
  };

  const handleSort = (field) => {
    const newOrder = filters.sort_by === field && filters.order === 'asc' ? 'desc' : 'asc';
    setFilters(prev => ({ ...prev, sort_by: field, order: newOrder, page: 1 }));
  };

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setFilters(prev => ({ ...prev, page: newPage }));
    }
  };

  if (loading) return <div className="loading-spinner">Loading profiles</div>;

  return (
    <div className="profiles-container">
      <div className="profiles-header">
        <h1>Profiles</h1>
        <p style={{color: 'var(--text-secondary)', marginTop: '0.5rem'}}>Browse and filter {total} profiles in the system</p>
      </div>

      <div className="filters-bar">
        <div className="filter-group">
          <label>Gender</label>
          <select name="gender" value={filters.gender} onChange={handleFilterChange}>
            <option value="">All genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Age Group</label>
          <select name="age_group" value={filters.age_group} onChange={handleFilterChange}>
            <option value="">All age groups</option>
            <option value="child">Child</option>
            <option value="teenager">Teenager</option>
            <option value="adult">Adult</option>
            <option value="senior">Senior</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Country Code</label>
          <input type="text" name="country_id" placeholder="e.g., NG, US" value={filters.country_id} onChange={handleFilterChange} />
        </div>
        <div className="filter-group">
          <label>Min Age</label>
          <input type="number" name="min_age" placeholder="Min" value={filters.min_age} onChange={handleFilterChange} />
        </div>
        <div className="filter-group">
          <label>Max Age</label>
          <input type="number" name="max_age" placeholder="Max" value={filters.max_age} onChange={handleFilterChange} />
        </div>
      </div>

      {profiles.length > 0 ? (
        <>
          <table className="profiles-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('name')} style={{cursor: 'pointer'}}>
                  Name {filters.sort_by === 'name' && (filters.order === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('gender')} style={{cursor: 'pointer'}}>
                  Gender {filters.sort_by === 'gender' && (filters.order === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('age')} style={{cursor: 'pointer'}}>
                  Age {filters.sort_by === 'age' && (filters.order === 'asc' ? '↑' : '↓')}
                </th>
                <th>Age Group</th>
                <th>Country</th>
                <th style={{textAlign: 'center'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map(p => (
                <tr key={p.id}>
                  <td><strong>{p.name}</strong></td>
                  <td>{p.gender}</td>
                  <td>{p.age}</td>
                  <td>{p.age_group}</td>
                  <td>{p.country_name}</td>
                  <td style={{textAlign: 'center'}}>
                    <Link to={`/profiles/${p.id}`} className="view-link">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={() => goToPage(filters.page - 1)} disabled={filters.page === 1}>← Previous</button>
            <span style={{padding: '0.5rem 1rem', alignSelf: 'center'}}>Page <strong>{filters.page}</strong> of <strong>{totalPages}</strong></span>
            <button onClick={() => goToPage(filters.page + 1)} disabled={filters.page === totalPages}>Next →</button>
          </div>
        </>
      ) : (
        <div style={{textAlign: 'center', padding: '3rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', marginTop: '2rem'}}>
          <p style={{color: 'var(--text-secondary)'}}>No profiles found matching your filters</p>
        </div>
      )}
    </div>
  );
};

export default ProfilesList;