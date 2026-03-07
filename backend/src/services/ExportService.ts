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
        xmlContent = xmlContent.replace(/\[LABEL\]/g, resume.basics.label);
        xmlContent = xmlContent.replace(/\[EMAIL\]/g, resume.basics.email);
        xmlContent = xmlContent.replace(/\[PHONE\]/g, resume.basics.phone);
        xmlContent = xmlContent.replace(/\[SUMMARY\]/g, resume.basics.summary);

        // Format Skills
        const skillsText = resume.skills.map(s => `${s.category}: ${s.keywords.join(', ')}`).join(' | ');
        xmlContent = xmlContent.replace(/\[SKILLS\]/g, skillsText);

        // Format Languages
        const langsText = resume.languages.map(l => `${l.language} (${l.fluency})`).join(', ');
        xmlContent = xmlContent.replace(/\[LANGUAGES\]/g, langsText);

        // Replace work highlights
        let currentXml = xmlContent;
        resume.work.forEach((job, jobIdx) => {
            // Basic job info
            currentXml = currentXml.replace(new RegExp(`\\[WORK_${jobIdx}_COMPANY\\]`, 'g'), job.company);
            currentXml = currentXml.replace(new RegExp(`\\[WORK_${jobIdx}_POSITION\\]`, 'g'), job.position);
            currentXml = currentXml.replace(new RegExp(`\\[WORK_${jobIdx}_PERIOD\\]`, 'g'), `${job.startDate} - ${job.endDate}`);

            job.highlights.forEach((bullet, bulletIdx) => {
                const placeholder = `[WORK_${jobIdx}_BULLET_${bulletIdx}]`;
                currentXml = currentXml.replace(placeholder, bullet.tailored || bullet.original);
            });
        });

        zip.file("word/document.xml", currentXml);
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
