import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, we'll just log the data. Later, we'll send it to the API.
    console.log('Form submitted:', formData);
    alert('Thank you for your message!');
    setFormData({ name: '', email: '', message: '' }); // Reset form
  };

  return (
    <section id="contact" className="content-section">
      <div className="container">
        <h2>Get In Touch</h2>
        <p className="section-subtitle">Have a project in mind? I'd love to hear from you.</p>
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
          <button type="submit" className="cta-button">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;