import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProjectManager.css';

const ProjectManager = () => {
  // Existing states
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newProject, setNewProject] = useState({ title: '', description: '', imageUrl: '', category: '' });

  // New states for the edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const getAuthToken = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return userInfo ? `Bearer ${userInfo.token}` : null;
  };

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
  

  // --- New Edit Functions ---
  const openEditModal = (project) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setCurrentProject(null);
  };
  
  const handleModalInputChange = (e) => {
    setCurrentProject({ ...currentProject, [e.target.name]: e.target.value });
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken();
      const config = { headers: { 'Content-Type': 'application/json', Authorization: token } };
      const { data } = await axios.put(`/api/projects/${currentProject._id}`, currentProject, config);
      
      // Update the project in the list
      setProjects(projects.map(p => p._id === data._id ? data : p));
      closeEditModal();
    } catch (err) {
      setError('Failed to update project.');
    }
  };

  return (
    <div className="project-manager">
      {/* --- Add Project Form (no changes) --- */}
      <section className="add-project-form"> {/* ... */} 
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
          <button type="submit" className="pm-button" style={{marginTop: '1rem'}}>Add Project</button>
        </form>
      </section>

      {/* --- Project List (button updated) --- */}
      <section className="project-list">
        {loading ? <p>Loading projects...</p> : projects.map((project) => (
          <div key={project._id} className="project-card">
            {/* ... img and content ... */}
            <img src={project.imageUrl} alt={project.title} />
            <div className="project-card-content">
              <h4>{project.title}</h4>
              <p><strong>Category:</strong> {project.category}</p>
            </div>
            <div className="project-card-actions">
              <button onClick={() => openEditModal(project)} className="pm-button pm-button-edit">Edit</button>
              <button onClick={() => handleDeleteProject(project._id)} className="pm-button pm-button-delete" >Delete</button>
            </div>
          </div>
        ))}
      </section>

      {/* --- New Edit Modal --- */}
      {isModalOpen && currentProject && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={closeEditModal} className="modal-close-btn">&times;</button>
            <h3>Edit Project</h3>
            <form onSubmit={handleUpdateProject}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" name="title" value={currentProject.title} onChange={handleModalInputChange} required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input type="text" name="category" value={currentProject.category} onChange={handleModalInputChange} required />
                </div>
                <div className="form-group full-width">
                  <label>Image URL</label>
                  <input type="text" name="imageUrl" value={currentProject.imageUrl} onChange={handleModalInputChange} required />
                </div>
                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea name="description" rows="3" value={currentProject.description} onChange={handleModalInputChange} required></textarea>
                </div>
              </div>
              <button type="submit" className="pm-button">Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManager;