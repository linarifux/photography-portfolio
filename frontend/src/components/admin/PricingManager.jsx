import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProjectManager.css'; // Reusing styles for consistency

const PricingManager = () => {
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [newTier, setNewTier] = useState({
    tierName: '',
    price: '',
    description: '',
    features: '',
    isFeatured: false,
  });

  // --- NEW state for the edit modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTier, setCurrentTier] = useState(null);

  const getAuthToken = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return userInfo ? `Bearer ${userInfo.token}` : null;
  };


 useEffect(() => {
    const fetchTiers = async () => {
      try {
        const { data } = await axios.get('/api/pricing');
        setTiers(data);
      } catch (err) {
        setError('Failed to fetch pricing tiers.');
      } finally {
        setLoading(false);
      }
    };
    fetchTiers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTier({ ...newTier, [name]: type === 'checkbox' ? checked : value });
  };

  const handleAddTier = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      const token = getAuthToken();
      if (!token) {
        setError('Authentication error. Please log out and log in again.');
        return;
      }
      
      const config = { 
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: token 
        } 
      };
      
      // Convert the features string from the textarea into an array
      const payload = {
        ...newTier,
        features: newTier.features.split('\n').filter(f => f.trim() !== '')
      };

      const { data } = await axios.post('/api/pricing', payload, config);
      setTiers([data, ...tiers]);
      setNewTier({ tierName: '', price: '', description: '', features: '', isFeatured: false }); // Reset form
    } catch (err) {
      // Improved error handling: Display the actual error from the backend
      const message = err.response?.data?.message || 'Failed to add tier. Please check all fields.';
      setError(message);
    }
  };

  // --- NEW Delete Function ---
  const handleDeleteTier = async (id) => {
    if (window.confirm('Are you sure you want to delete this pricing tier?')) {
      try {
        const token = getAuthToken();
        const config = { headers: { Authorization: token } };
        await axios.delete(`/api/pricing/${id}`, config);
        setTiers(tiers.filter((t) => t._id !== id));
      } catch (err) {
        setError('Failed to delete tier.');
      }
    }
  };

  // --- NEW Edit Modal Functions ---
  const openEditModal = (tier) => {
    // Convert features array back to a newline-separated string for the textarea
    setCurrentTier({ ...tier, features: tier.features.join('\n') });
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setCurrentTier(null);
  };

  const handleModalInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentTier({ ...currentTier, [name]: type === 'checkbox' ? checked : value });
  };

  const handleUpdateTier = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken();
      const config = { headers: { 'Content-Type': 'application/json', Authorization: token } };
      
      const payload = {
        ...currentTier,
        features: currentTier.features.split('\n').filter(f => f.trim() !== '')
      };

      const { data } = await axios.put(`/api/pricing/${currentTier._id}`, payload, config);
      setTiers(tiers.map(t => (t._id === data._id ? data : t)));
      closeEditModal();
    } catch (err) {
      setError('Failed to update tier.');
    }
  };

  return (
    <div className="project-manager">
      <header className="pm-header">
        <h2>Manage Pricing</h2>
      </header>
      
      {/* --- Add Tier Form (no changes) --- */}
      <section className="add-project-form">
        <h3>Add New Tier</h3>
        <form onSubmit={handleAddTier}>
          <div className="form-grid">
            <div className="form-group">
              <label>Tier Name</label>
              <input type="text" name="tierName" value={newTier.tierName} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Price (Numbers only)</label>
              <input type="number" name="price" value={newTier.price} onChange={handleInputChange} required />
            </div>
            <div className="form-group full-width">
              <label>Description</label>
              <input type="text" name="description" value={newTier.description} onChange={handleInputChange} required />
            </div>
            <div className="form-group full-width">
              <label>Features (One per line)</label>
              <textarea name="features" rows="5" value={newTier.features} onChange={handleInputChange}></textarea>
            </div>
            <div className="form-group">
              <label style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  name="isFeatured" 
                  checked={newTier.isFeatured} 
                  onChange={handleInputChange} 
                  style={{ width: 'auto', marginRight: '10px' }}
                />
                Mark as Featured
              </label>
            </div>
          </div>
          {error && <p style={{ color: '#dc3545', marginTop: '1rem' }}>Error: {error}</p>}
          <button type="submit" className="pm-button" style={{ marginTop: '1rem' }}>Add Tier</button>
        </form>
      </section>

      {error && <p style={{ color: '#dc3545', marginTop: '1rem' }}>Error: {error}</p>}
      
      {/* --- Tier List (buttons updated) --- */}
      <div className="project-list" style={{ marginTop: '2rem' }}>
        {loading ? <p>Loading tiers...</p> : tiers.map(tier => (
          <div key={tier._id} className="project-card">
            <div className="project-card-content">
              <h4>{tier.tierName} {tier.isFeatured && '⭐'}</h4>
              <p>{tier.currencySymbol}{tier.price}</p>
            </div>
            <div className="project-card-actions">
              <button onClick={() => openEditModal(tier)} className="pm-button pm-button-edit">Edit</button>
              <button onClick={() => handleDeleteTier(tier._id)} className="pm-button pm-button-delete">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* --- NEW Edit Modal --- */}
      {isModalOpen && currentTier && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={closeEditModal} className="modal-close-btn">&times;</button>
            <h3>Edit Pricing Tier</h3>
            <form onSubmit={handleUpdateTier}>
              {/* Form fields are the same as the 'Add Tier' form, but linked to 'currentTier' state */}
              <div className="form-grid">
                <div className="form-group">
                  <label>Tier Name</label>
                  <input type="text" name="tierName" value={currentTier.tierName} onChange={handleModalInputChange} required />
                </div>
                <div className="form-group">
                  <label>Price (Numbers only)</label>
                  <input type="number" name="price" value={currentTier.price} onChange={handleModalInputChange} required />
                </div>
                <div className="form-group full-width">
                  <label>Description</label>
                  <input type="text" name="description" value={currentTier.description} onChange={handleModalInputChange} required />
                </div>
                <div className="form-group full-width">
                  <label>Features (One per line)</label>
                  <textarea name="features" rows="5" value={currentTier.features} onChange={handleModalInputChange}></textarea>
                </div>
                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" name="isFeatured" checked={currentTier.isFeatured} onChange={handleModalInputChange} style={{ width: 'auto', marginRight: '10px' }}/>
                    Mark as Featured
                  </label>
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

export default PricingManager;