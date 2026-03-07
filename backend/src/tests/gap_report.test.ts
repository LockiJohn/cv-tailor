import { GapReportService } from '../services/GapReportService';
import { ResumeSchema } from '../types/resume';
import { JDAnalysis } from '../services/JDAnalyzerService';
import { GeminiService } from '../services/GeminiService';

jest.mock('../services/GeminiService', () => {
    return {
        GeminiService: jest.fn().mockImplementation(() => {
            return {
                generateJson: jest.fn()
            };
        })
    };
});

describe('GapReportService', () => {
    let service: GapReportService;
    let mockGemini: any;

    beforeEach(() => {
        jest.clearAllMocks();
        mockGemini = new GeminiService();
        service = new GapReportService(mockGemini);
    });

    const mockResume: ResumeSchema = {
        basics: { name: "Test User", label: "BA", email: "", phone: "", summary: "Managed SQL databases." },
        work: [],
        skills: [{ category: "Technical", keywords: ["SQL"] }],
        languages: []
    };

    const mockJD: JDAnalysis = {
        role: "Data Analyst",
        keywords: [
            { term: "SQL", category: "technical", importance: "must-have" },
            { term: "Python", category: "technical", importance: "must-have" }
        ],
        summary: "Needs SQL and Python."
    };

    test('Should calculate match rate based on AI feedback', async () => {
        const mockReport = {
            matchRate: 0.5,
            matchedKeywords: ["SQL"],
            missingKeywords: [{ term: "Python", category: "technical", importance: "must-have" }],
            recommendations: [{ keyword: "Python", priority: "high", suggestion: "Add Python", confidence: 0.9 }]
        };

        mockGemini.generateJson.mockResolvedValueOnce(mockReport);

        const result = await service.generateReport(mockResume, mockJD);

        expect(result.matchRate).toBe(0.5);
        expect(result.matchedKeywords).toContain("SQL");
        expect(result.missingKeywords[0].term).toBe("Python");
        expect(mockGemini.generateJson).toHaveBeenCalled();
    });

    test('Should return fallback on AI error', async () => {
        mockGemini.generateJson.mockRejectedValueOnce(new Error("AI Error"));

        const result = await service.generateReport(mockResume, mockJD);

        expect(result.matchRate).toBe(0);
        expect(result.matchedKeywords).toHaveLength(0);
    });
});
