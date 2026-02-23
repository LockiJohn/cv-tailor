import { ResumeSchema } from '../types/resume';
import { JDAnalysis } from './JDAnalyzerService';

export class GapReportService {
  /**
   * Compares the parsed resume against the JD analysis to find missing skills
   * and suggest where to insert them.
   */
  async generateReport(resume: ResumeSchema, jd: JDAnalysis) {
    const missing = jd.keywords.filter(k => 
      !JSON.stringify(resume).toLowerCase().includes(k.term.toLowerCase())
    );

    return {
      matchRate: 0.6,
      missingKeywords: missing,
      recommendations: missing.map(m => ({
        keyword: m.term,
        suggestion: `Aggiungi esperienza con ${m.term} nella sezione Skills o Esperienza.`,
        confidence: 0.85
      }))
    };
  }
}
