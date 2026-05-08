# AGENTS.md

## Project Overview
- **Project:** Glow Studio — a beauty-editorial selfie transformation web app for playful, non-medical facial visualization.
- **Target user:** Women ages 18 to 55 who want a safe, tasteful way to explore possible facial style changes before making any real-world decisions.
- **My skill level:** beginner / intermediate
- **Stack:** Static HTML, CSS, and vanilla JavaScript for the MVP. The app includes an optional direct Gemini Nano Banana 2 test path, but production AI calls should move behind a backend or serverless function.

## Product Vision
- Load the built-in `girl.jpg` reference portrait by default so users can explore the experience before uploading their own selfie.
- Use AI-style image editing for final generated looks, planned around Nano Banana 2 from Gemini.
- Make the compact dashboard and generated-look gallery the first-priority experience after the default image loads.
- Use a beauty-editorial visual direction: polished, confident, tasteful, magazine-like, and not childish.
- Generate 20 pre-defined changed-face images per selected face.
- Preserve the user's identity and pose while changing only the requested facial styling details.
- Clearly label AI-generated or AI-edited results.

## Layout Reference
- `reference.webp` is the layout reference for the website design.
- Match its compact dashboard structure: left navigation rail, top utility bar, rounded white panels, restrained shadows, compact cards, and professional spacing.
- `girl.jpg` is the default face reference and local result quality reference.
- After the default reference loads or a selfie is uploaded, generate a broad board of pre-defined changed-face previews instead of making the user build every look manually.
- Keep 20 generated preview cards visible in the results board.
- The generated preview cards should feel like shareable beauty inspiration cards, while the main canvas stays available for before/after comparison.

## Commands
- **Install:** No install step required
- **Dev:** Open `index.html` in a browser
- **Build:** No build step required
- **Test:** Manually test in a browser
- **Lint:** No lint command configured

## Do
- Read existing code before modifying anything
- Match existing patterns, naming, and style
- Handle errors gracefully — no silent failures
- Keep changes small and scoped to what was asked
- Verify changes in a browser when UI behavior changes
- Ask clarifying questions before guessing when requirements are risky or unclear
- Keep the tone clear, reassuring, empowering, and playful without pressuring the user
- Use original graphics, gradients, canvas effects, and user-provided images only
- Keep the experience non-medical and focused on visualization, not diagnosis or promises
- Protect privacy by keeping uploaded photos in the browser unless the user explicitly saves or shares an image
- Keep clear consent, upload progress, privacy copy, error states, and local fallback behavior around any Nano Banana 2 integration

## Don't
- Install new dependencies without asking
- Delete or overwrite files without confirming
- Hardcode secrets, API keys, or credentials
- Rewrite working code unless explicitly asked
- Push, deploy, or force-push without permission
- Make changes outside the scope of the request
- Present transformations as guaranteed real-world outcomes
- Use shaming, fear-based, or pressure-based beauty language
- Add medical, clinical, or procedure-specific claims
- Send user photos to an AI service without clear user consent

## When Stuck
- If a task is large, break it into steps and confirm the plan first
- If you can't fix an error in 2 attempts, stop and explain the issue

## Testing
- No automated tests are configured yet
- Manually check automatic default `girl.jpg` loading, selfie upload, generated preview board, Nano Banana 2 consent/key flow, before/after comparison, result rendering, PNG saving, prompt copying, and sharing after UI changes
- Add automated tests only after a test framework exists or the user asks for one

## Git
- Small, focused commits with descriptive messages
- Never force push

## Response Style
- always respond with clear & concise messages
- use plain English when explaining to the User
- avoid long sentences, complex words, or long paragraphs
