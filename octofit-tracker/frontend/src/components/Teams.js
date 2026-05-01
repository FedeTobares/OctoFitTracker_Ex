import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const codspaceName = process.env.REACT_APP_CODESPACE_NAME;
      const apiUrl = codspaceName
        ? `https://${codspaceName}-8000.app.github.dev/api/teams/`
        : `http://localhost:8000/api/teams/`;

      console.log('Fetching teams from:', apiUrl);

      const response = await fetch(apiUrl);
      const data = await response.json();

      console.log('Teams API Response:', data);

      // Handle both paginated and plain array responses
      const teamsList = data.results || (Array.isArray(data) ? data : []);
      console.log('Processed teams:', teamsList);

      setTeams(teamsList);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching teams:', err);
      setError(err.message);
      setLoading(false);
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
            <h5 className="mb-0">Loading Teams...</h5>
            <small>Fetching team data from the backend API</small>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Teams</h4>
          <p>{error}</p>
          <hr />
          <small>Make sure the backend server is running.</small>
          <button className="btn btn-primary mt-2" onClick={fetchTeams}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        <i className="bi bi-diagram-3"></i> Teams
      </h2>

      {teams.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">No Teams Found</h4>
          <p className="mb-0">There are currently no teams in the system.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped align-middle">
            <thead>
              <tr>
                <th scope="col" className="text-center">ID</th>
                <th scope="col">Team Name</th>
                <th scope="col">Members</th>
                <th scope="col">Description</th>
                <th scope="col" className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id}>
                  <td className="text-center">
                    <span className="badge bg-primary">{team.id}</span>
                  </td>
                  <td>
                    <strong>{team.name || 'N/A'}</strong>
                  </td>
                  <td>
                    <span className="badge bg-secondary">{team.members || 0}</span>
                  </td>
                  <td>{team.description || 'No description available'}</td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-info me-1">
                      <i className="bi bi-eye"></i> View
                    </button>
                    <button className="btn btn-sm btn-warning">
                      <i className="bi bi-pencil"></i> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4">
        <button className="btn btn-success btn-lg">
          <i className="bi bi-plus-circle"></i> Create New Team
        </button>
      </div>
    </div>
  );
};

export default Teams;
