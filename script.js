const els = {
  defaultSourcePreview: document.querySelector("#defaultSourcePreview"),
  resultsBoard: document.querySelector("#resultsBoard"),
  selfieInput: document.querySelector("#selfieInput"),
  uploadZone: document.querySelector(".upload-zone"),
  apiKeyInput: document.querySelector("#apiKeyInput"),
  modelInput: document.querySelector("#modelInput"),
  aiConsentInput: document.querySelector("#aiConsentInput"),
  generateLocalButton: document.querySelector("#generateLocalButton"),
  generateAiButton: document.querySelector("#generateAiButton"),
  copyPromptsButton: document.querySelector("#copyPromptsButton"),
  saveSelectedButton: document.querySelector("#saveSelectedButton"),
  saveCompareButton: document.querySelector("#saveCompareButton"),
  shareButton: document.querySelector("#shareButton"),
  resetButton: document.querySelector("#resetButton"),
  sourceLabel: document.querySelector("#sourceLabel"),
  engineLabel: document.querySelector("#engineLabel"),
  statusMessage: document.querySelector("#statusMessage"),
  progressBar: document.querySelector("#progressBar"),
  previewCanvas: document.querySelector("#previewCanvas"),
  selectedTitle: document.querySelector("#selectedTitle"),
  selectedDescription: document.querySelector("#selectedDescription"),
  selectedTags: document.querySelector("#selectedTags"),
  modeButtons: document.querySelectorAll(".mode-button")
};

const previewCtx = els.previewCanvas.getContext("2d");

const defaultSource = {
  name: "Glass Glow reference",
  image: "girl.jpg"
};

const localGrades = {
  "soft-glow": { filter: "saturate(1.08) contrast(1.01) brightness(1.04)", tint: "rgba(255, 210, 214, 0.18)" },
  "petite-nose": { filter: "saturate(1.02) contrast(1.04) brightness(1.02)", tint: "rgba(239, 218, 196, 0.16)" },
  "plush-lip": { filter: "saturate(1.14) contrast(1.03) brightness(1.02)", tint: "rgba(222, 72, 116, 0.15)" },
  "fox-lift": { filter: "saturate(1.02) contrast(1.08) brightness(1.01)", tint: "rgba(185, 199, 211, 0.14)" },
  "warm-tone": { filter: "sepia(0.12) saturate(1.15) contrast(1.02) brightness(1.04)", tint: "rgba(244, 166, 108, 0.16)" },
  "brow-open": { filter: "saturate(1.03) contrast(1.04) brightness(1.04)", tint: "rgba(255, 236, 204, 0.16)" },
  "jaw-sculpt": { filter: "saturate(0.98) contrast(1.1) brightness(1)", tint: "rgba(122, 95, 99, 0.13)" },
  "cheek-slim": { filter: "saturate(1.02) contrast(1.07) brightness(1.01)", tint: "rgba(197, 143, 135, 0.13)" },
  "soft-cheeks": { filter: "saturate(1.09) contrast(0.99) brightness(1.04)", tint: "rgba(238, 129, 151, 0.14)" },
  "lash-focus": { filter: "saturate(1.01) contrast(1.09) brightness(1.01)", tint: "rgba(128, 158, 172, 0.13)" },
  "smile-pop": { filter: "saturate(1.1) contrast(1.03) brightness(1.05)", tint: "rgba(255, 245, 210, 0.16)" },
  "chin-balance": { filter: "saturate(0.99) contrast(1.06) brightness(1.02)", tint: "rgba(230, 203, 190, 0.14)" },
  "contour-cover": { filter: "saturate(1.07) contrast(1.1) brightness(1)", tint: "rgba(185, 102, 110, 0.14)" },
  "eye-remix": { filter: "saturate(0.98) contrast(1.08) brightness(1.02)", tint: "rgba(190, 210, 222, 0.14)" },
  "symmetry-polish": { filter: "saturate(1.02) contrast(1.03) brightness(1.03)", tint: "rgba(217, 233, 224, 0.14)" },
  "fresh-face": { filter: "sepia(0.08) saturate(1.16) contrast(1.01) brightness(1.05)", tint: "rgba(255, 192, 158, 0.16)" },
  "smooth-polish": { filter: "saturate(1.04) contrast(0.98) brightness(1.06)", tint: "rgba(255, 236, 218, 0.18)" },
  "full-glam": { filter: "saturate(1.12) contrast(1.1) brightness(1.01)", tint: "rgba(204, 73, 120, 0.15)" },
  "soft-lift": { filter: "saturate(1.05) contrast(1.05) brightness(1.03)", tint: "rgba(255, 218, 196, 0.15)" },
  "natural-reshape": { filter: "saturate(1.01) contrast(1.04) brightness(1.03)", tint: "rgba(235, 221, 207, 0.15)" }
};

