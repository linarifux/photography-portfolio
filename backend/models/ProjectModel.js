import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Project = mongoose.model('Project', projectSchema);

export default Project;