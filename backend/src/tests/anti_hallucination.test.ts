
import { TailoringEngineService } from '../services/TailoringEngineService';
import { ResumeSchema } from '../types/resume';
import { JDAnalysis } from '../services/JDAnalyzerService';

describe('TailoringEngine - Anti-Hallucination Tests', () => {
    const engine = new TailoringEngineService();

    const mockResume: ResumeSchema = {
        basics: { name: "Test User", label: "BA", email: "", phone: "", summary: "Used ERP for 5 years." },
        work: [{
            company: "Test Co",
            position: "Analyst",
            location: "", startDate: "", endDate: "",
            highlights: [{ id: "1", original: "Worked with ERP systems.", tags: [], status: 'original' }]
        }],
        skills: [],
        languages: []
    };

    const mockJD: JDAnalysis = {
        role: "Senior BA",
        keywords: [{ term: "SAP", category: "tool", importance: "must-have" }],
        summary: "Needs SAP experience."
    };

    test('Should NOT add SAP keyword as fact if not in original CV', async () => {
        const result = await engine.generateVariant(mockResume, mockJD, 'technical');
        const tailoredBullet = result.work[0].highlights[0].tailored;

        // Hallucination Check: It should not say "Experienced in SAP" if it wasn't there.
        // It SHOULD say [TO BE CONFIRMED] or similar if it tries to bridge the gap.
        expect(tailoredBullet).toContain('[TO BE CONFIRMED]');
        expect(tailoredBullet).not.toMatch(/Expert in SAP/i);
    });

    test('Data Integrity: Output segments must match input count', async () => {
        const result = await engine.generateVariant(mockResume, mockJD, 'technical');
        expect(result.work[0].highlights.length).toBe(mockResume.work[0].highlights.length);
    });
});
