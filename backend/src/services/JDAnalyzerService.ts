
import { GeminiService } from './GeminiService';

export interface JDAnalysis {
    role: string;
    keywords: { term: string; category: string; importance: string }[];
    summary: string;
}

export class JDAnalyzerService {
    private gemini = new GeminiService();

    async analyzeJD(jdText: string): Promise<JDAnalysis> {
        const prompt = `
      Analyze the following Job Description and extract:
      1. The job role/title.
      2. Key technical skills, tools, and methodologies (keywords).
      3. A brief 2-sentence summary of the core requirements.

      Format the output as JSON:
      {
        "role": "string",
        "keywords": [{ "term": "string", "category": "technical|tool|process", "importance": "must-have|nice-to-have" }],
        "summary": "string"
      }

      Job Description:
      ${jdText}
    `;

        return await this.gemini.generateJson(prompt);
    }
}
