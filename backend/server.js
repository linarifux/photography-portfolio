import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import projectRoutes from './routes/ProjectRoute.js';

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow the server to accept JSON data

// A simple test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount project routes
app.use('/api/projects', projectRoutes);

// in server.js
import userRoutes from './routes/userRoutes.js';
//...
app.use('/api/users', userRoutes);


// Add with your other route imports
import messageRoutes from './routes/MessageRoutes.js'

// Add with your other app.use() calls
app.use('/api/messages', messageRoutes);

// Add with your other route imports
import postRoutes from './routes/postRoutes.js';

// Add with your other app.use() calls
app.use('/api/posts', postRoutes);

// Add with your other route imports
import pricingRoutes from './routes/pricingRoutes.js';

// Add with your other app.use() calls
app.use('/api/pricing', pricingRoutes);


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));