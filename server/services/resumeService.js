import fs from "fs";
import Resume from "../model/resume.js";
import imageKit from "../config/imagekit.js";
import ApiError from "../utils/ApiError.js";

export const createResume = async (userId, { title }) => {
  const resume = await Resume.create({ userId, title });
  return { resume };
};

export const getResumes = async (userId) => {
  const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });
  return { resumes };
};

export const getResumeById = async (userId, resumeId) => {
  const resume = await Resume.findOne({ userId, _id: resumeId });
  if (!resume) throw new ApiError("Resume not found", 404);
  return { resume };
};

export const getPublicResumeById = async (resumeId) => {
  const resume = await Resume.findOne({ public: true, _id: resumeId });
  if (!resume) throw new ApiError("Resume not found", 404);
  return { resume };
};

export const updateResume = async (userId, resumeId, body, image) => {
  const { resumeData, removeBackground } = body;
  const resumeDataCopy = typeof resumeData === "string" ? JSON.parse(resumeData) : resumeData;

  if (image) {
    const imageBufferData = fs.createReadStream(image.path);
    const response = await imageKit.files.upload({
      file: imageBufferData,
      fileName: "resume.png",
      folder: "user-resumes",
      transformation: {
        pre: "w-300,h-300,fo-face,z-0.75" + (removeBackground ? ",e-bgremove" : ""),
      },
    });

    resumeDataCopy.personal_info = resumeDataCopy.personal_info || {};
    resumeDataCopy.personal_info.image = response.url;
  }

  const resume = await Resume.findOneAndUpdate({ userId, _id: resumeId }, resumeDataCopy, { new: true });
  if (!resume) throw new ApiError("Resume not found", 404);
  return { resume };
};

export const deleteResume = async (userId, resumeId) => {
  const deleted = await Resume.findOneAndDelete({ userId, _id: resumeId });
  if (!deleted) throw new ApiError("Resume not found", 404);
  return {};
};
