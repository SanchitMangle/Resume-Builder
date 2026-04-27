import User from "../model/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Resume from "../model/resume.js";

const generateToken = async (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return token;
}

// Controller for user registration
// POST:/api/users/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check all feilds
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing required feilds" })
        }
        // Check user existance
        const existinguser = await User.findOne({ email })

        if (existinguser) {
            return res.status(400).json({ message: "User already exists" })
        }

        // create user 
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ name, email, password: hashPassword })

        // return success message 
        const token = generateToken(newUser._id);
        newUser.password = undefined;

        return res.status(201).json({ message: "User created successfully", token, user: newUser })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message })
    }
}


// Controller for user login
// POST:/api/users/login
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check user exist 
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or passsword" })
        }

        // check passsword
        if (!user.copmarePassword(password)) {
            return res.status(400).json({ message: "Invalid email or passsword" })
        }

        // return success message
        const token = generateToken(newUser._id);
        user.password = undefined;

        return res.status(201).json({ message: "login successfully", token, user })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message })
    }
}


// Get user by _id
// GET:/api/users/data
export const getUserById = async (req, res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId)

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        user.password = undefined;
        return res.status(201).json({ user })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message })
    }
}

// controller for getting user Resume
// GET:/api/users/resumes
export const getUserResumes = async (req, res) => {
    try {
        const userId = req.userId;

        // return user  resumes
        const resumes = await Resume.find({ userId });
        return res.status(200).jsson({ resumes })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message })
    }
}