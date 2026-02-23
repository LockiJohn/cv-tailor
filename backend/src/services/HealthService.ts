import { GoogleGenerativeAI } from "@google/generative-ai";
import os from 'os';
import logger from '../utils/logger';

export class HealthService {
    private static genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

    static async checkSystem() {
        return {
            uptime: Math.floor(process.uptime()),
            timestamp: Date.now(),
            load: os.loadavg(),
            memory: {
                total: os.totalmem(),
                free: os.freemem(),
                usage: (1 - os.freemem() / os.totalmem()).toFixed(2)
            }
        };
    }

    static async checkGemini() {
        try {
            const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            // Minimal token test to verify connectivity
            await model.generateContent("ping");
            return { status: 'healthy', latency: 'unknown' }; // Latency measurement could be added
        } catch (error: any) {
            logger.error(`Health Check Failed: Gemini API unreachable. ${error.message}`);
            return { status: 'unhealthy', error: error.message };
        }
    }

    static async getFullReport() {
        const [system, gemini] = await Promise.all([
            this.checkSystem(),
            this.checkGemini()
        ]);

        return {
            status: gemini.status === 'healthy' ? 'OK' : 'PARTIAL_OUTAGE',
            dependencies: {
                gemini
            },
            system
        };
    }
}
