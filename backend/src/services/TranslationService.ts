
import { ResumeSchema } from '../types/resume';
import { GeminiService } from './GeminiService';

export class TranslationService {
    constructor(private gemini = new GeminiService()) { }

    /**
     * Translates a ResumeSchema between ITA and ENG.
     */
    async translate(resume: ResumeSchema, targetLang: 'ITA' | 'ENG'): Promise<ResumeSchema> {
        const prompt = `
      Translate the following professional CV JSON data to ${targetLang}.
      Maintain the professional tone and industry-standard terminology.
      Do NOT translate technical terms or tools (e.g., SQL, Agile, BPMN, Java).
      Return ONLY the JSON. Maintain the exact same keys and structure as the input JSON.
      Only the values of string properties (like summary, position, highlights, label, etc.) should be translated.
      
      JSON data to translate:
      ${JSON.stringify(resume)}
    `;

        try {
            const translatedResume = await this.gemini.generateJson(prompt);
            return translatedResume;
        } catch (error) {
            console.error("Translation failed, returning original resume", error);
            return resume; // fallback
        }
    }
}
