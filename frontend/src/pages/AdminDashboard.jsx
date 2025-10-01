import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // We'll create this CSS file next

const AdminDashboard = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2 className="sidebar-title">Dashboard</h2>
        <nav className="sidebar-nav">
          <Link to="/admin/dashboard/projects">Projects</Link>
          <Link to="/admin/dashboard/messages">Messages</Link>
        </nav>
        <button onClick={logoutHandler} className="logout-button">Logout</button>
      </aside>
      <main className="main-content">
        <Outlet /> {/* Child routes will be rendered here */}
      </main>
    </div>
  );
};

export default AdminDashboard;