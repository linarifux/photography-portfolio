import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts and Pages
import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';

import BlogPage from './pages/BlogPage';
import SinglePostPage from './pages/SinglePostPage';

// Admin Components
import ProjectManager from './components/admin/ProjectManager';
import MessageViewer from './components/admin/MessageViewer';

import BlogManager from './components/admin/BlogManager'; // Import the new component

import PricingPage from './pages/PricingPage';
import PricingManager from './components/admin/PricingManager';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public-facing routes with shared layout */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="blog" element={<BlogPage />} /> {/* New blog list route */}
          <Route path="pricing" element={<PricingPage />} /> {/* Add this line */}
          <Route path="blog/:slug" element={<SinglePostPage />} /> {/* New single post route */}
        </Route>

        {/* Admin routes without the public layout */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<PrivateRoute />}>
          <Route element={<AdminDashboard />}>
            <Route index element={<ProjectManager />} />
            <Route path="projects" element={<ProjectManager />} />
            <Route path="messages" element={<MessageViewer />} />
            <Route path="blog" element={<BlogManager />} />
            <Route path="pricing" element={<PricingManager />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;