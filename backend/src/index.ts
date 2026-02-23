import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import tailorRoutes from './routes/tailor';
import { errorHandler } from './middleware/errorHandler';
import logger from './utils/logger';
import { HealthService } from './services/HealthService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security: Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Troppe richieste da questo IP, riprova tra 15 minuti.'
});

app.use(limiter);
app.use(helmet());
app.use(cors({
    origin: (origin, callback) => {
        const allowed = ['http://localhost:3000', 'http://localhost:3001', process.env.CORS_ORIGIN].filter(Boolean);
        if (!origin || allowed.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS blocked for origin: ${origin}`));
        }
    },
    credentials: true
}));

// Monitoring: Structured HTTP Logging
app.use(morgan('combined', {
    stream: { write: (message) => logger.info(message.trim()) }
}));

app.use(express.json());

// Health Check for Deployment (Enhanced for V2)
app.get('/health', async (req, res) => {
    const report = await HealthService.getFullReport();
    res.status(report.status === 'OK' ? 200 : 503).json(report);
});

// Main Routes
app.use('/api', tailorRoutes);

// Global Error Handling (Must be last)
app.use(errorHandler);

const server = app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

// Graceful Shutdown
const shutdown = () => {
    logger.info('Shutting down gracefully...');
    server.close(() => {
        logger.info('Server closed.');
        process.exit(0);
    });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
