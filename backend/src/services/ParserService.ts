import PizZip from 'pizzip';
import * as pdfjs from 'pdfjs-dist';
import { ResumeSchema } from '../types/resume';

export class ParserService {
    /**
     * Parses a PDF file and extracts text with spatial information.
     * This is a simplified version; real implementation would use coordinates
     * to identify section headers.
     */
    async parsePDF(buffer: Buffer): Promise<string> {
        const data = new Uint8Array(buffer);
        const loadingTask = pdfjs.getDocument({ data });
        const pdf = await loadingTask.promise;
        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
                .map((item: any) => item.str)
                .join(' ');
            fullText += pageText + '\n';
        }

        return fullText;
    }

    /**
     * Parses a DOCX file and extracts raw text from document.xml.
     */
    async parseDOCX(buffer: Buffer): Promise<string> {
        const zip = new PizZip(buffer);
        const xmlContent = zip.file('word/document.xml')?.asText();

        if (!xmlContent) throw new Error('Invalid DOCX: main content not found');

        // Simple regex to extract text from <w:t> tags
        const textMatches = xmlContent.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
        if (!textMatches) return '';

        return textMatches
            .map(match => match.replace(/<[^>]+>/g, ''))
            .join(' ');
    }

    /**
     * Normalizes raw text into the structured ResumeSchema.
     * In a real app, this would involve an AI call (Gemini/GPT).
     */
    async normalizeToSchema(rawText: string): Promise<ResumeSchema> {
        // Mock implementation: actual logic would use LLM with the prompts defined earlier.
        return {
            basics: {
                name: "Parsed Name",
                label: "Tech Business Analyst",
                email: "parsed@example.com",
                phone: "123456789",
                summary: rawText.substring(0, 200) + "..."
            },
            work: [],
            skills: [],
            languages: []
        };
    }
}
