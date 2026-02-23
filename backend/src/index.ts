import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import tailorRoutes from './routes/tailor';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// Note: Render uses the PORT env var automatically.

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Health Check for Deployment
app.get('/health', (req, res) => res.status(200).send('OK'));

// Main Routes
app.use('/api', tailorRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
