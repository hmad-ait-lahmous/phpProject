import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './adminHome.css';

const AdminHome = () => {
  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        {/* Sidebar */}
        <div className="sidebar">
          <h2>Admin Menu</h2>
          <ul>
            <li>
              <Link to="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/add-car">Add Car</Link>
            </li>
            <li>
              <Link to="/admin/bookings">Manage Bookings</Link>
            </li>
            <li>
              <Link to="/admin/logout">Logout</Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="dashboard-content">
          <header className="dashboard-header">
            <h1>Rental Car Dashboard</h1>
            <p>Manage your rental cars and bookings efficiently</p>
          </header>

          {/* Dynamic Content */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
