import PizZip from 'pizzip';
import { ResumeSchema } from '../types/resume';
import { GeminiService } from './GeminiService';

// Handle different export patterns of pdf-parse safely
const pdfParseModule = require('pdf-parse');
const pdfParse: any = (typeof pdfParseModule === 'function') ? pdfParseModule : (pdfParseModule.default || pdfParseModule);

const gemini = new GeminiService();

export class ParserService {
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
    "name": "Full name from CV",
    "label": "Current job title/role",
    "email": "email if present else empty string",
    "phone": "phone if present else empty string",
    "summary": "Professional summary or first 2-3 sentences of the CV"
  },
  "work": [
    {
      "company": "Company name",
      "position": "Job title",
      "startDate": "Start date or empty string",
      "endDate": "End date or 'Present'",
      "highlights": [
        { "original": "Key bullet point or achievement", "tailored": "" }
      ]
    }
  ],
  "skills": ["skill1", "skill2"],
  "languages": ["Italian", "English"]
}

Extract up to 5 work experiences and up to 5 bullet points per job. If a section is missing, use an empty array.
`;

        try {
            const result = await gemini.generateJson(prompt);
            // Ensure required structure exists
            if (!result.basics) result.basics = { name: "Unknown", label: "", email: "", phone: "", summary: rawText.substring(0, 200) };
            if (!result.work) result.work = [];
            if (!result.skills) result.skills = [];
            if (!result.languages) result.languages = [];

            // Normalize work experience to match strict ResumeSchema type
            result.work = result.work.map((job: any, jobIdx: number) => ({
                company: job.company || "Azienda",
                position: job.position || "Ruolo",
                location: job.location || "",
                startDate: job.startDate || "",
                endDate: job.endDate || "Present",
                highlights: (job.highlights || []).map((h: any, hIdx: number) => ({
                    id: `bullet-${jobIdx}-${hIdx}`,
                    original: typeof h === 'string' ? h : (h.original || h),
                    tailored: h.tailored || "",
                    tags: h.tags || [],
                    status: 'original' as const
                }))
            }));

            return result as ResumeSchema;
        } catch (error) {
            console.error('[ParserService] Gemini normalization failed, falling back to raw text:', error);
            // Graceful fallback: return minimal schema with raw text as summary
            return {
                basics: {
                    name: this.extractName(rawText),
                    label: "Professional",
                    email: this.extractEmail(rawText),
                    phone: "",
                    summary: rawText.substring(0, 300)
                },
                work: [{
                    company: "Esperienza (parsed dal CV)",
                    position: "Professional",
                    location: "",
                    startDate: "",
                    endDate: "Present",
                    highlights: [
                        {
                            id: `bullet-fallback-0`,
                            original: rawText.substring(0, 200),
                            tailored: "",
                            tags: [],
                            status: 'original' as const
                        }
                    ]
                }],
                skills: [],
                languages: []
            };
        }
    }

    private extractName(text: string): string {
        const firstLine = text.trim().split('\n')[0];
        return firstLine.length < 60 ? firstLine.trim() : 'Candidate';
    }

    private extractEmail(text: string): string {
        const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        return match ? match[0] : '';
    }
}
