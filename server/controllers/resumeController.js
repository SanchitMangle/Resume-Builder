import { json } from "express";
import Resume from "../model/resume.js";
import imageKit from "../config/imagekit.js";
import fs from 'fs'

// controller to create resume
// POST:/api/resume/create
export const createResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.body;

        // create new resume 
        const newResume = await Resume.create({ userId, title })
        return res.status(201).json({ message: "Resume Created Successfully", resume: newResume })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message })
    }
}

// controller to deleting a resume
// POST:/api/resume/delete
export const deleteRsume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;
        await Resume.findOneAndDelete({ userId, _id: resumeId })
        return res.status(200).json({ message: "Resume dataeleted Successfully" })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message })
    }
}

// Controller to get userResume by _id
// GET:/api/resumw/get
export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;
        const resume = await Resume.findById({ userId, _id: resumeId })
        if (!resume) {
            return res.status(404).json({ message: "Resume Not Found" })
        }

        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;
        return res.status(200).json({ resume })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message })
    }
}

// get resume by id public
// GEt:/ap/resume/public
export const getPublicResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const resume = await Resume.findOne({ public: true, _id: resumeId });
        if (!resume) {
            return res.status(404).json({ message: "Resume Not Found" })
        }

        return res.status(200).json({ resume })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message })
    }
}

// controller for updating resume
// POST : /api/resume/update
export const updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId, resumeData, removeBackground } = req.body;
        const image = req.file;

        const resumeDataCopy = JSON.parse(resumeData);
        if (image) {
            const imageBufferData = fs.createReadStream(image.path)
            const response = await imageKit.files.upload({
                file: imageBufferData,
                fileName: 'resume.png',
                folder: 'user-resumes',
                transformation: {
                    pre: 'w-300,h-300,fo-face,z-0.75' + (removeBackground ? ',e-bgremove' : '')
                }
            });

            resumeDataCopy.personal_info.image = response.url
        }

        const resume = await Resume.findByIdAndUpdate({ userId, _id: resumeId }, resumeDataCopy, { new: true })
        return res.status(200).json({ message: "Save Successfully", resume })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message })
    }
}