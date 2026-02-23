
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

export class GeminiService {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor() {
        const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("GOOGLE_GEMINI_API_KEY is not defined in .env");
        }
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }

    async generateJson(prompt: string): Promise<any> {
        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            console.log(`[GeminiService] Raw AI response: ${text.substring(0, 100)}...`);

            // Extract JSON from markdown code block if present
            const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/{[\s\S]*}/);
            const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : text;

            try {
                const parsed = JSON.parse(jsonString);
                console.log("[GeminiService] Successfully parsed JSON result");
                return parsed;
            } catch (pError) {
                console.error("[GeminiService] JSON Parse Error. Raw text:", text);
                throw pError;
            }
        } catch (error) {
            console.error("[GeminiService] API or Network Error:", error);
            throw error;
        }
    }

    async generateText(prompt: string): Promise<string> {
        try {
            console.log(`[GeminiService] Text Prompt Started (first 50 chars): ${prompt.trim().substring(0, 50)}...`);
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            console.log(`[GeminiService] Text Response Received (first 50 chars): ${text.trim().substring(0, 50)}...`);
            return text;
        } catch (error) {
            console.error("[GeminiService] Text Generation Error:", error);
            throw error;
        }
    }

    async chatWithGuru(messages: any[], context: { resume?: any, jd?: string }): Promise<string> {
        // Extract the user's actual message text
        const lastMsg = messages[messages.length - 1];
        const userText = typeof lastMsg === 'string'
            ? lastMsg
            : (lastMsg?.parts?.[0]?.text || lastMsg?.content || String(lastMsg));

        // Embed context + persona directly in the prompt (works with all SDK versions)
        const fullPrompt = `Sei il CurriculumAI Guru: amichevole, professionale, incoraggiante. Rispondi in italiano. Max 3-4 frasi.

CONTESTO:
- CV: ${context.resume ? JSON.stringify(context.resume.basics) : 'Non ancora caricato'}
- Job Description: ${context.jd || 'Non fornita'}

REGOLA: Non inventare dati. Se non hai info, chiedi all'utente di caricare il CV.

DOMANDA UTENTE: ${userText}

RISPOSTA DEL GURU:`;

        try {
            const result = await this.model.generateContent(fullPrompt);
            return result.response.text();
        } catch (error) {
            console.error("[GeminiService] Guru Chat Error:", error);
            throw error;
        }
    }
}
