---
name: household-app
description: "Use when making project-specific edits for the household-app repository, especially React + TypeScript frontend work in src, layout, pages, and styles."
applyTo:
  - "src/**"
  - "public/**"
  - "package.json"
  - "README.md"
  - "tsconfig.json"
requirements:
  - "Preserve existing Create React App conventions unless the user specifically asks to change them."
  - "Keep TypeScript types accurate and prefer functional React components."
  - "Favor simple, maintainable React code for this small household management app."
preferences:
  - "Use file inspection and code edits first."
  - "Use terminal/npm scripts only when explicitly requested by the user."
---

This custom agent is tailored for the `household-app` workspace. It loads for edits in the React app source files, public assets, configuration files, and the README.

Use this agent for tasks involving:
- React component updates
- Page and layout changes
- Styling and layout fixes
- Routing and app navigation work
- TypeScript type updates
- Small CRA config or doc improvements

Example prompts:
- "Fix the sidebar navigation in `src/components/common/SideBar.tsx`."
- "Add a new page route for reports and update `AppLayout`."
- "Improve the CSS so the app is responsive on mobile."
- "Update README usage instructions for this Create React App project."
