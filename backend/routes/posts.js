import express from 'express';
import { db } from '../database/db.js';
import { z } from 'zod';
import verifyAuth from '../middleware/verifyAuth.js'

const router = express.Router();

// Validação com Zod
const postSchema = z.object({
    title: z.string().min(1),
    slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido"),
    summary: z.string().min(1),
    content: z.string().min(1),
    author: z.string().min(1),
    category: z.string().min(1),
    reading_time: z.number().int().min(1),
    thumbnail: z.string().url(),
});


// Rota para criação de lead
router.post('/', verifyAuth, async (req, res) => {
    const result = postSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ error: result.error.format() });
    }

    const { title, slug, summary, content, author, category, reading_time, thumbnail } = result.data;

    try {
        await db.query(
            `INSERT INTO posts (title, slug, summary, content, author, category, reading_time, thumbnail)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [title, slug, summary, content, author, category, reading_time, thumbnail]
        );

        res.status(201).json({ message: 'Lead salvo com sucesso!' });
    } catch (error) {
        console.error('Erro ao salvar lead:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota para listar todos os leads
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    const { category, author } = req.query;
    const filters = [];
    const values = [];

    let baseQuery = `SELECT * FROM posts`;
    let whereClause = '';

    if (category) {
        values.push(category);
        filters.push(`category = $${values.length}`);
    }

    if (author) {
        values.push(author);
        filters.push(`author = $${values.length}`);
    }

    if (filters.length > 0) {
        whereClause = ` WHERE ${filters.join(' AND ')}`;
    }

    const finalQuery = `${baseQuery}${whereClause} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    try {
        const result = await db.query(finalQuery, values);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar posts paginados:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


router.get('/:slug', async (req, res) => {
    const { slug } = req.params;

    if (!slug) {
        return res.status(400).json({ error: 'Slug não fornecido' });
    }

    try {
        const result = await db.query('SELECT * FROM posts WHERE slug = $1 LIMIT 1', [slug]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Post não encontrado' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar post:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

export default router;

