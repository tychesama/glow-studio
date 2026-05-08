# Glow Studio

Glow Studio is a beauty-editorial selfie transformation web app for women ages 18 to 55. It lets a user try a built-in reference portrait or upload a selfie, generate playful non-medical facial style variations with AI-style image editing, compare before and after views, and save or share results.

## Features

- Try the app with `girl.jpg` before uploading a personal photo
- Upload a selfie directly in the browser
- Generate 20 pre-defined changed-face preview cards from the selected face
- Use polished local editorial previews without an API key
- Optionally generate with Nano Banana 2 when a Gemini API key and consent are provided
- Copy the exact AI prompts for all result cards
- Pinterest-style gallery as the primary screen
- Switch between split, before, and after views
- Save a selected result card or before/after comparison as a PNG
- Share the selected result through the browser share sheet when supported
- Reassuring privacy-first copy and non-medical language

## MVP Direction

- Visual style: beauty-editorial, polished, confident, and magazine-like.
- Primary flow: open into the Pinterest-style generated results gallery first.
- Input options: include the built-in `girl.jpg` reference and user selfie upload.
- Image engine: plan for AI-style image editing with Nano Banana 2 from Gemini.
- AI behavior: generate 20 distinct pre-defined face-change images from the selected source image.
- Editing approach: preserve the person's identity and pose while changing only the requested facial styling details.
- Safety stance: results are visualization only, not medical advice or guaranteed real-world outcomes.
- Transparency: AI-generated or AI-edited results should be clearly labeled.

## Layout Direction

The file `girl.jpg` is the visual reference for the sample face and local preview quality. The result gallery should keep a Pinterest-style masonry feel: mixed-height rounded image tiles, generous white gutters, a polished lifestyle mood, and a bold rose `Save` pill over each result card.

After a sample face is selected or a selfie is uploaded, the main experience shows 20 generated preview cards. Each card represents a pre-defined face-change combination. Tapping a card loads that look into the before/after comparison canvas.

## AI Image Editing Plan

Use Nano Banana 2 through Gemini image generation/editing for production AI edits. The official Gemini image generation page describes Nano Banana 2 as its latest image model and supports uploaded-image editing, style changes, detail adjustments, resizing, and AI-generated image watermarking.

Source: https://gemini.google/overview/image-generation/

The current MVP includes a direct browser-based Gemini API path for testing:

- Add a Gemini API key in the app.
- Keep the model as `gemini-3.1-flash-image-preview` unless Gemini changes the recommended model.
- Check the consent box before sending the selected image.
- Click `Generate with Nano Banana 2`.
- If any AI request fails, the app adds a local fallback card so the gallery still completes.

For production, move the Gemini call behind a backend or serverless function. Do not ship a public app that asks users to expose private API keys in client-side code.

## Transformation Options

- Smaller nose
- Fuller lips
- Fox eye effect
- Botox-style smoothing
- Different skin tone preview
- Lifted brows
- Sharper jawline
- Slimmer cheeks
- Softer cheekbones
- Longer lashes
- Brighter smile
- Altered chin shape
- Contour simulation
- Eye shape variation
- Face symmetry adjustment
- Radiant under-eye
- Soft blush lift
- Forehead smoothing
- Neck and jaw polish
- Editorial lighting

## Language Guardrails

- Keep the experience playful, editorial, and non-medical.
- Describe results as previews, mockups, or style ideas.
- Avoid diagnosis, procedure planning, clinical claims, or guaranteed outcomes.
- Keep uploaded photos local unless the user consents to AI editing.

## How To Run

Open `index.html` in a browser. No install or build step is needed for the current static MVP.

## Manual Test Checklist

- Select each built-in `girl.jpg` sample treatment
- Upload a selfie image
- Generate the local gallery
- Select several result cards
- Switch split, before, and after comparison modes
- Save a selected card
- Save the comparison image
- Try browser sharing when supported
- Copy the AI prompts
- Try Nano Banana 2 generation with consent and a valid Gemini API key

## Notes

This app is for playful visualization only. It does not provide medical advice, diagnosis, procedure planning, or guaranteed real-world results. Local preview mode keeps photos in the browser. Nano Banana 2 mode requires consent before sending the selected image to Gemini, and production use should move that request behind a backend or serverless function.
