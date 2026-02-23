import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export interface AppError extends Error {
    statusCode?: number;
    code?: string;
}

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // Log error with context
    logger.error(`${statusCode} - ${message}`, {
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
        stack: err.stack,
        code: err.code
    });

    res.status(statusCode).json({
        status: 'error',
        code: err.code || 'INTERNAL_ERROR',
        message: process.env.NODE_ENV === 'production' ? 'Qualcosa è andato storto. Riprova più tardi.' : message
    });
};
