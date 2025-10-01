import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PricingPage = () => {
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTiers = async () => {
      try {
        const { data } = await axios.get('/api/pricing');
        setTiers(data);
      } catch (error) {
        console.error('Failed to fetch pricing tiers', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTiers();
  }, []);

  if (loading) return <p>Loading pricing...</p>;

  return (
    <div className="container content-section">
      <h2 style={{ marginBottom: '1rem' }}>My Services & Pricing</h2>
      <p className="section-subtitle">Choose a package that suits your needs or contact me for a custom quote.</p>
      
      <div className="pricing-grid">
        {tiers.map(tier => (
          <div key={tier._id} className={`pricing-card ${tier.isFeatured ? 'featured' : ''}`}>
            {tier.isFeatured && <div className="featured-badge">Most Popular</div>}
            <h3>{tier.tierName}</h3>
            <p className="pricing-description">{tier.description}</p>
            <div className="price">
              {tier.currencySymbol}{tier.price}
            </div>
            <ul className="features-list">
              {tier.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <Link to="/contact" className="cta-button">Book Now</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;