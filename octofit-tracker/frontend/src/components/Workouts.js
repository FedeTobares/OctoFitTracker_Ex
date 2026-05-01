import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const codspaceName = process.env.REACT_APP_CODESPACE_NAME;
      const apiUrl = codspaceName
        ? `https://${codspaceName}-8000.app.github.dev/api/workouts/`
        : `http://localhost:8000/api/workouts/`;

      console.log('Fetching workouts from:', apiUrl);

      const response = await fetch(apiUrl);
      const data = await response.json();

      console.log('Workouts API Response:', data);

      // Handle both paginated and plain array responses
      const workoutsList = data.results || (Array.isArray(data) ? data : []);
      console.log('Processed workouts:', workoutsList);

      setWorkouts(workoutsList);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching workouts:', err);
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
            <h5 className="mb-0">Loading Workouts...</h5>
            <small>Fetching workout data from the backend API</small>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Workouts</h4>
          <p>{error}</p>
          <hr />
          <small>Make sure the backend server is running.</small>
          <button className="btn btn-primary mt-2" onClick={fetchWorkouts}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        <i className="bi bi-dumbbell"></i> Workouts
      </h2>

      {workouts.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">No Workouts Found</h4>
          <p className="mb-0">There are currently no workouts in the system.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped align-middle">
            <thead>
              <tr>
                <th scope="col" className="text-center">ID</th>
                <th scope="col">Workout Name</th>
                <th scope="col">Type</th>
                <th scope="col">Duration</th>
                <th scope="col" className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout.id}>
                  <td className="text-center">
                    <span className="badge bg-primary">{workout.id}</span>
                  </td>
                  <td>
                    <strong>{workout.name || 'N/A'}</strong>
                  </td>
                  <td>
                    <span className="badge bg-info">{workout.type || 'General'}</span>
                  </td>
                  <td>{workout.duration || 'N/A'} min</td>
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
          <i className="bi bi-plus-circle"></i> Log New Workout
        </button>
      </div>
    </div>
  );
};

export default Workouts;