const transformations = {
  smallerNose: {
    label: "Smaller nose",
    prompt: "subtly refine the nose bridge and tip so the nose appears slightly smaller while keeping natural facial identity"
  },
  fullerLips: {
    label: "Fuller lips",
    prompt: "make lips appear slightly fuller with natural hydration and soft rose gloss"
  },
  foxEye: {
    label: "Fox eye effect",
    prompt: "create a tasteful lifted outer eye effect with soft editorial eye shaping"
  },
  smoothing: {
    label: "Botox-style smoothing",
    prompt: "soften forehead and expression lines with natural skin texture preserved"
  },
  skinTone: {
    label: "Skin tone preview",
    prompt: "preview a warm even skin tone shift while keeping realistic undertones"
  },
  liftedBrows: {
    label: "Lifted brows",
    prompt: "slightly lift and polish the brows for a more open expression"
  },
  sharperJawline: {
    label: "Sharper jawline",
    prompt: "add a gently sharper jawline through natural contour and shape refinement"
  },
  slimmerCheeks: {
    label: "Slimmer cheeks",
    prompt: "make cheeks appear subtly slimmer with soft shadowing and natural proportions"
  },
  softerCheekbones: {
    label: "Softer cheekbones",
    prompt: "soften the cheekbone emphasis for a rounder, gentler face balance"
  },
  longerLashes: {
    label: "Longer lashes",
    prompt: "add natural longer lashes with tasteful beauty-editorial styling"
  },
  brighterSmile: {
    label: "Brighter smile",
    prompt: "brighten the smile naturally without changing tooth shape dramatically"
  },
  alteredChin: {
    label: "Altered chin shape",
    prompt: "preview a subtly balanced chin shape while preserving the person's identity"
  },
  contour: {
    label: "Contour simulation",
    prompt: "add professional makeup-style contouring and highlight with a polished finish"
  },
  eyeShape: {
    label: "Eye shape variation",
    prompt: "slightly adjust eye emphasis for a softer almond eye look"
  },
  symmetry: {
    label: "Face symmetry adjustment",
    prompt: "create a subtle facial symmetry refinement without making the result look artificial"
  },
  underEye: {
    label: "Radiant under-eye",
    prompt: "brighten under-eye areas while preserving realistic skin texture"
  },
  softBlush: {
    label: "Soft blush lift",
    prompt: "add fresh elevated blush placed high on the cheeks"
  },
  foreheadGlow: {
    label: "Forehead smoothing",
    prompt: "add a smooth natural forehead glow without plastic-looking skin"
  },
  neckLift: {
    label: "Neck and jaw polish",
    prompt: "softly polish the neck and lower face contour in a realistic non-medical way"
  },
  editorialLight: {
    label: "Editorial lighting",
    prompt: "apply premium beauty editorial lighting with luminous skin and soft shadows"
  }
};

