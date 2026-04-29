// src/pages/SearchPage.jsx
import { useState } from 'react';
import { api } from '../utils/api';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await api.get(`/api/profiles/search?q=${encodeURIComponent(query)}&page=1&limit=20`);
      const data = await res.json();
      setResults(data.data);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
      setResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <div>
        <h1>Natural Language Search</h1>
        <p style={{color: 'var(--text-secondary)', marginTop: '0.5rem'}}>Find profiles using natural language queries</p>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder='e.g., "young males from Nigeria"'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="btn-primary">Search</button>
      </form>

      {loading && <div className="loading-spinner">Searching</div>}

      {searched && !loading && (
        <div className="search-results">
          <p className="results-info">
            {results.length > 0 
              ? `Found ${total} result${total !== 1 ? 's' : ''}`
              : 'No results found'}
          </p>

          {results.length > 0 && (
            <table className="results-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Country</th>
                  <th style={{textAlign: 'center'}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {results.map(p => (
                  <tr key={p.id}>
                    <td><strong>{p.name}</strong></td>
                    <td>{p.age}</td>
                    <td>{p.gender}</td>
                    <td>{p.country_name}</td>
                    <td style={{textAlign: 'center'}}>
                      <Link to={`/profiles/${p.id}`} className="view-link">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {!searched && !loading && (
        <div style={{textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)', marginTop: '2rem'}}>
          <p>Enter a search query to find profiles</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;