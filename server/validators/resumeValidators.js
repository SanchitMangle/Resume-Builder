import { z } from "zod";

export const createResumeSchema = z.object({
  title: z.string().trim().min(1).max(120).optional(),
});

export const updateResumeSchema = z.object({
  resumeData: z.any(),
  removeBackground: z.boolean().optional(),
});
