const User = require('../models/User.js');
const bcrypt = require('bcrypt');

// register function register a new user or tells if he already exists if not new
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const newUser = new User ({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    }
    catch (err) {
        console.error('Registeration Error: ', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful' });

    }
    catch (err) {
        console.error('Login error: ', err);
        res.status(500).json({ message: 'Server error' });
    }
};