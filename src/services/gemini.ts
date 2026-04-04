import { GoogleGenAI, Type } from "@google/genai";
import { Correction } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const geminiService = {
  async getCorrection(text: string): Promise<Correction> {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Correct the following English text and provide a brief explanation of the changes. Focus on grammar, spelling, and natural phrasing.
      
      Text: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            original: { type: Type.STRING },
            corrected: { type: Type.STRING },
            explanation: { type: Type.STRING },
          },
          required: ["original", "corrected", "explanation"],
        },
      },
    });

    return JSON.parse(response.text || "{}") as Correction;
  },

  async getChatResponse(history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "You are a friendly and patient English language tutor. Engage in a natural conversation with the user. If they make a mistake, gently correct them in your response. Keep your language simple and appropriate for a beginner to intermediate learner.",
      },
    });

    // We send the last message as the new message
    const lastMessage = history[history.length - 1].parts[0].text;
    const response = await chat.sendMessage({ message: lastMessage });
    return response.text;
  }
};
