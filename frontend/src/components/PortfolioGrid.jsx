import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from './Skeleton'; // Import the skeleton component

const PortfolioGrid = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Simulate a slightly longer load time to see the skeleton effect
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        
        const { data } = await axios.get('/api/projects');
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  return (
    <section id="portfolio" className="content-section">
      <div className="container">
        <h2>My Portfolio</h2>
        <p className="section-subtitle">A collection of my favorite shots.</p>
        <div className="gallery-grid">
          {loading ? (
            // Show 8 skeleton loaders while loading
            Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} />)
          ) : (
            // Display projects once loaded
            projects.map((project) => (
              <div key={project._id} className="gallery-item">
                <img src={project.imageUrl} alt={project.title} />
                <div className="gallery-item-overlay">
                  <h3>{project.title}</h3>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;