import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { userSignupSchema } from '../utils/validator.js';
import { userSigninSchema } from '../utils/validator.js';

const signup = async (req, res) => {
    try {
        const validatedData = userSignupSchema.parse(req.body);

        const existingUser = await User.findOne({ username: validatedData.username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(validatedData.password, 10);
        const newUser = new User({ ...validatedData, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "User created successfully", data: newUser });
    } catch (error) {
        if (error instanceof z.ZodError) {
            const formattedErrors = error.errors.map(err => ({
                field: err.path[0],  
                msg: err.message     
            }));
    
            return res.status(400).json({
                message: formattedErrors[0].msg,
                errors: formattedErrors
            });
        }
        res.status(500).json({ message: "Server error", error });
    }
};

const signin = async (req, res) => {
    try {
        const validatedData = userSigninSchema.parse(req.body);
        console.log("validatedData", validatedData);
        const { username, password } = validatedData;

        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        req.session.existingUser = existingUser;
        res.status(200).json({ message: "Signin successful", user: existingUser });
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.log("error", error.errors);
            const formattedErrors = error.errors.map(err => ({
                field: err.path[0],  
                msg: err.message     
            }));
            console.log("formattedErrors", formattedErrors);
            return res.status(400).json({
                message: formattedErrors.msg,
                errors: formattedErrors
            });
        }
        res.status(500).json({ message: "Server error", error });
    }
};

const Logout = (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid', { path: '/' });
    res.redirect('/');
  };

export { signup, signin,Logout };