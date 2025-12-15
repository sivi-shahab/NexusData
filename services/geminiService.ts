import { GoogleGenAI } from "@google/genai";

// Ensure API key is present
const API_KEY = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const analyzeErrorLog = async (jobName: string, errorLog: string): Promise<string> => {
  if (!API_KEY) {
    return "API Key is missing. Please check your environment variables.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are a Senior Big Data DevOps Engineer.
      Analyze the following error log for the job "${jobName}".
      
      1. Explain the root cause in simple terms.
      2. Suggest 2-3 specific actionable steps to fix it.
      3. Format the response using Markdown.
      
      Error Log:
      \`\`\`
      ${errorLog}
      \`\`\`
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "No analysis could be generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to analyze log. Please try again later.";
  }
};

export const getToolOptimizationTips = async (toolName: string, metrics: string): Promise<string> => {
    if (!API_KEY) {
        return "API Key is missing.";
    }

    try {
        const model = 'gemini-2.5-flash';
        const prompt = `
            Give me 3 short, bullet-pointed optimization tips for ${toolName} based on these current metrics: ${metrics}.
            Keep it strictly under 100 words.
        `;
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text || "No tips available.";
    } catch (e) {
        return "Could not fetch optimization tips.";
    }
}
