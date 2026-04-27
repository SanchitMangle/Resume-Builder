import { json } from "express";
import openai from "../config/openai.js";
import Resume from "../model/resume.js";


// controller to enhance a resumes professional summary
// POST: /api/ai/enhace-pro-summary
export const enhaceProfessinoalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;
        if (!userContent) {
            return res.status(400).json({ message: "Misssing required feilds" })
        }

        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert in resume writting.Your task is to enhance professsional summary of a resume.The summary should be1-2 sentances also highlighting key skills,experience and career objectives. Make it compelling and ATS-friendly.Only return text no options or anything else"
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        })

        const enhacedContent = response.choices[0].message.content;
        return res.status(200).json({ enhacedContent })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message })
    }
}


// controller to enhance a resumes job description
// POST: /api/ai/enhace-job-desc
export const enhaceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;
        if (!userContent) {
            return res.status(400).json({ message: "Misssing required feilds" })
        }

        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert in resume writting.Your task is to enhance job description of a resume.The summary should be1-2 sentances also highlighting key responsiblities and achivements.Use action verbs and quantifable results were possible. Make it compelling and ATS-friendly.Only return text no options or anything else"
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        })

        const enhacedContent = response.choices[0].message.content;
        return res.status(200).json({ enhacedContent })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message })
    }
}

// controller to upload resume to database
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try {

        const { resumeText, title } = req.body;
        const userId = req.userId;

        if (!resumeText) {
            return res.status(400).json({ message: "Misssing required feilds" })
        }

        const systemPrompt = "You are an expert AI Agent to extract data from a resume";
        const userPrompt = `Extract data from this resume:${resumeText} 
        
        Provide data is following JSON format with no additional text befor or after:{
         persnol_info: {
        image: { type: String, default: "" },
        full_name: { type: String, default: "" },
        profession: { type: String, default: "" },
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        location: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        website: { type: String, default: "" },
    },
    experience: [
        {
            company: { type: String },
            position: { type: String },
            start_date: { type: String },
            end_date: { type: String },
            description: { type: String },
            is_current: { type: Boolean },
        }
    ],
    project: [
        {
            name: { type: String },
            type: { type: String },
            description: { type: String },
        }
    ],
    education: [
        {
            institution: { type: String },
            degree: { type: String },
            feild: { type: String },
            graduation_date: { type: String },
            gpa: { type: String },
        }
    ],
    }
        `

        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: userPrompt,
                },
            ],
            response_format: { type: 'json_object' }
        })

        const extractedData = response.choices[0].message.content;
        const parsData = JSON.parse(extractedData);
        const newResume = await Resume.create({ userId, title, ...parsData })
        return res.json({ resumeId: newResume._id })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message })
    }
}