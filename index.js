import express from 'express';
import authRouter from './routes/authRoutes.js';
import configRouter from './routes/configRoutes.js';
import dashboardRouter from './routes/dashboardRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/auth', authRouter);
app.use('/config', configRouter);
app.use('/dashboard', dashboardRouter);

app.listen(PORT, () => console.log('Server up and Running'))