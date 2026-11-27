import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';
import healthRoutes from './routes/health.routes.js';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors({ origin: env.frontendUrl }));

app.use('/api', healthRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