const presets = [
  ["soft-glow", "Soft Glow Refresh", "Smooth luminous skin with fresh cheek color.", ["smoothing", "underEye", "softBlush", "editorialLight"], true],
  ["petite-nose", "Petite Nose Preview", "A subtle nose refinement with balanced contour.", ["smallerNose", "contour"]],
  ["plush-lip", "Plush Lip Tint", "Fuller lips with a glossy rose finish.", ["fullerLips", "brighterSmile"]],
  ["fox-lift", "Fox Eye Lift", "Lifted eyes, polished brows, and longer lashes.", ["foxEye", "liftedBrows", "longerLashes"], true],
  ["warm-tone", "Warm Tone Shift", "An even sun-warmed complexion preview.", ["skinTone", "smoothing", "editorialLight"]],
  ["brow-open", "Open Brow Lift", "A brighter expression through lifted brows.", ["liftedBrows", "underEye"]],
  ["jaw-sculpt", "Jawline Sculpt", "Defined jaw and soft lower-face contour.", ["sharperJawline", "neckLift", "contour"], true],
  ["cheek-slim", "Slim Cheek Balance", "Slimmer cheeks with natural side shading.", ["slimmerCheeks", "sharperJawline"]],
  ["soft-cheeks", "Soft Cheekbones", "Gentler cheek planes with fresh blush.", ["softerCheekbones", "softBlush"]],
  ["lash-focus", "Lash Focus", "Long lashes and a softly adjusted eye shape.", ["longerLashes", "eyeShape"]],
  ["smile-pop", "Smile Bright", "A brighter smile with polished skin.", ["brighterSmile", "smoothing"], true],
  ["chin-balance", "Chin Balance", "A subtle chin-shape preview with clean contour.", ["alteredChin", "contour"]],
  ["contour-cover", "Contour Cover Look", "Magazine-style contour, highlight, and glow.", ["contour", "slimmerCheeks", "smallerNose", "editorialLight"]],
  ["eye-remix", "Soft Almond Eye", "A refined eye-shape preview with under-eye radiance.", ["eyeShape", "foxEye", "underEye"]],
  ["symmetry-polish", "Symmetry Polish", "A centered, balanced face preview.", ["symmetry", "smoothing"], true],
  ["fresh-face", "Fresh Face Blend", "Warm tone, soft blush, and smile brightness.", ["skinTone", "softBlush", "brighterSmile"]],
  ["smooth-polish", "Smooth Polish", "Forehead and under-eye glow with natural texture.", ["smoothing", "foreheadGlow", "underEye"]],
  ["full-glam", "Full Glam Preview", "Lifted eyes, plush lips, contour, and blush.", ["foxEye", "longerLashes", "fullerLips", "contour", "softBlush"], true],
  ["soft-lift", "Soft Lift Edit", "Brows, jaw, and cheek color for a lifted look.", ["liftedBrows", "sharperJawline", "softBlush", "editorialLight"]],
  ["natural-reshape", "Natural Reshape", "A balanced blend of nose, chin, and cheek previews.", ["smallerNose", "alteredChin", "softerCheekbones", "symmetry"]]
].map(([id, name, description, effects, featured = false]) => ({ id, name, description, effects, featured }));

const state = {
  sourceImage: null,
  sourceName: defaultSource.name,
  sourceKind: "default",
  selectedPreset: presets[0],
  selectedResult: null,
  results: [],
  mode: "split",
  isGenerating: false,
  previewObjectUrl: null
};

function setStatus(message) {
  els.statusMessage.textContent = message;
}

function setProgress(percent) {
  els.progressBar.style.width = `${Math.max(0, Math.min(100, percent))}%`;
}

function setBusy(isBusy) {
  state.isGenerating = isBusy;
  els.generateLocalButton.disabled = isBusy;
  els.generateAiButton.disabled = isBusy;
}

function drawRoundedRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
}

function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) {
      reject(new Error("Please choose an image file."));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("The image could not be read."));
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("The image could not be loaded."));
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function loadImageFromSrc(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`${src} could not be loaded.`));
    img.src = src;
  });
}

function imageFitBox(targetCanvas, image = state.sourceImage) {
  const ratio = Math.max(targetCanvas.width / image.width, targetCanvas.height / image.height);
  const width = image.width * ratio;
  const height = image.height * ratio;
  return {
    x: (targetCanvas.width - width) / 2,
    y: (targetCanvas.height - height) / 2,
    width,
    height
  };
}

function drawImageCover(context, targetCanvas, image = state.sourceImage) {
  const box = imageFitBox(targetCanvas, image);
  context.drawImage(image, box.x, box.y, box.width, box.height);
  return box;
}

