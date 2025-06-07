import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import leadsRoutes from './routes/leads.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import { createLeadsTable } from './database/createLeadsTable.js';
import { createUsersTable } from './database/createUsersTable.js';
import { createPostsTable } from './database/createPostsTable.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

createLeadsTable();
createUsersTable();
createPostsTable();

app.use(cors({
  origin: 'http://localhost:3001', // substitua por "*" se quiser, MAS sem credentials
  credentials: true, // permite cookies e headers de autenticação
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/leads', leadsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

app.get("/teste", (req, res) => { res.json("Funcionando") })

app.listen(process.env.PORT, () => {
    console.log(`API rodando em http://localhost:${process.env.PORT}`);
});