import User from "../models/User.model.js";
import jwt from "jsonwebtoken"

const register = async (req, res) => {
    const {username, password} = req.body;
    try {
        
        let user = await User.findOne({username});
        if (user) {
            return res.status(400).json({message: "User already exists"})
        } 
        let newUser = new User({username, password});
        await newUser.save();
        const payload = {id: newUser._id, username}
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.cookie("token", token);
        res.status(201).json({message: "User created successfully", user: payload});
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}

const login = async (req, res) => {
    console.log("hit /login")
    const {username, password} = req.body;
    try {
        let user = await User.findOne({username});
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        const isMatch = await user.validatePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message:"Invalid credentials"})
        }
        const payload = {id: user._id, username}
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.cookie("token", token);
        res.status(200).json({message: "Login Successful", user: payload});
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
}

const logout = (req, res) => {
    res.clearCookie("token")
    res.status(200).json({message: "Logout Successful"})
}

const verify = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({
            isAuthenticated: true,
            user: {
                id: user._id,
                username: user.username,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export {register, login, logout, verify}