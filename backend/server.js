import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import leadsRoutes from './routes/leads.js';
import authRoutes from './routes/auth.js';
import { createLeadsTable } from './database/createLeadsTable.js';
import { createUsersTable } from './database/createUsersTable.js';

dotenv.config();

const app = express();

createLeadsTable();
createUsersTable()

app.use(cors());
app.use(express.json());

app.use('/api/leads', leadsRoutes);
app.use('/api/auth', authRoutes);

app.get("/teste", (req, res) => { res.json("Funcionando") })

app.listen(process.env.PORT, () => {
    console.log(`API rodando em http://localhost:${process.env.PORT}`);
});
