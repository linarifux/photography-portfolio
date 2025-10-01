import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from './Skeleton';

const PortfolioGrid = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All'); // State for the filter

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
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

  // --- New Filter Logic ---
  // Get a unique list of categories from the projects array
  const categories = ['All', ...new Set(projects.map(p => p.category))];

  // Filter projects based on the selected category
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);
  // --- End of New Filter Logic ---

  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  return (
    <section id="portfolio" className="content-section">
      <div className="container">
        <h2>My Portfolio</h2>
        <p className="section-subtitle">A collection of my favorite shots.</p>

        {/* Filter Buttons */}
        <div className="filter-bar">
          {categories.map(category => (
            <button 
              key={category} 
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="gallery-grid">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} />)
          ) : (
            filteredProjects.map((project) => (
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