function ellipse(context, x, y, radiusX, radiusY, color, blur = 20, alpha = 1) {
  context.save();
  context.globalAlpha = alpha;
  context.filter = `blur(${blur}px)`;
  context.fillStyle = color;
  context.beginPath();
  context.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2);
  context.fill();
  context.restore();
}

function strokeArc(context, x, y, radiusX, radiusY, start, end, color, width = 7, blur = 0) {
  context.save();
  context.filter = blur ? `blur(${blur}px)` : "none";
  context.strokeStyle = color;
  context.lineWidth = width;
  context.lineCap = "round";
  context.beginPath();
  context.ellipse(x, y, radiusX, radiusY, 0, start, end);
  context.stroke();
  context.restore();
}

function applyEditorialTreatment(context, preset, box, width, height) {
  const grade = localGrades[preset.id] || localGrades["soft-glow"];
  const x = box.x;
  const y = box.y;
  const w = box.width;
  const h = box.height;
  const cx = x + w / 2;
  const scale = Math.min(w, h) / 760;
  const eyeY = y + h * 0.39;
  const mouthY = y + h * 0.66;
  const noseY = y + h * 0.51;
  const jawY = y + h * 0.71;

  context.save();
  context.globalCompositeOperation = "soft-light";
  context.fillStyle = grade.tint;
  context.fillRect(0, 0, width, height);
  context.restore();

  if (preset.effects.includes("editorialLight") || preset.effects.includes("foreheadGlow")) {
    const glow = context.createRadialGradient(cx - w * 0.12, y + h * 0.22, 10, cx - w * 0.12, y + h * 0.22, w * 0.62);
    glow.addColorStop(0, "rgba(255, 247, 226, 0.32)");
    glow.addColorStop(1, "rgba(255, 247, 226, 0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);
  }

  if (preset.effects.includes("smoothing") || preset.effects.includes("underEye")) {
    ellipse(context, cx - w * 0.15, eyeY + h * 0.04, w * 0.1, h * 0.03, "rgba(255, 247, 230, 0.24)", 18 * scale, 1);
    ellipse(context, cx + w * 0.15, eyeY + h * 0.04, w * 0.1, h * 0.03, "rgba(255, 247, 230, 0.24)", 18 * scale, 1);
  }

  if (preset.effects.includes("softBlush") || preset.effects.includes("softerCheekbones")) {
    ellipse(context, cx - w * 0.18, y + h * 0.55, w * 0.13, h * 0.055, "rgba(231, 91, 125, 0.18)", 22 * scale, 1);
    ellipse(context, cx + w * 0.18, y + h * 0.55, w * 0.13, h * 0.055, "rgba(231, 91, 125, 0.18)", 22 * scale, 1);
  }

  if (preset.effects.includes("fullerLips") || preset.effects.includes("brighterSmile")) {
    ellipse(context, cx, mouthY, w * 0.12, h * 0.028, "rgba(184, 45, 83, 0.16)", 10 * scale, 1);
    ellipse(context, cx, mouthY - h * 0.012, w * 0.09, h * 0.012, "rgba(255, 238, 231, 0.24)", 9 * scale, 1);
  }

  if (preset.effects.includes("contour") || preset.effects.includes("slimmerCheeks") || preset.effects.includes("sharperJawline")) {
    ellipse(context, cx - w * 0.25, y + h * 0.56, w * 0.08, h * 0.14, "rgba(86, 48, 57, 0.11)", 25 * scale, 1);
    ellipse(context, cx + w * 0.25, y + h * 0.56, w * 0.08, h * 0.14, "rgba(86, 48, 57, 0.11)", 25 * scale, 1);
    strokeArc(context, cx, jawY, w * 0.25, h * 0.11, Math.PI * 0.14, Math.PI * 0.86, "rgba(55, 35, 43, 0.1)", 11 * scale, 12 * scale);
  }

  if (preset.effects.includes("smallerNose") || preset.effects.includes("alteredChin")) {
    ellipse(context, cx, noseY, w * 0.045, h * 0.11, "rgba(255, 246, 230, 0.18)", 18 * scale, 1);
  }

  if (preset.effects.includes("foxEye") || preset.effects.includes("eyeShape") || preset.effects.includes("longerLashes")) {
    strokeArc(context, cx - w * 0.16, eyeY, w * 0.1, h * 0.028, Math.PI * 1.08, Math.PI * 1.92, "rgba(40, 26, 33, 0.18)", 4 * scale, 3 * scale);
    strokeArc(context, cx + w * 0.16, eyeY, w * 0.1, h * 0.028, Math.PI * 1.08, Math.PI * 1.92, "rgba(40, 26, 33, 0.18)", 4 * scale, 3 * scale);
  }

  const vignette = context.createRadialGradient(cx, y + h * 0.45, w * 0.2, cx, y + h * 0.45, w * 0.78);
  vignette.addColorStop(0, "rgba(255,255,255,0)");
  vignette.addColorStop(1, "rgba(37,24,32,0.16)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}

function renderLocalResult(preset, width, height) {
  const resultCanvas = document.createElement("canvas");
  resultCanvas.width = width;
  resultCanvas.height = height;
  const context = resultCanvas.getContext("2d");
  const grade = localGrades[preset.id] || localGrades["soft-glow"];

  context.fillStyle = "#fff8f4";
  context.fillRect(0, 0, width, height);
  context.save();
  context.filter = grade.filter;
  const box = drawImageCover(context, resultCanvas);
  context.restore();
  applyEditorialTreatment(context, preset, box, width, height);

  const wash = context.createLinearGradient(0, 0, 0, height);
  wash.addColorStop(0, "rgba(255,255,255,0)");
  wash.addColorStop(1, "rgba(39,24,32,0.08)");
  context.fillStyle = wash;
  context.fillRect(0, 0, width, height);
  return resultCanvas;
}

function buildPrompt(preset) {
  const effects = preset.effects.map((id) => transformations[id].prompt).join("; ");
  return [
    "Edit this portrait as a tasteful beauty-editorial preview.",
    "Preserve the person's identity, age impression, expression, camera angle, hair, clothing, and background unless directly affected by the requested face styling.",
    "Do not make the image clinical, surgical, extreme, unrealistic, or shaming.",
    `Requested look: ${preset.name}.`,
    `Apply these subtle changes: ${effects}.`,
    "Return a polished photorealistic portrait suitable for a Pinterest-style result card.",
    "No text, labels, logos, watermarks added by the prompt, or medical framing."
  ].join(" ");
}

function buildAllPrompts() {
  return presets.map((preset, index) => `${index + 1}. ${preset.name}\n${buildPrompt(preset)}`).join("\n\n");
}

function sourceCanvas(size = 1024) {
  const out = document.createElement("canvas");
  out.width = size;
  out.height = size;
  const context = out.getContext("2d");
  context.fillStyle = "#fff8f4";
  context.fillRect(0, 0, size, size);
  drawImageCover(context, out, state.sourceImage);
  return out;
}

function sourceBase64() {
  return sourceCanvas(1024).toDataURL("image/png").split(",")[1];
}

function findInlineImagePart(response) {
  const parts = response?.candidates?.[0]?.content?.parts || [];
  return parts.find((part) => part.inlineData?.data || part.inline_data?.data);
}

function isFatalGeminiError(message) {
  return /Gemini (400|401|403|404|429)|Failed to fetch|NetworkError|API key|quota|permission|model/i.test(message);
}

async function callGeminiImageEdit(preset) {
  const apiKey = els.apiKeyInput.value.trim();
  const model = els.modelInput.value.trim() || "gemini-3.1-flash-image-preview";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
  const body = {
    contents: [
      {
        parts: [
          { text: buildPrompt(preset) },
          {
            inlineData: {
              mimeType: "image/png",
              data: sourceBase64()
            }
          }
        ]
      }
    ],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"]
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(await geminiErrorMessage(response));
  }

  const data = await response.json();
  const part = findInlineImagePart(data);
  const imageData = part?.inlineData?.data || part?.inline_data?.data;
  const mimeType = part?.inlineData?.mimeType || part?.inline_data?.mimeType || "image/png";
  if (!imageData) {
    throw new Error("Gemini returned no image for this look.");
  }
  return `data:${mimeType};base64,${imageData}`;
}

async function geminiErrorMessage(response) {
  const fallback = `Gemini request failed with HTTP ${response.status}.`;
  try {
    const data = await response.clone().json();
    return data?.error?.message ? `Gemini ${response.status}: ${data.error.message}` : fallback;
  } catch (error) {
    const text = await response.text().catch(() => "");
    return text ? `Gemini ${response.status}: ${text}` : fallback;
  }
}

function resultHeight() {
  return 680;
}

function downloadDataUrl(dataUrl, filename) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

function downloadCanvas(canvas, filename) {
  downloadDataUrl(canvas.toDataURL("image/png"), filename);
}

function resultDataUrl(result) {
  return result.dataUrl || result.canvas?.toDataURL("image/png");
}

function selectResult(result) {
  state.selectedResult = result;
  state.selectedPreset = result.preset;
  els.selectedTitle.textContent = result.preset.name;
  els.selectedDescription.textContent = result.preset.description;
  els.selectedTags.innerHTML = "";
  result.preset.effects.forEach((id) => {
    const tag = document.createElement("span");
    tag.textContent = transformations[id].label;
    els.selectedTags.appendChild(tag);
  });
  document.querySelectorAll(".result-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.id === result.preset.id);
  });
  renderCompare();
}

function saveResult(result) {
  if (!result) {
    setStatus("Choose a result card before saving.");
    return;
  }
  const filename = `${result.preset.id}-${state.sourceName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
  if (result.canvas) {
    downloadCanvas(result.canvas, filename);
  } else {
    downloadDataUrl(result.dataUrl, filename);
  }
  setStatus(`Saved ${result.preset.name}.`);
}

function renderResultCard(result) {
  const card = document.createElement("article");
  card.className = `result-card${result.preset.id === state.selectedPreset.id ? " active" : ""}`;
  card.dataset.id = result.preset.id;
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Inspect ${result.preset.name}`);

  if (result.canvas) {
    card.appendChild(result.canvas);
  } else {
    const img = new Image();
    img.alt = result.preset.name;
    img.src = result.dataUrl;
    card.appendChild(img);
  }

  const meta = document.createElement("div");
  meta.className = "result-meta";
  meta.innerHTML = `<strong>${result.preset.name}</strong><span>${result.engine === "ai" ? "AI edited" : "Local preview"}</span>`;

  const save = document.createElement("button");
  save.className = "result-save";
  save.type = "button";
  save.textContent = "Save";
  save.addEventListener("click", (event) => {
    event.stopPropagation();
    saveResult(result);
  });

  const select = () => selectResult(result);
  card.addEventListener("click", select);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      select();
    }
  });

  card.append(meta, save);
  return card;
}

