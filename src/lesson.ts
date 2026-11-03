import type { LessonMetadata } from "./core.js";

export const LESSON = {
  "number": 4,
  "title": "Core Building Blocks",
  "shortTitle": "Core building blocks",
  "eyebrow": "AGENT · TOOL · WORKFLOW · CONTEXT",
  "hero": "Build a real",
  "accent": "study-plan workflow.",
  "description": "Execute typed Mastra workflow steps over a lesson catalog, then compare fixed process logic with an optional agent explanation.",
  "labTitle": "Plan the next study session",
  "labDescription": "The real workflow looks up a lesson and builds a bounded plan. A missing catalog record produces a clarification outcome instead of an invented prerequisite.",
  "localMode": "Real Mastra workflow execution · no model call",
  "defaultQuestion": "Explain how the agent, lookup tool, workflow and supplied context differ in this study-plan example.",
  "objectives": [
    {
      "title": "Identify the agent's role",
      "text": "The optional agent explains the selected lesson and can request a lookup. Its model chooses actions within the configured tools and limits."
    },
    {
      "title": "Execute a typed tool",
      "text": "The catalog tool returns a record or a missing-record result. It performs the operation; a confident model answer cannot replace it."
    },
    {
      "title": "Run a defined workflow",
      "text": "createStep and createWorkflow encode lookup then plan. createRun().start() executes that sequence in the installed Mastra runtime."
    },
    {
      "title": "Inspect data between steps",
      "text": "Each step has an input/output schema. The planner consumes the lookup result instead of silently inventing missing fields."
    },
    {
      "title": "Distinguish supplied context from memory",
      "text": "recentLesson comes from this request. It is visible context, not persisted conversation memory; storage-backed memory belongs in a later lesson."
    },
    {
      "title": "Check business completion",
      "text": "The workflow can execute successfully while returning a needs-clarification business outcome. Inspect both levels before reporting success."
    }
  ],
  "workflow": [
    "Validate the study request",
    "Create the registered workflow run",
    "Look up the lesson record",
    "Pass the typed result to the planner",
    "Build a plan or clarification",
    "Inspect SDK and business outcomes"
  ],
  "scope": "The local path executes a real two-step Mastra workflow and deterministic planning logic. It does not call a model or persist conversation history. The separately labelled live agent uses the same bounded catalog.",
  "examples": [
    {
      "name": "Plan lesson 4",
      "input": {
        "lessonId": 4,
        "minutes": 25,
        "recentLesson": 3
      },
      "expected": "A successful workflow with a concrete study plan."
    },
    {
      "name": "Missing lesson record",
      "input": {
        "lessonId": 999,
        "minutes": 25,
        "recentLesson": 3
      },
      "expected": "A completed workflow whose business result asks for a valid lesson."
    }
  ],
  "sourceFiles": [
    "src/lab.ts",
    "src/mastra/index.ts",
    "src/mastra/workflows.ts",
    "src/mastra/tools.ts"
  ],
  "exercise": "Change the session duration and inspect the plan. Then request a missing lesson and explain why SDK success is not the same as satisfying the user's task.",
  "checks": [
    {
      "question": "What makes this a workflow?",
      "answer": "The application defines and executes the sequence of typed steps. It does not rely on a model to choose the order."
    },
    {
      "question": "Does the recentLesson field implement memory?",
      "answer": "No. It is supplied with the current request and is not retained as conversation memory."
    },
    {
      "question": "What should happen when lookup fails?",
      "answer": "The application should expose a missing-record or clarification outcome rather than invent catalog data."
    }
  ],
  "docs": [
    {
      "title": "Workflows",
      "url": "https://mastra.ai/docs/workflows/overview"
    },
    {
      "title": "Tools",
      "url": "https://mastra.ai/reference/tools/create-tool"
    }
  ],
  "readmeWorkflow": [
    {
      "step": "Validate request",
      "component": "src/mastra/workflows.ts",
      "behavior": "Validate lessonId, bounded session minutes and optional recentLesson context."
    },
    {
      "step": "Create run",
      "component": "src/lab.ts",
      "behavior": "Call the registered studyPlan workflow’s createRun() and start()."
    },
    {
      "step": "Lookup step",
      "component": "src/mastra/workflows.ts",
      "behavior": "Execute the typed catalog tool and pass its nullable record forward."
    },
    {
      "step": "Plan step",
      "component": "src/mastra/workflows.ts",
      "behavior": "Build study actions or a needs-clarification outcome from the actual lookup result."
    }
  ],
  "liveWorkflow": [
    "The same real workflow runs first.",
    "The registered tutor explains its returned evidence; recentLesson is explicitly request context."
  ],
  "outcomeNotes": [
    "SDK status success with outcome=needs-clarification is shown as Needs attention.",
    "No conversation memory is configured or retained by this example."
  ]
} satisfies LessonMetadata;
