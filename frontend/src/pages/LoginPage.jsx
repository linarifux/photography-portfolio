import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLock } from 'react-icons/fi'; // Importing icons
import './LoginPage.css'; // Importing the new styles

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      const { data } = await axios.post('/api/users/login', { username, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/admin/dashboard');
    } catch (error) {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Admin Portal</h1>
        <form onSubmit={submitHandler}>
          <div className="input-group">
            <FiUser className="input-icon" size={20} />
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Username"
              required
            />
          </div>
          <div className="input-group">
            <FiLock className="input-icon" size={20} />
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="cta-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;