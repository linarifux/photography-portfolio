import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get('/api/posts');
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div className="container content-section">
      <h2 style={{ marginBottom: '3rem' }}>From the Blog</h2>
      <div className="blog-grid">
        {posts.map(post => (
          <Link to={`/blog/${post.slug}`} key={post._id} className="blog-card">
            <img src={post.featuredImage} alt={post.title} className="blog-card-image" />
            <div className="blog-card-content">
              <h3>{post.title}</h3>
              <p>{new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;