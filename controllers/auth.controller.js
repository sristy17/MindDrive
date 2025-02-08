import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

// Signup function
const signup = async (req, res) => {
    const { username, password, dob, gender, fullName, phoneNumber } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        // Create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, dob, gender, fullName, phoneNumber });
        await newUser.save();

        // Store user information in the session
        req.session.existingUser = { username: newUser.username }; // Store the username in the session
        res.status(200).json({
            message: 'User registerted successfully',
            redirect: '/profile',
            data: newUser,
          });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('Server Error');
    }
};

// Signin function
const signin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send('User does not exist');
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).send('Invalid credentials');
        }

        // Store user information in the session
        req.session.existingUser = { username: user.username }; 
        res.status(200).json({
            message: 'User successfully logged in!',
            redirect: '/profile',
            data: newUser,
          });
    } catch (error) {
        console.error('Error during signin:', error);
        res.status(500).send('Server Error');
    }
};

const Logout = (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid', { path: '/' });
    res.redirect('/');
};


export { signup, signin, Logout };
