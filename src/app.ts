import express from 'express';
import cors from 'cors';
import { router as routes } from './routes'
import { authMiddleware, loggerMiddleware } from '@utils/dependency.utils';

export const app = express();

app.use(express.json());

app.use(cors());

app.use(loggerMiddleware.use);

app.use(authMiddleware.use);

app.use(routes)
