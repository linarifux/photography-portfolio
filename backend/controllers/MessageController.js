import Message from '../models/Message.js';

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
const getMessages = async (req, res) => {
  const messages = await Message.find({}).sort({ createdAt: -1 });
  res.json(messages);
};

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
const deleteMessage = async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (message) {
    await message.deleteOne();
    res.json({ message: 'Message removed' });
  } else {
    res.status(404).json({ message: 'Message not found' });
  }
};

// @desc    Update message to read
// @route   PUT /api/messages/:id/read
// @access  Private/Admin
const markMessageAsRead = async (req, res) => {
    const message = await Message.findById(req.params.id);
    if (message) {
        message.isRead = true;
        const updatedMessage = await message.save();
        res.json(updatedMessage);
    } else {
        res.status(404).json({ message: 'Message not found' });
    }
};

export { getMessages, deleteMessage, markMessageAsRead };