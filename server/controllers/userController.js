import ApiError from "../utils/ApiError.js";
import {
    getUserById as getUserByIdService,
    getUserResumes as getUserResumesService,
    login as loginService,
    register as registerService,
} from "../services/authService.js";

const ok = (res, data, message, status = 200) => res.status(status).json({ success: true, data, message });
const fail = (res, message, status = 400) => res.status(status).json({ success: false, message });

// Controller for user registration
// POST:/api/users/register
export const registerUser = async (req, res) => {
    try {
        const data = await registerService(req.body);
        return ok(res, data, "User created successfully", 201)
    } catch (error) {
        if (error instanceof ApiError) return fail(res, error.message, error.statusCode);
        return fail(res, error.message)
    }
}


// Controller for user login
// POST:/api/users/login
export const userLogin = async (req, res) => {
    try {
        const data = await loginService(req.body);
        return ok(res, data, "Login successful")
    } catch (error) {
        if (error instanceof ApiError) return fail(res, error.message, error.statusCode);
        return fail(res, error.message)
    }
}


// Get user by _id
// GET:/api/users/data
export const getUserById = async (req, res) => {
    try {
        const data = await getUserByIdService(req.userId);
        return ok(res, data)
    } catch (error) {
        if (error instanceof ApiError) return fail(res, error.message, error.statusCode);
        return fail(res, error.message)
    }
}

// controller for getting user Resume
// GET:/api/users/resumes
export const getUserResumes = async (req, res) => {
    try {
        const data = await getUserResumesService(req.userId);
        return ok(res, data)
    } catch (error) {
        if (error instanceof ApiError) return fail(res, error.message, error.statusCode);
        return fail(res, error.message)
    }
}