function renderResultsBoard() {
  els.resultsBoard.innerHTML = "";
  state.results.forEach((result) => {
    els.resultsBoard.appendChild(renderResultCard(result));
  });
}

function drawCompareImage(context, imageSource, targetCanvas) {
  if (!imageSource) return;
  const image = imageSource instanceof HTMLCanvasElement ? imageSource : imageSource;
  const ratio = Math.max(targetCanvas.width / image.width, targetCanvas.height / image.height);
  const width = image.width * ratio;
  const height = image.height * ratio;
  context.drawImage(image, (targetCanvas.width - width) / 2, (targetCanvas.height - height) / 2, width, height);
}

function renderCompare() {
  const canvas = els.previewCanvas;
  previewCtx.fillStyle = "#fff8f4";
  previewCtx.fillRect(0, 0, canvas.width, canvas.height);

  if (!state.sourceImage) {
    previewCtx.fillStyle = "#251820";
    previewCtx.font = "700 52px system-ui, sans-serif";
    previewCtx.textAlign = "center";
    previewCtx.fillText("Loading portrait", canvas.width / 2, canvas.height / 2 - 20);
    return;
  }

  const afterSource = state.selectedResult?.canvas || state.selectedResult?.image || state.sourceImage;

  if (state.mode === "before") {
    drawCompareImage(previewCtx, state.sourceImage, canvas);
  } else if (state.mode === "after") {
    drawCompareImage(previewCtx, afterSource, canvas);
  } else {
    drawCompareImage(previewCtx, state.sourceImage, canvas);
    previewCtx.save();
    previewCtx.beginPath();
    previewCtx.rect(canvas.width / 2, 0, canvas.width / 2, canvas.height);
    previewCtx.clip();
    drawCompareImage(previewCtx, afterSource, canvas);
    previewCtx.restore();

    previewCtx.strokeStyle = "rgba(255,255,255,0.9)";
    previewCtx.lineWidth = 5;
    previewCtx.beginPath();
    previewCtx.moveTo(canvas.width / 2, 0);
    previewCtx.lineTo(canvas.width / 2, canvas.height);
    previewCtx.stroke();
  }

  previewCtx.fillStyle = "rgba(255,255,255,0.88)";
  drawRoundedRect(previewCtx, 28, 28, 128, 48, 24);
  previewCtx.fill();
  drawRoundedRect(previewCtx, canvas.width - 178, 28, 150, 48, 24);
  previewCtx.fill();
  previewCtx.fillStyle = "#251820";
  previewCtx.font = "800 23px system-ui, sans-serif";
  previewCtx.textAlign = "center";
  previewCtx.fillText(state.mode === "after" ? "Preview" : "Before", 92, 60);
  previewCtx.fillText(state.mode === "before" ? "Original" : "After", canvas.width - 103, 60);
}

