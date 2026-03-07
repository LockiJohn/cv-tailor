import PizZip from 'pizzip';
import { ResumeSchema } from '../types/resume';
import { GeminiService } from './GeminiService';

// Handle different export patterns of pdf-parse safely
const pdfParseModule = require('pdf-parse');
const pdfParse: any = (typeof pdfParseModule === 'function') ? pdfParseModule : (pdfParseModule.default || pdfParseModule);

export class ParserService {
    constructor(private gemini = new GeminiService()) { }

    async parsePDF(buffer: Buffer): Promise<string> {
        try {
            console.log("[ParserService] Starting PDF parsing, buffer size:", buffer.length);
            const data = await pdfParse(buffer);
            console.log("[ParserService] PDF parsed successfully, text length:", data.text?.length);

            if (!data.text || data.text.trim().length === 0) {
                console.warn("[ParserService] Extracted text is empty!");
            }

            return data.text || "";
        } catch (error) {
            console.error("[ParserService] Error in pdf-parse:", error);
            throw error;
        }
    }

    /**
     * Parses a DOCX file buffer and extracts text from document.xml.
     */
    async parseDOCX(buffer: Buffer): Promise<string> {
        const zip = new PizZip(buffer);
        const xmlContent = zip.file('word/document.xml')?.asText();

        if (!xmlContent) throw new Error('Invalid DOCX: main content not found');

        const textMatches = xmlContent.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
        if (!textMatches) return '';

        return textMatches
            .map(match => match.replace(/<[^>]+>/g, ''))
            .join(' ');
    }

    /**
     * Normalizes raw CV text into the structured ResumeSchema using Gemini.
     * This is the core AI-powered parsing step.
     */
    async normalizeToSchema(rawText: string): Promise<ResumeSchema> {
        const prompt = `
You are an expert CV parser. Extract structured information from the following CV text and return a JSON object.

CV TEXT:
${rawText}

Return ONLY a valid JSON object with this exact structure (no markdown, no extra text):
{
  "basics": {
    "name": "Full name",
    "label": "Current role",
    "email": "email",
    "phone": "phone",
    "summary": "Professional summary"
  },
  "work": [
    {
      "company": "Company",
      "position": "Job title",
      "location": "City, Country",
      "startDate": "YYYY or MM/YYYY",
      "endDate": "YYYY or 'Present'",
      "highlights": [
        { "original": "Key bullet point or achievement", "tailored": "", "tags": ["tag1", "tag2"], "status": "original" }
      ]
    }
  ],
  "skills": [
    { "category": "Technical|Tools|Management", "keywords": ["Skill 1", "Skill 2"] }
  ],
  "languages": [
    { "language": "English", "fluency": "Native|Fluent|Professional" }
  ]
}

- Extract up to 5 work experiences.
- Extract up to 5 bullet points per job.
- For skills, group them logically into 3-5 categories.
- Provide ONLY the JSON.
`;

        try {
            const result = await this.gemini.generateJson(prompt);

            // Normalize and fallback logic
            const normalized: ResumeSchema = {
                basics: {
                    name: result.basics?.name || "Candidate",
                    label: result.basics?.label || "Professional",
                    email: result.basics?.email || "",
                    phone: result.basics?.phone || "",
                    summary: result.basics?.summary || rawText.substring(0, 300)
                },
                work: (result.work || []).map((job: any, jobIdx: number) => ({
                    company: job.company || "Company",
                    position: job.position || "Role",
                    location: job.location || "",
                    startDate: job.startDate || "",
                    endDate: job.endDate || "Present",
                    highlights: (job.highlights || []).map((h: any, hIdx: number) => ({
                        id: `bullet-${jobIdx}-${hIdx}`,
                        original: typeof h === 'string' ? h : (h.original || ""),
                        tailored: h.tailored || "",
                        tags: h.tags || [],
                        status: 'original' as const
                    }))
                })),
                skills: (result.skills || []).map((s: any) => ({
                    category: s.category || "General",
                    keywords: Array.isArray(s.keywords) ? s.keywords : []
                })),
                languages: (result.languages || []).map((l: any) => ({
                    language: l.language || "Unknown",
                    fluency: l.fluency || ""
                }))
            };

            return normalized;
        } catch (error) {
            console.error('[ParserService] Gemini normalization failed:', error);
            // Minimal fallback
            return {
                basics: { name: "Candidate", label: "", email: "", phone: "", summary: rawText.substring(0, 300) },
                work: [],
                skills: [],
                languages: []
            };
        }
    }
}
