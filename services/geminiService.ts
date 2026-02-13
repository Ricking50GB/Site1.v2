import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateWelcomeMessage = async (userName: string): Promise<string> => {
  if (!apiKey) {
    return "Bienvenido (Modo Demo: API Key no configurada).";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, energetic, automotive-themed welcome message in Spanish for a driver named "${userName}". Use metaphors about engines, roads, or speed. Keep it under 30 words.`,
    });
    return response.text || `¡Motores listos, ${userName}!`;
  } catch (error) {
    console.error("Error generating welcome message:", error);
    return `¡Bienvenido a boxes, ${userName}!`;
  }
};