
import { ResumeSchema } from '../types/resume';
import { JDAnalysis } from './JDAnalyzerService';
import { GeminiService } from './GeminiService';

export class TailoringEngineService {
    private gemini = new GeminiService();

    async generateVariant(resume: ResumeSchema, analysis: JDAnalysis, variantType: string): Promise<ResumeSchema> {
        const tailored = JSON.parse(JSON.stringify(resume));

        // 1. Tailor Summary
        const summaryPrompt = `
      As a professional CV writer, tailor the following summary for a ${analysis.role} position.
      JD Summary: ${analysis.summary}
      Original Summary: ${resume.basics.summary}
      Variant Type: ${variantType}
      
      STRICT RULE: Do NOT fabricate experience. If a skill is missing from the original, do NOT add it as a fact.
      Return ONLY the tailored summary text.
    `;
        tailored.basics.summary = await this.gemini.generateText(summaryPrompt);

        // 2. Tailor Highlights
        for (const job of tailored.work) {
            for (const bullet of job.highlights) {
                const bulletPrompt = `
          Tailor this CV bullet point for a ${analysis.role} role.
          Target Keywords: ${analysis.keywords.map(k => k.term).join(', ')}
          Original Bullet: ${bullet.original}
          Variant Focus: ${variantType}
          
          STRICT RULES:
          1. Do NOT invent numbers or achievements.
          2. Use professional terminology from the JD.
          3. If you suggest adding a skill or tool NOT in the original, mark it with [TO BE CONFIRMED].
          
          Return ONLY the tailored bullet text.
        `;
                bullet.tailored = await this.gemini.generateText(bulletPrompt);
            }
        }

        return tailored;
    }
}
