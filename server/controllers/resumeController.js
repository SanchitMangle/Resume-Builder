import ApiError from "../utils/ApiError.js";
import {
    createResume as createResumeService,
    deleteResume as deleteResumeService,
    getPublicResumeById as getPublicResumeByIdService,
    getResumeById as getResumeByIdService,
    getResumes as getResumesService,
    updateResume as updateResumeService,
} from "../services/resumeService.js";

const ok = (res, data, message, status = 200) => res.status(status).json({ success: true, data, message });
const fail = (res, message, status = 400) => res.status(status).json({ success: false, message });

// controller to create resume
export const createResume = async (req, res) => {
    try {
        const data = await createResumeService(req.userId, req.body);
        return ok(res, data, "Resume created successfully", 201)
    } catch (error) {
        if (error instanceof ApiError) return fail(res, error.message, error.statusCode);
        return fail(res, error.message)
    }
}

export const deleteResume = async (req, res) => {
    try {
        await deleteResumeService(req.userId, req.params.resumeId);
        return ok(res, {}, "Resume deleted successfully")
    } catch (error) {
        if (error instanceof ApiError) return fail(res, error.message, error.statusCode);
        return fail(res, error.message)
    }
}

export const getResumeById = async (req, res) => {
    try {
        const data = await getResumeByIdService(req.userId, req.params.resumeId);
        return ok(res, data)
    } catch (error) {
        if (error instanceof ApiError) return fail(res, error.message, error.statusCode);
        return fail(res, error.message)
    }
}

export const getPublicResumeById = async (req, res) => {
    try {
        const data = await getPublicResumeByIdService(req.params.resumeId);
        return ok(res, data)
    } catch (error) {
        if (error instanceof ApiError) return fail(res, error.message, error.statusCode);
        return fail(res, error.message)
    }
}

export const updateResume = async (req, res) => {
    try {
        const data = await updateResumeService(req.userId, req.params.resumeId, req.body, req.file);
        return ok(res, data, "Saved successfully")
    } catch (error) {
        if (error instanceof ApiError) return fail(res, error.message, error.statusCode);
        return fail(res, error.message)
    }
}

export const renameResume = async (req, res) => {
    try {
        const { title } = req.body;
        const data = await updateResumeService(req.userId, req.params.resumeId, { resumeData: { title } });
        return ok(res, data, "Resume renamed successfully")
    } catch (error) {
        if (error instanceof ApiError) return fail(res, error.message, error.statusCode);
        return fail(res, error.message)
    }
}

export const getResumes = async (req, res) => {
    try {
        const data = await getResumesService(req.userId);
        return ok(res, data);
    } catch (error) {
        if (error instanceof ApiError) return fail(res, error.message, error.statusCode);
        return fail(res, error.message);
    }
};