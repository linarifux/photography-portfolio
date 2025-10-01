import React, { useState } from 'react';
import axios from 'axios';
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi'; // Import icons

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: false, error: '' });
    try {
      await axios.post('/api/messages', formData);
      setFormStatus({ submitting: false, success: true, error: '' });
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (error) {
      setFormStatus({ 
        submitting: false, 
        success: false, 
        error: 'Failed to send message. Please try again later.' 
      });
    }
  };

  return (
    <section id="contact" className="content-section">
      <div className="container">
        <h2>Get In Touch</h2>
        <p className="section-subtitle">Have a project in mind? I'd love to hear from you.</p>

        <div className="contact-layout">
          {/* Column 1: Contact Form */}
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Your Email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
              <textarea 
                name="message" 
                rows="5" 
                placeholder="Your Message" 
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              
              {formStatus.success && <p style={{ color: 'var(--primary-color)', marginTop: '1rem' }}>Thank you for your message!</p>}
              {formStatus.error && <p style={{ color: '#ff6b6b', marginTop: '1rem' }}>{formStatus.error}</p>}
              
              <button type="submit" className="cta-button" disabled={formStatus.submitting}>
                {formStatus.submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Column 2: Address and Map */}
          <div className="contact-info-container">
            <h3>Contact Information</h3>
            <div className="info-item">
              <FiMapPin size={20} />
              <p>123 Photography Lane, Suite 100<br/>New York, NY 10001, USA</p>
            </div>
            <div className="info-item">
              <FiMail size={20} />
              <p>hello@jdphotography.com</p>
            </div>
            <div className="info-item">
              <FiPhone size={20} />
              <p>(123) 456-7890</p>
            </div>

            <div className="map-container">
              {/* Remember to replace this with your own Google Maps iframe code! */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.6187046103887!2d89.64632067696854!3d23.546212678810253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fe49ff90021c8d%3A0x3406c7122313a6e6!2sNadia%20Bazar%20Kandi!5e0!3m2!1sen!2sbd!4v1759295068109!5m2!1sen!2sbd" 
                width="600" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map of our location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;