import { ResumeSchema } from '../types/resume';
import { JDAnalysis } from './JDAnalyzerService';
import { GeminiService } from './GeminiService';

export class GapReportService {
  constructor(private gemini = new GeminiService()) { }

  /**
   * Compares the parsed resume against JD analysis to find gaps intelligently.
   * Calculates a real match rate based on conceptual keyword coverage.
   */
  async generateReport(resume: ResumeSchema, jd: JDAnalysis) {
    const prompt = `
      You are an expert technical recruiter and resume reviewer.
      I will provide you with a Job Description Analysis (including required keywords and role summary) and a candidate's Resume (in JSON format).
      Your task is to analyze the resume against the job description requirements and identify gaps intelligently. Do not just blindly match keywords; understand the context and synonyms (e.g., if JD asks for 'ReactJS' and resume has 'React', count it as matched).
      
      Output JSON format:
      {
        "matchRate": 0.85, /* number between 0 and 1 representing the match rate */
        "matchedKeywords": ["keyword1", "keyword2"], /* Array of strings of MATCHED keywords from the JD */
        "missingKeywords": [
          { "term": "missingKeyword1", "category": "technical", "importance": "must-have" }
        ], /* Array of objects for MISSING keywords from the JD */
        "recommendations": [
          {
            "keyword": "missingKeyword1",
            "priority": "high", /* 'high' for must-have, 'low' for nice-to-have */
            "suggestion": "Breve consiglio (in italiano) molto accattivante e incoraggiante su come aggiungere questa competenza (e.g., ⚠️ Fondamentale: aggiungi esperienza con missingKeyword1)",
            "confidence": 0.9 /* between 0 and 1 */
          }
        ]
      }
      
      Job Description Analysis:
      ${JSON.stringify(jd, null, 2)}
      
      Candidate Resume:
      ${JSON.stringify(resume, null, 2)}
      
      Provide ONLY the JSON output.
    `;

    try {
      const report = await this.gemini.generateJson(prompt);
      return report;
    } catch (error) {
      console.error("Gemini Gap Report failed, returning empty fallback", error);
      return {
        matchRate: 0,
        matchedKeywords: [],
        missingKeywords: [],
        recommendations: []
      };
    }
  }
}
