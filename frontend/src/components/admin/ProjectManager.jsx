import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProjectManager.css';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State for the "Add Project" form
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: '',
  });

  // Function to get the auth token from localStorage
  const getAuthToken = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return userInfo ? `Bearer ${userInfo.token}` : null;
  };

  // Fetch all projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/projects');
        setProjects(data);
        setError('');
      } catch (err) {
        setError('Failed to fetch projects.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Handler for form input changes
  const handleInputChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  // Handler for submitting the "Add Project" form
  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken();
      if (!token) {
        setError('You must be logged in to add a project.');
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      };

      const { data } = await axios.post('/api/projects', newProject, config);
      setProjects([data, ...projects]); // Add new project to the top of the list
      setNewProject({ title: '', description: '', imageUrl: '', category: '' }); // Reset form
    } catch (err) {
      setError('Failed to add project.');
    }
  };

  // Handler for deleting a project
  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const token = getAuthToken();
        const config = { headers: { Authorization: token } };
        
        await axios.delete(`/api/projects/${id}`, config);
        setProjects(projects.filter((p) => p._id !== id));
      } catch (err) {
        setError('Failed to delete project.');
      }
    }
  };

  return (
    <div className="project-manager">
      <header className="pm-header">
        <h2>Manage Projects</h2>
      </header>

      {/* Add Project Form */}
      <section className="add-project-form">
        <h3>Add New Project</h3>
        <form onSubmit={handleAddProject}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" name="title" value={newProject.title} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input type="text" name="category" value={newProject.category} onChange={handleInputChange} required />
            </div>
            <div className="form-group full-width">
              <label htmlFor="imageUrl">Image URL</label>
              <input type="text" name="imageUrl" value={newProject.imageUrl} onChange={handleInputChange} required />
            </div>
            <div className="form-group full-width">
              <label htmlFor="description">Description</label>
              <textarea name="description" rows="3" value={newProject.description} onChange={handleInputChange} required></textarea>
            </div>
          </div>
          <button type="submit" className="pm-button">Add Project</button>
        </form>
      </section>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* Project List */}
      <section className="project-list">
        {loading ? <p>Loading projects...</p> : projects.map((project) => (
          <div key={project._id} className="project-card">
            <img src={project.imageUrl} alt={project.title} />
            <div className="project-card-content">
              <h4>{project.title}</h4>
              <p><strong>Category:</strong> {project.category}</p>
            </div>
            <div className="project-card-actions">
              <button className="pm-button pm-button-edit">Edit</button>
              <button onClick={() => handleDeleteProject(project._id)} className="pm-button pm-button-delete">Delete</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ProjectManager;