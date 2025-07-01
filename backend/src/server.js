import express from 'express';
import { db } from './config/db';

const app = express();
const PORT = process.env.PORT || 3000;

db()

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});