import express from 'express';
import { db } from '../database/db.js';
import { z } from 'zod';

const router = express.Router();

// Validação com Zod
const leadSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(8),
    company: z.string().optional(),
    position: z.string().optional(),
    segment: z.string().optional(),
    message: z.string().min(1),
});

// Rota para criação de lead
router.post('/', async (req, res) => {
    const result = leadSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ error: result.error.format() });
    }

    const { name, email, phone, company, position, segment, message } = result.data;

    try {
        await db.query(
            `INSERT INTO leads (name, email, phone, company, position, segment, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [name, email, phone, company, position, segment, message]
        );

        res.status(201).json({ message: 'Lead salvo com sucesso!' });
    } catch (error) {
        console.error('Erro ao salvar lead:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota para listar todos os leads
router.get('/', async (req, res) => {
    try {
        const result = await db.query(`SELECT * FROM leads`);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar leads:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

export default router;
