import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const codspaceName = process.env.REACT_APP_CODESPACE_NAME;
      const apiUrl = codspaceName
        ? `https://${codspaceName}-8000.app.github.dev/api/users/`
        : `http://localhost:8000/api/users/`;

      console.log('Fetching users from:', apiUrl);

      const response = await fetch(apiUrl);
      const data = await response.json();

      console.log('Users API Response:', data);

      // Handle both paginated and plain array responses
      const usersList = data.results || (Array.isArray(data) ? data : []);
      console.log('Processed users:', usersList);

      setUsers(usersList);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
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
            <h5 className="mb-0">Loading Users...</h5>
            <small>Fetching user data from the backend API</small>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Users</h4>
          <p>{error}</p>
          <hr />
          <small>Make sure the backend server is running.</small>
          <button className="btn btn-primary mt-2" onClick={fetchUsers}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        <i className="bi bi-people"></i> Users
      </h2>

      {users.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">No Users Found</h4>
          <p className="mb-0">There are currently no users in the system.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped align-middle">
            <thead>
              <tr>
                <th scope="col" className="text-center">ID</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Profile</th>
                <th scope="col" className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="text-center">
                    <span className="badge bg-primary">{user.id}</span>
                  </td>
                  <td>
                    <strong>{user.username || 'N/A'}</strong>
                  </td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email || 'N/A'}</a>
                  </td>
                  <td>{user.profile || 'No profile'}</td>
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
          <i className="bi bi-person-plus"></i> Add New User
        </button>
      </div>
    </div>
  );
};

export default Users;
