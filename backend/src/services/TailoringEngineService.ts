
import { ResumeSchema } from '../types/resume';
import { JDAnalysis } from './JDAnalyzerService';
import { GeminiService } from './GeminiService';

export class TailoringEngineService {
    private gemini = new GeminiService();

    async generateVariant(resume: ResumeSchema, analysis: JDAnalysis, variantType: string): Promise<ResumeSchema> {
        const tailored = JSON.parse(JSON.stringify(resume));

        // 1. Queue all tailoring tasks for parallel execution
        const tailoringTasks: Promise<any>[] = [];

        // Tailor Summary Task
        const summaryPrompt = `
      As a professional CV writer, tailor the following summary for a ${analysis.role} position.
      JD Summary: ${analysis.summary}
      Original Summary: ${resume.basics.summary}
      Variant Type: ${variantType}
      
      STRICT RULE: Do NOT fabricate experience. If a skill is missing from the original, do NOT add it as a fact.
      Return ONLY the tailored summary text.
    `;
        tailoringTasks.push(this.gemini.generateText(summaryPrompt).then(res => {
            tailored.basics.summary = res;
        }));

        // Tailor Highlights Tasks
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
                tailoringTasks.push(this.gemini.generateText(bulletPrompt).then(res => {
                    bullet.tailored = res;
                    bullet.status = 'suggested';
                }));
            }
        }

        // 2. Execute all tasks in parallel (much faster!)
        await Promise.all(tailoringTasks);

        return tailored;
    }
}
