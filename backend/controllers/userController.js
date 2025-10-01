import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // We will create this model next
import dotenv from 'dotenv';
dotenv.config();

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  console.log(user);
  

  if (user && (await bcrypt.compare(password, user.password))) {

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d', // Token expires in 1 day
    });

    res.json({
      _id: user._id,
      username: user.username,
      token,
    });
  } else {
    res.status(401).json({ message: 'Invalid username or password....' });
  }
};

export { authUser };