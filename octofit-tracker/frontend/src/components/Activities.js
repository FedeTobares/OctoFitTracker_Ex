import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const codspaceName = process.env.REACT_APP_CODESPACE_NAME;
      const apiUrl = codspaceName
        ? `https://${codspaceName}-8000.app.github.dev/api/activities/`
        : `http://localhost:8000/api/activities/`;

      console.log('Fetching activities from:', apiUrl);

      const response = await fetch(apiUrl);
      const data = await response.json();

      console.log('Activities API Response:', data);

      // Handle both paginated and plain array responses
      const activitiesList = data.results || (Array.isArray(data) ? data : []);
      console.log('Processed activities:', activitiesList);

      setActivities(activitiesList);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching activities:', err);
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
            <h5 className="mb-0">Loading Activities...</h5>
            <small>Fetching data from the backend API</small>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Activities</h4>
          <p>{error}</p>
          <hr />
          <small>Make sure the backend server is running.</small>
          <button className="btn btn-primary mt-2" onClick={fetchActivities}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        <i className="bi bi-activity"></i> Activities
      </h2>

      {activities.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">No Activities Found</h4>
          <p className="mb-0">There are currently no activities in the system.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped align-middle">
            <thead>
              <tr>
                <th scope="col" className="text-center">ID</th>
                <th scope="col">Activity Name</th>
                <th scope="col">Description</th>
                <th scope="col" className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td className="text-center">
                    <span className="badge bg-primary">{activity.id}</span>
                  </td>
                  <td>
                    <strong>{activity.name || 'N/A'}</strong>
                  </td>
                  <td>{activity.description || 'No description available'}</td>
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
          <i className="bi bi-plus-circle"></i> Add New Activity
        </button>
      </div>
    </div>
  );
};

export default Activities;
