const User = require('../models/User');// Assuming you have a User model

const adminController = {
  // Function to get all users (only accessible to admins)
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },


  
// Controller function to get a list of all videos
getVideos:async (req, res) => {
  try {
      // Retrieve all videos from the database
      const videos = await Video.find();
      res.status(200).json(videos); // Return the list of videos
  } catch (error) {
      console.error('Error getting videos:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
},
  // Function to promote a user to admin (only accessible to admins)
  promoteToAdmin: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.role = 'admin';
      await user.save();
      res.status(200).json({ message: 'User promoted to admin successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Function to demote an admin to a regular user (only accessible to admins)
  demoteToUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.role = 'user';
      await user.save();
      res.status(200).json({ message: 'Admin demoted to user successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = adminController;
