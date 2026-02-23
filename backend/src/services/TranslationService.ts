
import { ResumeSchema } from '../types/resume';
import { GeminiService } from './GeminiService';

export class TranslationService {
    private gemini = new GeminiService();

    /**
     * Translates a ResumeSchema between ITA and ENG.
     */
    async translate(resume: ResumeSchema, targetLang: 'ITA' | 'ENG'): Promise<ResumeSchema> {
        const translated = JSON.parse(JSON.stringify(resume));

        // 1. Translate Basic Info
        translated.basics.label = await this.translateText(resume.basics.label, targetLang);
        translated.basics.summary = await this.translateText(resume.basics.summary, targetLang);

        // 2. Translate Experience
        for (const job of translated.work) {
            job.position = await this.translateText(job.position, targetLang);
            for (const bullet of job.highlights) {
                bullet.original = await this.translateText(bullet.original, targetLang);
                if (bullet.tailored) {
                    bullet.tailored = await this.translateText(bullet.tailored, targetLang);
                }
            }
        }

        return translated;
    }

    private async translateText(text: string, targetLang: string): Promise<string> {
        if (!text) return "";
        const prompt = `
      Translate the following professional CV text to ${targetLang}.
      Maintain the professional tone and industry-standard terminology.
      Do NOT translate technical terms or tools (e.g., SQL, Agile, BPMN, Java).
      
      Text: ${text}
      
      Return ONLY the translated text.
    `;
        return await this.gemini.generateText(prompt);
    }
}
