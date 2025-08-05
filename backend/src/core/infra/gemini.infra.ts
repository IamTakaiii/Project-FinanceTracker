import { GoogleGenAI } from "@google/genai";

import { ENV } from "./env.infra";

export const gemini = new GoogleGenAI({
  apiKey: ENV.GEMINI_API_KEY,
});

export const geminiConfigs = {
  tools: [{ googleSearch: {} }],
};
