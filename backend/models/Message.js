import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, required: true, default: false }, // New field
}, {
  timestamps: true,
});

const Message = mongoose.model('Message', messageSchema);

export default Message;