import assert from "node:assert/strict";
import { test, after } from "node:test";
import { executeLab, dispose } from "../src/lab.js";
import { LESSON } from "../src/lesson.js";
const run = (input: unknown) => executeLab(input, () => {}, new AbortController().signal);
after(async () => { await dispose(); });

test("workflow SDK success does not conceal missing-record business failure", async () => {
  const result = await run(LESSON.examples[1].input);
  const data = result.data as { sdkStatus: string; result: { outcome: string }; memoryConfigured: boolean; stepIds: string[] };
  assert.equal(data.sdkStatus, "success"); assert.equal(data.result.outcome, "needs-clarification");
  assert.equal(result.status, "needs-attention"); assert.equal(data.memoryConfigured, false);
  assert(data.stepIds.includes("lookup") && data.stepIds.includes("plan"));
});
