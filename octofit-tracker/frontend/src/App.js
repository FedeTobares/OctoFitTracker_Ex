import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/docs/octofitapp-small.png" alt="OctoFit Tracker Logo" />
              🐙 OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  const codspaceName = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codspaceName
    ? `https://${codspaceName}-8000.app.github.dev/api/`
    : `http://localhost:8000/api/`;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg">
            <div className="card-body p-5">
              <h1 className="card-title text-center mb-4">
                🐙 Welcome to OctoFit Tracker
              </h1>
              <p className="card-text text-center lead mb-4">
                Your comprehensive fitness tracking application
              </p>

              <hr className="my-4" />

              <div className="alert alert-info mb-4">
                <h5 className="alert-heading">API Information</h5>
                <p className="mb-2">
                  <strong>Base Endpoint:</strong>
                  <br />
                  <code>{apiUrl}</code>
                </p>
                <p className="mb-0">
                  <strong>Environment:</strong>
                  <br />
                  <span className="badge bg-success">
                    {codspaceName ? 'GitHub Codespace' : 'Local Development'}
                  </span>
                </p>
              </div>

              <h5 className="mb-3">Available Features:</h5>
              <ul className="list-group list-group-flush mb-4">
                <li className="list-group-item">
                  <i className="bi bi-activity me-2"></i> Track your activities
                </li>
                <li className="list-group-item">
                  <i className="bi bi-people me-2"></i> Manage user profiles
                </li>
                <li className="list-group-item">
                  <i className="bi bi-diagram-3 me-2"></i> Create and manage teams
                </li>
                <li className="list-group-item">
                  <i className="bi bi-dumbbell me-2"></i> Log your workouts
                </li>
                <li className="list-group-item">
                  <i className="bi bi-trophy me-2"></i> Compete on the leaderboard
                </li>
              </ul>

              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Link
                  to="/activities"
                  className="btn btn-primary btn-lg px-4 gap-3"
                >
                  <i className="bi bi-lightning"></i> Get Started
                </Link>
                <button type="button" className="btn btn-outline-secondary btn-lg px-4">
                  <i className="bi bi-question-circle"></i> Learn More
                </button>
              </div>
            </div>
          </div>

          <div className="row mt-5 g-3">
            <div className="col-md-6">
              <div className="card text-white bg-info">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-api"></i> REST API
                  </h5>
                  <p className="card-text">
                    Built with Django REST Framework for seamless data management.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card text-white bg-success">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-rocket"></i> Real-time Data
                  </h5>
                  <p className="card-text">
                    Experience instant updates and synchronization across all devices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
