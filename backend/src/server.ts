import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';
import express from 'express';
import { connectDB } from './config/db';
import { ENV } from './config/env';
import { router } from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

const PORT = process.env.PORT || 3000;

connectDB()

app.use('/api', router)

if (ENV.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

export default app;
