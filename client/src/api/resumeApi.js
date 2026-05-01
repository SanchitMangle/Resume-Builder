import { apiRequest } from "./http";

export const getResumes = () => apiRequest("/resumes");

export const createResume = (title) =>
  apiRequest("/resumes", {
    method: "POST",
    body: JSON.stringify({ title }),
  });

export const deleteResume = (resumeId) =>
  apiRequest(`/resumes/${resumeId}`, {
    method: "DELETE",
  });

export const getResumeById = (resumeId) => apiRequest(`/resumes/${resumeId}`);

export const getPublicResumeById = (resumeId) => apiRequest(`/resumes/public/${resumeId}`);

export const updateResume = (resumeId, body) =>
  apiRequest(`/resumes/${resumeId}`, {
    method: "PUT",
    body: JSON.stringify({ resumeData: body }),
  });

export const renameResume = (resumeId, title) =>
  apiRequest(`/resumes/${resumeId}/rename`, {
    method: "PATCH",
    body: JSON.stringify({ title }),
  });