async function generateLocalGallery() {
  if (!state.sourceImage || state.isGenerating) return;
  setBusy(true);
  setProgress(0);
  els.engineLabel.textContent = "Local preview mode";
  state.results = [];
  renderResultsBoard();
  setStatus("Generating local editorial preview cards...");

  for (let index = 0; index < presets.length; index += 1) {
    const preset = presets[index];
    const result = {
      preset,
      engine: "local",
      canvas: renderLocalResult(preset, 560, resultHeight(index, preset))
    };
    state.results.push(result);
    renderResultsBoard();
    if (index === 0) selectResult(result);
    setProgress(((index + 1) / presets.length) * 100);
    await new Promise((resolve) => setTimeout(resolve, 15));
  }

  setStatus(`Generated ${state.results.length} local preview cards.`);
  setBusy(false);
}

async function generateAiGallery() {
  if (!state.sourceImage || state.isGenerating) return;
  const apiKey = els.apiKeyInput.value.trim();
  if (!apiKey) {
    setStatus("Add a Gemini API key to generate with Nano Banana 2.");
    return;
  }
  if (!els.aiConsentInput.checked) {
    setStatus("Consent is required before sending an image to Gemini.");
    return;
  }

  setBusy(true);
  setProgress(0);
  els.engineLabel.textContent = "Nano Banana 2 mode";
  state.results = [];
  renderResultsBoard();
  setStatus("Sending the selected image to Gemini for AI-edited preview cards...");
  let firstError = "";

  for (let index = 0; index < presets.length; index += 1) {
    const preset = presets[index];
    try {
      const dataUrl = await callGeminiImageEdit(preset);
      const image = new Image();
      image.src = dataUrl;
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      });
      const result = { preset, engine: "ai", dataUrl, image };
      state.results.push(result);
      renderResultsBoard();
      if (index === 0) selectResult(result);
      setStatus(`Generated ${index + 1} of ${presets.length} AI preview cards.`);
    } catch (error) {
      firstError = firstError || error.message;
      const fallback = {
        preset,
        engine: "local",
        canvas: renderLocalResult(preset, 560, resultHeight(index, preset))
      };
      state.results.push(fallback);
      renderResultsBoard();
      if (index === 0) selectResult(fallback);
      setStatus(`Gemini failed for ${preset.name}: ${error.message}`);
      if (isFatalGeminiError(error.message)) {
        for (let fallbackIndex = index + 1; fallbackIndex < presets.length; fallbackIndex += 1) {
          const fallbackPreset = presets[fallbackIndex];
          state.results.push({
            preset: fallbackPreset,
            engine: "local",
            canvas: renderLocalResult(fallbackPreset, 560, resultHeight(fallbackIndex, fallbackPreset))
          });
        }
        renderResultsBoard();
        setProgress(100);
        break;
      }
    }
    setProgress(((index + 1) / presets.length) * 100);
  }

  if (firstError) {
    setStatus(`Gemini did not complete. Local fallback cards were used. First error: ${firstError}`);
  } else {
    setStatus(`Generated ${state.results.length} AI preview cards.`);
  }
  setBusy(false);
}

