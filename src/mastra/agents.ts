import { Agent } from "@mastra/core/agent";
import { modelId, type AgentModel } from "../core.js";
import { lookupLesson } from "./tools.js";
export function createTutor(model?: AgentModel) {
  return new Agent({ id: "building-blocks-tutor", name: "Building blocks tutor", model: model || modelId(),
    instructions: "Explain the browser, host, Mastra runtime and provider boundaries. Use lookupLesson for catalog facts. Never invent missing records. Return Markdown with fenced code when useful.", tools: { lookupLesson } });
}
export const tutor = createTutor();
export const support = new Agent({ id: "architecture-support", name: "Setup support", model: modelId(), instructions: "Explain local setup. Never request or repeat credentials." });
