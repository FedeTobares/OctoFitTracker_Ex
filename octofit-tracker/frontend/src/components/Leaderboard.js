import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const codspaceName = process.env.REACT_APP_CODESPACE_NAME;
      const apiUrl = codspaceName
        ? `https://${codspaceName}-8000.app.github.dev/api/leaderboard/`
        : `http://localhost:8000/api/leaderboard/`;

      console.log('Fetching leaderboard from:', apiUrl);

      const response = await fetch(apiUrl);
      const data = await response.json();

      console.log('Leaderboard API Response:', data);

      // Handle both paginated and plain array responses
      const leaderboardList = data.results || (Array.isArray(data) ? data : []);
      console.log('Processed leaderboard:', leaderboardList);

      setLeaderboard(leaderboardList);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return <span className="badge bg-warning text-dark">🥇 1st</span>;
      case 2:
        return <span className="badge bg-secondary">🥈 2nd</span>;
      case 3:
        return <span className="badge bg-info">🥉 3rd</span>;
      default:
        return <span className="badge bg-dark">#{rank}</span>;
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info d-flex align-items-center" role="alert">
          <div className="spinner-border me-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div>
            <h5 className="mb-0">Loading Leaderboard...</h5>
            <small>Fetching rankings from the backend API</small>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Leaderboard</h4>
          <p>{error}</p>
          <hr />
          <small>Make sure the backend server is running.</small>
          <button className="btn btn-primary mt-2" onClick={fetchLeaderboard}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        <i className="bi bi-trophy"></i> Leaderboard
      </h2>

      {leaderboard.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">No Leaderboard Data</h4>
          <p className="mb-0">There are currently no leaderboard rankings available.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped align-middle">
            <thead>
              <tr>
                <th scope="col" className="text-center">Rank</th>
                <th scope="col">User</th>
                <th scope="col" className="text-center">Points</th>
                <th scope="col" className="text-center">Score</th>
                <th scope="col" className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id} className={index < 3 ? 'table-light' : ''}>
                  <td className="text-center fw-bold">
                    {getRankBadge(index + 1)}
                  </td>
                  <td>
                    <strong>{entry.user || entry.name || 'Unknown User'}</strong>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-success">{entry.points || 0}</span>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-primary">{entry.score || 0}</span>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-info me-1">
                      <i className="bi bi-eye"></i> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 d-flex gap-2">
        <button className="btn btn-primary btn-lg">
          <i className="bi bi-arrow-clockwise"></i> Refresh Rankings
        </button>
        <button className="btn btn-info btn-lg">
          <i className="bi bi-download"></i> Export Leaderboard
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