function updateSourcePreview(src) {
  if (els.defaultSourcePreview) {
    els.defaultSourcePreview.src = src;
  }
}

function clearPreviewObjectUrl() {
  if (state.previewObjectUrl) {
    URL.revokeObjectURL(state.previewObjectUrl);
    state.previewObjectUrl = null;
  }
}

async function selectDefaultSource() {
  try {
    clearPreviewObjectUrl();
    state.sourceImage = await loadImageFromSrc(defaultSource.image);
    state.sourceName = defaultSource.name;
    state.sourceKind = "default";
    state.selectedPreset = presets[0];
    state.selectedResult = null;
    els.sourceLabel.textContent = "Default selected";
    updateSourcePreview(defaultSource.image);
    await generateLocalGallery();
  } catch (error) {
    setStatus(error.message);
  }
}

async function handleUpload(file) {
  try {
    const image = await loadImageFromFile(file);
    state.sourceImage = image;
    state.sourceName = file.name.replace(/\.[^.]+$/, "") || "uploaded-selfie";
    state.sourceKind = "upload";
    state.selectedPreset = presets[0];
    state.selectedResult = null;
    els.sourceLabel.textContent = "Selfie selected";
    clearPreviewObjectUrl();
    state.previewObjectUrl = URL.createObjectURL(file);
    updateSourcePreview(state.previewObjectUrl);
    await generateLocalGallery();
  } catch (error) {
    setStatus(error.message);
  }
}

