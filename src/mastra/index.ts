import { Mastra } from "@mastra/core/mastra";
import { tutor } from "./agents.js";
import { studyPlan } from "./workflows.js";
export const mastra = new Mastra({ agents: { tutor }, workflows: { studyPlan } });
