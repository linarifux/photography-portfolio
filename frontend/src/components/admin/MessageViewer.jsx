import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiCheckCircle, FiTrash2 } from 'react-icons/fi';
import './MessageViewer.css';

const MessageViewer = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getAuthToken = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return userInfo ? `Bearer ${userInfo.token}` : null;
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const token = getAuthToken();
        const config = { headers: { Authorization: token } };
        const { data } = await axios.get('/api/messages', config);
        setMessages(data);
      } catch (err) {
        setError('Failed to fetch messages.');
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const token = getAuthToken();
        const config = { headers: { Authorization: token } };
        await axios.delete(`/api/messages/${id}`, config);
        setMessages(messages.filter((m) => m._id !== id));
      } catch (err) {
        setError('Failed to delete message.');
      }
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const token = getAuthToken();
      const config = { headers: { Authorization: token } };
      const { data } = await axios.put(`/api/messages/${id}/read`, {}, config);
      setMessages(messages.map((m) => (m._id === id ? data : m)));
    } catch (err) {
      setError('Failed to update message.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="message-viewer">
      <header className="mv-header">
        <h2>Customer Messages</h2>
      </header>
      
      {messages.length === 0 ? (
        <div className="empty-inbox">
          <h3>Your inbox is empty!</h3>
          <p>New messages from your contact form will appear here.</p>
        </div>
      ) : (
        <div className="message-list">
          {messages.map((msg) => (
            <div key={msg._id} className={`message-card ${!msg.isRead ? 'unread' : ''}`}>
              <div className="message-card-header">
                <div className="sender-info">
                  <strong>{msg.name}</strong>
                  <span>{msg.email}</span>
                </div>
                <span className="message-date">{formatDate(msg.createdAt)}</span>
              </div>
              <div className="message-card-body">
                <p>{msg.message}</p>
              </div>
              <div className="message-card-actions">
                {!msg.isRead && (
                  <button onClick={() => handleMarkAsRead(msg._id)} className="action-button">
                    <FiCheckCircle /> Mark as Read
                  </button>
                )}
                <button onClick={() => handleDelete(msg._id)} className="action-button">
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageViewer;