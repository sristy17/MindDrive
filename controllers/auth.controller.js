import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

const signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) return res.status(500).json({ message: "Invalid body params" })
            
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully', data: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const signin = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) return res.status(500).json({ message: "Invalid body params" })

        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Signin successful', user: existingUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export { signup, signin };