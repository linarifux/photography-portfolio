import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProjectManager.css'; // Reusing styles

const BlogManager = () => {
  // Existing states
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newPost, setNewPost] = useState({ title: '', slug: '', content: '', featuredImage: '' });

  // New states for the edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  const getAuthToken = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return userInfo ? `Bearer ${userInfo.token}` : null;
  };

 useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get('/api/posts');
        setPosts(data);
      } catch (err) {
        setError('Failed to fetch posts.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleInputChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken();
      const config = { headers: { 'Content-Type': 'application/json', Authorization: token } };
      const { data } = await axios.post('/api/posts', newPost, config);
      setPosts([data, ...posts]);
      setNewPost({ title: '', slug: '', content: '', featuredImage: '' });
    } catch (err) {
      setError('Failed to add post. Make sure the slug is unique.');
    }
  };

  const handleDeletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const token = getAuthToken();
        const config = { headers: { Authorization: token } };
        await axios.delete(`/api/posts/${id}`, config);
        setPosts(posts.filter((p) => p._id !== id));
      } catch (err) {
        setError('Failed to delete post.');
      }
    }
  };
  
  // --- New Edit Functions (for Posts) ---
  const openEditModal = (post) => {
    setCurrentPost(post);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setCurrentPost(null);
  };
  
  const handleModalInputChange = (e) => {
    setCurrentPost({ ...currentPost, [e.target.name]: e.target.value });
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken();
      const config = { headers: { 'Content-Type': 'application/json', Authorization: token } };
      const { data } = await axios.put(`/api/posts/${currentPost._id}`, currentPost, config);
      
      setPosts(posts.map(p => p._id === data._id ? data : p));
      closeEditModal();
    } catch (err) {
      setError('Failed to update post.');
    }
  };

  return (
    <div className="project-manager">
      {/* --- Add Post Form (no changes) --- */}
      <header className="pm-header">
        <h2>Manage Blog Posts</h2>
      </header>
      
      <section className="add-project-form"> {/* ... */} 
       <h3>Create New Post</h3>
        <form onSubmit={handleAddPost}>
            <div className="form-group">
              <label>Title</label>
              <input type="text" name="title" value={newPost.title} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Slug (e.g., "my-first-post")</label>
              <input type="text" name="slug" value={newPost.slug} onChange={handleInputChange} required />
            </div>
            <div className="form-group full-width">
              <label>Featured Image URL</label>
              <input type="text" name="featuredImage" value={newPost.featuredImage} onChange={handleInputChange} required />
            </div>
            <div className="form-group full-width">
              <label>Content</label>
              <textarea name="content" rows="6" value={newPost.content} onChange={handleInputChange} required></textarea>
            </div>
          <button type="submit" className="pm-button" style={{marginTop: '1rem'}}>Create Post</button>
        </form>
      </section>

      {/* --- Post List (button updated) --- */}
      <section className="project-list">
        {loading ? <p>Loading posts...</p> : posts.map((post) => (
          <div key={post._id} className="project-card">
            {/* ... img and content ... */}
            <img src={post.featuredImage} alt={post.title} />
            <div className="project-card-content">
              <h4>{post.title}</h4>
            </div>
            <div className="project-card-actions">
              <button onClick={() => openEditModal(post)} className="pm-button pm-button-edit">Edit</button>
              <button onClick={() => handleDeletePost(post._id)} className="pm-button pm-button-delete">Delete</button>
            </div>
          </div>
        ))}
      </section>

      {/* --- New Edit Modal (for Posts) --- */}
      {isModalOpen && currentPost && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={closeEditModal} className="modal-close-btn">&times;</button>
            <h3>Edit Post</h3>
            <form onSubmit={handleUpdatePost}>
              <div className="form-group">
                <label>Title</label>
                <input type="text" name="title" value={currentPost.title} onChange={handleModalInputChange} required />
              </div>
              <div className="form-group">
                <label>Slug</label>
                <input type="text" name="slug" value={currentPost.slug} onChange={handleModalInputChange} required />
              </div>
              <div className="form-group full-width">
                <label>Featured Image URL</label>
                <input type="text" name="featuredImage" value={currentPost.featuredImage} onChange={handleModalInputChange} required />
              </div>
              <div className="form-group full-width">
                <label>Content</label>
                <textarea name="content" rows="6" value={currentPost.content} onChange={handleModalInputChange} required></textarea>
              </div>
              <button type="submit" className="pm-button">Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManager;