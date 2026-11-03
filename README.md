# Mastra · Lesson 04 · Core Building Blocks

Execute typed Mastra workflow steps over a lesson catalog, then compare fixed process logic with an optional agent explanation.

![Practical application preview](docs/application-preview.png)

## Start

Use Node.js 24+. This is an independent repository.

```powershell
git clone https://github.com/luiscoco/Udemy-Mastra-lesson04-app.git
cd Udemy-Mastra-lesson04-app
npm ci
npm start
```

Open http://127.0.0.1:3204. **Run practical lab** executes: Real Mastra workflow execution · no model call. Starting the host makes no model call.

## Five student pages

Application lab · What you will learn · How to run · Architecture & workflow · Code walkthrough. They preserve the approved lesson 1 astronaut, typography, colors, light/dark theme, responsive layout, safe Markdown rendering, syntax colors and copy-code controls.

## Implemented exercise

The real workflow looks up a lesson and builds a bounded plan. A missing catalog record produces a clarification outcome instead of an invented prerequisite.

- **Plan lesson 4:** A successful workflow with a concrete study plan.
- **Missing lesson record:** A completed workflow whose business result asks for a valid lesson.

The local path executes a real two-step Mastra workflow and deterministic planning logic. It does not call a model or persist conversation history. The separately labelled live agent uses the same bounded catalog.

## Optional actual model run

Preserve any existing local configuration. No credential has been copied from another app.

```powershell
if (!(Test-Path .env)) { Copy-Item .env.example .env }
notepad .env
```

Enter your own provider key, choose a model your account can access, and restart. Keys stay on the server and are ignored by Git. Shell values take precedence over the optional file. Live generation may incur provider usage; the normal practical operation does not.

```dotenv
# Set your own provider credential locally. No credential is copied from another app.
OPENAI_API_KEY=your_api_key
MASTRA_MODEL=openai/gpt-4.1-mini
PORT=3204
```

## Build and test

```powershell
npm run sample
npm run sample:live
npm run build
npm test
npm run test:browser
```

The normal sample executes the real key-free operation. The live sample requires provider configuration. Offline SDK integration tests use Mastra's explicit model-test adapter and do not make paid model calls. Browser tests execute the real local lab, navigate all five pages, check responsive behavior and safe code rendering, and capture this app's own preview. Set BROWSER_EXECUTABLE for a nonstandard Chrome/Chromium path.

Source-linked excerpts and the browser script are generated from the actual implementation. Rebuild after editing source. Generated public files and dependency lockfiles are committed for reproducibility.

## Student exercise

Change the session duration and inspect the plan. Then request a missing lesson and explain why SDK success is not the same as satisfying the user's task.

## Key source files

- [src/lab.ts](src/lab.ts)
- [src/mastra/index.ts](src/mastra/index.ts)
- [src/mastra/workflows.ts](src/mastra/workflows.ts)
- [src/mastra/tools.ts](src/mastra/tools.ts)
- [Request host](src/server.ts)
- [Execution envelope](src/runner.ts)
- [Student page generator](scripts/build-pages.ts)

## References

- [Approved lesson 1 baseline](https://github.com/luiscoco/Udemy-Mastra-lesson01-app)
- [Workflows](https://mastra.ai/docs/workflows/overview)
- [Tools](https://mastra.ai/reference/tools/create-tool)

The astronaut, base styles and Prism integration follow the user's approved course assets. Prism's license remains in public/prism-LICENSE.txt. This application's lesson-specific operations, contracts, examples and explanations are tailored to Lesson 4.
