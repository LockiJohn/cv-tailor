import express, { Request, Response } from 'express';
import { ParserService } from '../services/ParserService';
import { JDAnalyzerService } from '../services/JDAnalyzerService';
import { GapReportService } from '../services/GapReportService';
import { TailoringEngineService } from '../services/TailoringEngineService';
import { ExportService } from '../services/ExportService';
import { TranslationService } from '../services/TranslationService';

const router = express.Router();
const parser = new ParserService();
const analyzer = new JDAnalyzerService();
const gapService = new GapReportService();
const tailoringEngine = new TailoringEngineService();
const exporter = new ExportService();
const translator = new TranslationService();

// 1. Upload & Parse CV
router.post('/cv/upload', async (req: Request, res: Response) => {
    // In a real app, use multer to get the file buffer
    const mockBuffer = Buffer.from("Parsed CV content...");
    const rawText = await parser.parsePDF(mockBuffer);
    const resume = await parser.normalizeToSchema(rawText);
    res.json({ resume, message: "CV Parsed successfully" });
});

// 2. Full Analysis (JD + CV)
router.post('/tailor/analyze', async (req: Request, res: Response) => {
    const { resume, jdText } = req.body;
    const analysis = await analyzer.analyzeJD(jdText);
    const report = await gapService.generateReport(resume, analysis);
    res.json({ analysis, report });
});

// 3. Generate Variant
router.post('/tailor/generate', async (req: Request, res: Response) => {
    const { resume, analysis, variantType } = req.body;
    const tailoredResume = await tailoringEngine.generateVariant(resume, analysis, variantType);
    res.json({ tailoredResume });
});

// 4. Export
router.post('/export/docx', async (req: Request, res: Response) => {
    const { resume } = req.body;
    const buffer = await exporter.exportToDOCX(resume, 'path/to/template.docx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.send(buffer);
});

// 5. Translation
router.post('/tailor/translate', async (req: Request, res: Response) => {
    const { resume, targetLang } = req.body;
    const translatedResume = await translator.translate(resume, targetLang);
    res.json({ translatedResume });
});

export default router;
