import express from 'express';
import authRouter from './routes/auth.js';
import dashboardRouter from './routes/dashboardRoute.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);

app.listen(PORT, () => console.log('Server up and Running'))