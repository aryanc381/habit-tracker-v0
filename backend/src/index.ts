import express from 'express';
import { env } from './env.js';
import rootRouter from './routes/router.js';
import { connectDb } from './db/mongo.js';
import cors from 'cors';

const app = express();
await connectDb();

app.use(express.json());
app.use(cors());
app.use('/v0/api', rootRouter);

app.get('/health', (req, res) => { return res.json({ status: 200, msg: 'Backend is live and healthy.'}) })

app.listen(Number(env.DEV_ENV), () => { console.log(`Backend is running at PORT ${env.DEV_ENV}.`) });