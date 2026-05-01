import openai from "../config/openai.js";
import Resume from "../model/resume.js";

const normalizeResumeShape = (data) => {
  const normalized = { ...data };
  if (normalized.persnol_info && !normalized.personal_info) {
    normalized.personal_info = normalized.persnol_info;
    delete normalized.persnol_info;
  }
  if (Array.isArray(normalized.education)) {
    normalized.education = normalized.education.map((item) => {
      if (item?.feild && !item.field) return { ...item, field: item.feild };
      return item;
    });
  }
  return normalized;
};

export const enhanceProfessionalSummary = async (userContent) => {
  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    messages: [
      {
        role: "system",
        content:
          "You are an expert in resume writting.Your task is to enhance professsional summary of a resume.The summary should be1-2 sentances also highlighting key skills,experience and career objectives. Make it compelling and ATS-friendly.Only return text no options or anything else",
      },
      { role: "user", content: userContent },
    ],
  });

  return { enhancedContent: response.choices[0].message.content };
};

export const enhanceJobDescription = async (userContent) => {
  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    messages: [
      {
        role: "system",
        content:
          "You are an expert in resume writting.Your task is to enhance job description of a resume.The summary should be1-2 sentances also highlighting key responsiblities and achivements.Use action verbs and quantifable results were possible. Make it compelling and ATS-friendly.Only return text no options or anything else",
      },
      { role: "user", content: userContent },
    ],
  });

  return { enhancedContent: response.choices[0].message.content };
};

const extractJson = (text) => {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  return jsonMatch ? jsonMatch[0] : text;
};

export const uploadResume = async (userId, { resumeText, title }) => {
  const systemPrompt = "You are an expert AI Agent to extract data from a resume";
  const userPrompt = `Extract data from this resume: ${resumeText}
Provide data in this exact JSON shape only:
{
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "professional_summary": "",
  "skills": [],
  "experience": [],
  "project": [],
  "education": []
}`;

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
  });

  const extractedData = response.choices[0].message.content;
  const parsedData = normalizeResumeShape(JSON.parse(extractJson(extractedData)));
  const newResume = await Resume.create({ userId, title, ...parsedData });

  return { resume: newResume };
};

export const getAtsScore = async ({ jobDescription, resumeData }) => {
  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    messages: [
      {
        role: "system",
        content:
          "You are an ATS analyzer. Return strict JSON only with keys: ats_score (0-100), matched_keywords (array), missing_keywords (array), improvements (array).",
      },
      {
        role: "user",
        content: JSON.stringify({ jobDescription, resumeData }),
      },
    ],
    response_format: { type: "json_object" },
  });

  const parsed = JSON.parse(response.choices[0].message.content);
  return {
    ats_score: Math.max(0, Math.min(100, Number(parsed.ats_score || 0))),
    matched_keywords: Array.isArray(parsed.matched_keywords) ? parsed.matched_keywords : [],
    missing_keywords: Array.isArray(parsed.missing_keywords) ? parsed.missing_keywords : [],
    improvements: Array.isArray(parsed.improvements) ? parsed.improvements : [],
  };
};