async function copyPrompts() {
  const prompts = buildAllPrompts();
  try {
    await navigator.clipboard.writeText(prompts);
    setStatus("Copied all Nano Banana 2 prompts.");
  } catch (error) {
    setStatus("Clipboard access was unavailable. Select and copy prompts from README if needed.");
  }
}

async function shareSelected() {
  if (!state.selectedResult) {
    setStatus("Choose a result card before sharing.");
    return;
  }

  const dataUrl = resultDataUrl(state.selectedResult);
  const blob = await (await fetch(dataUrl)).blob();
  const file = new File([blob], "glow-preview.png", { type: "image/png" });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        title: "Glow Studio",
        text: "A beauty-editorial preview from Glow Studio.",
        files: [file]
      });
      setStatus("Share sheet opened.");
    } catch (error) {
      setStatus("Sharing was canceled or unavailable.");
    }
  } else {
    saveResult(state.selectedResult);
    setStatus("Direct sharing is unavailable here, so the selected PNG was saved.");
  }
}

function wireEvents() {
  els.selfieInput.addEventListener("change", (event) => handleUpload(event.target.files[0]));

  ["dragenter", "dragover"].forEach((eventName) => {
    els.uploadZone.addEventListener(eventName, (event) => {
      event.preventDefault();
      els.uploadZone.classList.add("drag-over");
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    els.uploadZone.addEventListener(eventName, (event) => {
      event.preventDefault();
      els.uploadZone.classList.remove("drag-over");
    });
  });

  els.uploadZone.addEventListener("drop", (event) => {
    handleUpload(event.dataTransfer.files[0]);
  });

  els.generateLocalButton.addEventListener("click", generateLocalGallery);
  els.generateAiButton.addEventListener("click", generateAiGallery);
  els.copyPromptsButton.addEventListener("click", copyPrompts);
  els.saveSelectedButton.addEventListener("click", () => saveResult(state.selectedResult));
  els.saveCompareButton.addEventListener("click", () => downloadCanvas(els.previewCanvas, "glow-before-after.png"));
  els.shareButton.addEventListener("click", shareSelected);
  els.resetButton.addEventListener("click", selectDefaultSource);

  els.modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.mode = button.dataset.mode;
      els.modeButtons.forEach((item) => item.classList.toggle("active", item === button));
      renderCompare();
    });
  });
}

async function init() {
  wireEvents();
  await selectDefaultSource();
}

init();
