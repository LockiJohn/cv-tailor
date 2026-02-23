import express, { Request, Response } from 'express';
import multer from 'multer';
import { ParserService } from '../services/ParserService';
import { JDAnalyzerService } from '../services/JDAnalyzerService';
import { GapReportService } from '../services/GapReportService';
import { TailoringEngineService } from '../services/TailoringEngineService';
import { ExportService } from '../services/ExportService';
import { TranslationService } from '../services/TranslationService';
import { GeminiService } from '../services/GeminiService';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const parser = new ParserService();
const analyzer = new JDAnalyzerService();
const gapService = new GapReportService();
const tailoringEngine = new TailoringEngineService();
const exporter = new ExportService();
const translator = new TranslationService();
const gemini = new GeminiService();

// 1. Upload & Parse CV
router.post('/cv/upload', upload.single('cv'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Nessun file CV caricato" });
        }

        const isPDF = req.file.mimetype === 'application/pdf' || req.file.originalname.endsWith('.pdf');
        const isDOCX = req.file.mimetype.includes('word') || req.file.originalname.endsWith('.docx');

        let rawText: string;
        if (isPDF) {
            rawText = await parser.parsePDF(req.file.buffer);
        } else if (isDOCX) {
            rawText = await parser.parseDOCX(req.file.buffer);
        } else {
            return res.status(400).json({ error: "Formato non supportato. Usa PDF o DOCX." });
        }

        if (!rawText || rawText.trim().length < 10) {
            return res.status(422).json({ error: "Il PDF sembra vuoto o non leggibile. Prova con un PDF diverso." });
        }

        const resume = await parser.normalizeToSchema(rawText);
        res.json({ resume, message: "CV analizzato con successo" });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Errore durante l'analisi del CV. Riprova." });
    }
});

// 2. Full Analysis (JD + CV)
router.post('/tailor/analyze', async (req: Request, res: Response) => {
    try {
        const { resume, jdText } = req.body;
        const analysis = await analyzer.analyzeJD(jdText);
        const report = await gapService.generateReport(resume, analysis);
        res.json({ analysis, report });
    } catch (error) {
        res.status(500).json({ error: "Analysis failed" });
    }
});

// 3. Generate Variant
router.post('/tailor/generate', async (req: Request, res: Response) => {
    try {
        const { resume, analysis, variantType } = req.body;
        const tailoredResume = await tailoringEngine.generateVariant(resume, analysis, variantType);
        res.json({ tailoredResume });
    } catch (error) {
        res.status(500).json({ error: "Generation failed" });
    }
});

// 4. Export
router.post('/export/docx', async (req: Request, res: Response) => {
    try {
        const { resume } = req.body;
        // In a real scenario, template path would be dynamic or pre-loaded
        const buffer = await exporter.exportToDOCX(resume, 'src/templates/default.docx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ error: "Export failed" });
    }
});

// 5. Translation
router.post('/tailor/translate', async (req: Request, res: Response) => {
    try {
        const { resume, targetLanguage } = req.body;
        const translatedResume = await translator.translate(resume, targetLanguage);
        res.json({ translatedResume });
    } catch (error) {
        res.status(500).json({ error: "Translation failed" });
    }
});

// 6. Guru Chat Assistant
router.post('/tailor/chat', async (req: Request, res: Response) => {
    try {
        const { messages, context } = req.body;
        const response = await gemini.chatWithGuru(messages, context);
        res.json({ response });
    } catch (error) {
        console.error("Guru Chat error:", error);
        res.status(500).json({ error: "Guru is currently offline. Chill out and try again later." });
    }
});

export default router;
