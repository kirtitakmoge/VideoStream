require('dotenv').config();
const User = require('../models/User');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    console.log(newUser);
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;
    console.log(newUser);
    await newUser.save();
    res.status(201).send({ message: 'User registered successfully',success:true });
  } catch (error) {
    res.status(400).send({success:false,error});
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch){
      return res.status(400).send({ message: 'Invalid email or password' ,success:false});
    }console.log(passwordMatch)
const secret=process.env.JWT_SECRET||"Newsecrettaureansurgical";
    const token = jwt.sign({ email: user.email,firstname:user.firstname },secret, { expiresIn: '1d' });
    
    res.send({ token,success:true });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' ,success:false});
    }
    res.send({ message: 'User deleted successfully' ,success:true});
  } catch (error) {
    res.status(500).send({error,success:false});
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
