import { TailoringEngineService } from '../services/TailoringEngineService';
import { ResumeSchema } from '../types/resume';
import { JDAnalysis } from '../services/JDAnalyzerService';
import { GeminiService } from '../services/GeminiService';

// Manual mock to avoid constructor side effects (API key check)
jest.mock('../services/GeminiService', () => {
    return {
        GeminiService: jest.fn().mockImplementation(() => {
            return {
                generateText: jest.fn(),
                generateJson: jest.fn(),
                chatWithGuru: jest.fn()
            };
        })
    };
});

describe('TailoringEngine - Anti-Hallucination Tests', () => {
    let engine: TailoringEngineService;
    let mockGemini: any;

    beforeEach(() => {
        // Clear all mocks
        jest.clearAllMocks();
        mockGemini = new GeminiService();
        engine = new TailoringEngineService(mockGemini);
    });

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
        mockGemini.generateText.mockResolvedValueOnce("Experienced technical analyst [TO BE CONFIRMED].");
        mockGemini.generateText.mockResolvedValueOnce("Worked with ERP systems. Familiar with common industry standards [TO BE CONFIRMED].");

        const result = await engine.generateVariant(mockResume, mockJD, 'technical');
        const tailoredBullet = result.work[0].highlights[0].tailored;

        expect(tailoredBullet).toContain('[TO BE CONFIRMED]');
        expect(tailoredBullet).not.toMatch(/Expert in SAP/i);
    });

    test('Data Integrity: Output segments must match input count', async () => {
        mockGemini.generateText.mockResolvedValue("Some tailored text");

        const result = await engine.generateVariant(mockResume, mockJD, 'technical');
        expect(result.work[0].highlights.length).toBe(mockResume.work[0].highlights.length);
    });
});
