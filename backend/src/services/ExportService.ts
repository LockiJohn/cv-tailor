import PizZip from 'pizzip';
import fs from 'fs';
import { ResumeSchema } from '../types/resume';

export class ExportService {
    /**
     * Generates a DOCX file from a tailored ResumeSchema.
     * In a real implementation, this would use docxtemplater or direct XML patching.
     */
    async exportToDOCX(resume: ResumeSchema, templatePath: string): Promise<Buffer> {
        // Strategy: XML Direct Patching (Near-original)
        const templateContent = fs.readFileSync(templatePath);
        const zip = new PizZip(templateContent);

        let xmlContent = zip.file("word/document.xml")?.asText();
        if (!xmlContent) throw new Error("Template document.xml not found");

        // Replace basic info
        xmlContent = xmlContent.replace(/\[NAME\]/g, resume.basics.name);
        xmlContent = xmlContent.replace(/\[SUMMARY\]/g, resume.basics.summary);

        // Replace work highlights (simplified for POC)
        resume.work.forEach((job, jobIdx) => {
            job.highlights.forEach((bullet, bulletIdx) => {
                const placeholder = `[WORK_${jobIdx}_BULLET_${bulletIdx}]`;
                xmlContent = xmlContent.replace(placeholder, bullet.tailored || bullet.original);
            });
        });

        zip.file("word/document.xml", xmlContent);
        return zip.generate({ type: "nodebuffer" });
    }

    /**
     * Placeholder for PDF export via Puppeteer/headless printing.
     */
    async exportToPDF(resume: ResumeSchema): Promise<Buffer> {
        // Implementation would render HTML to PDF
        return Buffer.from("PDF Binary Content");
    }
}
