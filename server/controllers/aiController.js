import ApiError from "../utils/ApiError.js";
import {
    getAtsScore as getAtsScoreService,
    enhanceJobDescription as enhanceJobDescriptionService,
    enhanceProfessionalSummary as enhanceProfessionalSummaryService,
    uploadResume as uploadResumeService,
} from "../services/aiService.js";

const ok = (res, data, message, status = 200) => res.status(status).json({ success: true, data, message });
const fail = (res, message, status = 400) => res.status(status).json({ success: false, message });

// controller to enhance a resumes professional summary
// POST: /api/ai/enhance-pro-summary
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const data = await enhanceProfessionalSummaryService(req.body.userContent);
        return ok(res, data)
    } catch (error) {
        if (error instanceof ApiError) return fail(res, error.message, error.statusCode);
        return fail(res, error.message)
    }
}


// controller to enhance a resumes job description
// POST: /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
    try {
        const data = await enhanceJobDescriptionService(req.body.userContent);
        return ok(res, data)
    } catch (error) {
        if (error instanceof ApiError) return fail(res, error.message, error.statusCode);
        return fail(res, error.message)
    }
}

// controller to upload resume to database
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try {
        const data = await uploadResumeService(req.userId, req.body);
        return ok(res, data, "Resume parsed successfully", 201)
    } catch (error) {
        if (error instanceof ApiError) return fail(res, error.message, error.statusCode);
        return fail(res, error.message)
    }
}

export const atsScore = async (req, res) => {
    try {
        const data = await getAtsScoreService(req.body);
        return ok(res, data, "ATS score generated")
    } catch (error) {
        if (error instanceof ApiError) return fail(res, error.message, error.statusCode);
        return fail(res, error.message)
    }
}