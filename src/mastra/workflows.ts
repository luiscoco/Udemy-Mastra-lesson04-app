import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";
import { lookupLesson } from "./tools.js";
export const studyInput = z.object({ lessonId: z.number().int().min(1).max(999), minutes: z.number().int().min(10).max(120), recentLesson: z.number().int().min(1).max(999).optional() }).strict();
const contextSchema = studyInput.extend({ record: z.object({ id: z.number(), title: z.string(), prerequisites: z.array(z.number()) }).nullable() });
const lookup = createStep({ id: "lookup", inputSchema: studyInput, outputSchema: contextSchema,
  execute: async ({ inputData }) => {
    const result = await lookupLesson.execute!({ lessonId: inputData.lessonId }, {});
    if (!result || "error" in result) throw new Error("Catalog tool validation failed.");
    return { ...inputData, record: result.record };
  } });
const planSchema = z.object({ outcome: z.enum(["ready", "needs-clarification"]), title: z.string(), actions: z.array(z.string()), minutes: z.number(), suppliedRecentLesson: z.number().nullable() });
const plan = createStep({ id: "plan", inputSchema: contextSchema, outputSchema: planSchema,
  execute: async ({ inputData }) => ({ outcome: inputData.record ? "ready" as const : "needs-clarification" as const,
    title: inputData.record?.title || "Choose an existing lesson", minutes: inputData.minutes, suppliedRecentLesson: inputData.recentLesson || null,
    actions: inputData.record ? [`Review prerequisites: ${inputData.record.prerequisites.join(", ") || "none"}`, `Study ${inputData.record.title} for ${inputData.minutes - 5} minutes`, "Spend 5 minutes explaining the result"] : ["Select a lesson ID from 1 to 10; do not invent a catalog entry."] }) });
export const studyPlan = createWorkflow({ id: "study-plan", inputSchema: studyInput, outputSchema: planSchema }).then(lookup).then(plan).commit();
