import { z } from "zod";

export const enhanceTextSchema = z.object({
  userContent: z.string().trim().min(10).max(3000),
});

export const uploadResumeSchema = z.object({
  resumeText: z.string().trim().min(30),
  title: z.string().trim().min(1).max(120).optional(),
});

export const atsScoreSchema = z.object({
  jobDescription: z.string().trim().min(30),
  resumeData: z.any(),
});
