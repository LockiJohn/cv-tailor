import { ResumeSchema } from '../types/resume';
import { JDAnalysis } from './JDAnalyzerService';

export class GapReportService {
  /**
   * Compares the parsed resume against JD analysis to find gaps.
   * Calculates a real match rate based on keyword coverage.
   */
  async generateReport(resume: ResumeSchema, jd: JDAnalysis) {
    const resumeText = JSON.stringify(resume).toLowerCase();

    const matched = jd.keywords.filter(k =>
      resumeText.includes(k.term.toLowerCase())
    );
    const missing = jd.keywords.filter(k =>
      !resumeText.includes(k.term.toLowerCase())
    );

    const matchRate = jd.keywords.length > 0
      ? Math.round((matched.length / jd.keywords.length) * 100) / 100
      : 0;

    // Prioritize must-have gaps
    const mustHaveMissing = missing.filter(k => k.importance === 'must-have');
    const niceHaveMissing = missing.filter(k => k.importance !== 'must-have');

    return {
      matchRate,
      matchedKeywords: matched.map(k => k.term),
      missingKeywords: missing,
      recommendations: [
        ...mustHaveMissing.map(m => ({
          keyword: m.term,
          priority: 'high' as const,
          suggestion: `⚠️ Fondamentale: aggiungi esperienza con "${m.term}".`,
          confidence: 0.9
        })),
        ...niceHaveMissing.map(m => ({
          keyword: m.term,
          priority: 'low' as const,
          suggestion: `💡 Bonus: menziona "${m.term}" se hai esperienza.`,
          confidence: 0.7
        }))
      ]
    };
  }
}
