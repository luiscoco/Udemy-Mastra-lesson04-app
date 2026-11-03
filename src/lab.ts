import { mastra } from "./mastra/index.js";
import { createTutor } from "./mastra/agents.js";
import { studyInput } from "./mastra/workflows.js";
import { assertActive, generateAnswer, modelId, type AgentModel, type Emit, type LabResult } from "./core.js";
export const inputSchema = studyInput;
export async function executeLab(raw: unknown, emit: Emit, signal: AbortSignal): Promise<LabResult> {
  const input = inputSchema.parse(raw); assertActive(signal);
  emit({ type: "stage", text: "Creating and starting the registered two-step study-plan workflow." });
  const run = await mastra.getWorkflow("studyPlan").createRun();
  const response = await run.start({ inputData: input }); assertActive(signal);
  const businessReady = response.status === "success" && response.result.outcome === "ready";
  return { status: businessReady ? "pass" : "needs-attention", summary: businessReady ? "The workflow completed and found a usable study plan." : "Inspect SDK execution separately from the missing-record business outcome.",
    data: { sdkStatus: response.status, runId: run.runId, result: response.status === "success" ? response.result : null, stepIds: Object.keys(response.steps), memoryConfigured: false } };
}
export const liveModel = (_?: unknown) => modelId();
export async function executeLive(raw: unknown, question: string, emit: Emit, signal: AbortSignal, model?: AgentModel) {
  const report = await executeLab(raw, emit, signal);
  return generateAnswer(model ? createTutor(model) : mastra.getAgent("tutor"), `${question}\nWorkflow evidence: ${JSON.stringify(report.data)}. recentLesson is request context, not stored memory.`, emit, signal);
}
export async function dispose() {}
