import Post from '../models/Post.js';



// @desc    Fetch all posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });
  res.json(posts);
};

// @desc    Fetch a single post by its slug
// @route   GET /api/posts/:slug
// @access  Public
const getPostBySlug = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};


// === ADMIN FUNCTIONS (Add these new functions) ===

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private/Admin
const createPost = async (req, res) => {
  const { title, slug, content, featuredImage } = req.body;
  const post = new Post({ title, slug, content, featuredImage });

  try {
    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(400).json({ message: 'Error creating post', error });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private/Admin
const updatePost = async (req, res) => {
  const { title, slug, content, featuredImage } = req.body;
  const post = await Post.findById(req.params.id);

  if (post) {
    post.title = title;
    post.slug = slug;
    post.content = content;
    post.featuredImage = featuredImage;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    await post.deleteOne();
    res.json({ message: 'Post removed' });
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};

// Update your exports to include the new functions
export { getPosts, getPostBySlug, createPost, updatePost, deletePost };