import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
import Resume from "../model/resume.js";
import ApiError from "../utils/ApiError.js";

const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async ({ name, email, password }) => {
  const normalizedEmail = email.toLowerCase().trim();
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) throw new ApiError("User already exists", 400);

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email: normalizedEmail, password: hashPassword });
  newUser.password = undefined;

  return {
    token: generateToken(newUser._id),
    user: newUser,
  };
};

export const login = async ({ email, password }) => {
  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail });
  if (!user) throw new ApiError("Invalid email or password", 401);

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new ApiError("Invalid email or password", 401);

  user.password = undefined;
  return {
    token: generateToken(user._id),
    user,
  };
};

export const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) throw new ApiError("User not found", 404);
  return { user };
};

export const getUserResumes = async (userId) => {
  const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });
  return { resumes };
};
