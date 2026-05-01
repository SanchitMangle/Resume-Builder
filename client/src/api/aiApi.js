import { apiRequest } from "./http";

export const enhanceProfessionalSummary = (userContent) =>
  apiRequest("/ai/enhance-pro-sum", {
    method: "POST",
    body: JSON.stringify({ userContent }),
  });

export const getAtsScore = ({ jobDescription, resumeData }) =>
  apiRequest("/ai/ats-score", {
    method: "POST",
    body: JSON.stringify({ jobDescription, resumeData }),
  });

export const uploadResumeText = ({ title, resumeText }) =>
  apiRequest("/ai/upload-resume", {
    method: "POST",
    body: JSON.stringify({ title, resumeText }),
  });
