import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { course } from "../course.js";
export const lookupLesson = createTool({
  id: "lookup-lesson", description: "Read one public course record by lesson ID; report missing records explicitly.",
  inputSchema: z.object({ lessonId: z.number().int().min(1).max(999) }).strict(),
  outputSchema: z.object({ found: z.boolean(), record: z.object({ id: z.number(), title: z.string(), prerequisites: z.array(z.number()) }).nullable() }),
  execute: async ({ lessonId }) => ({ found: course.some(item => item.id === lessonId), record: course.find(item => item.id === lessonId) || null }),
});
