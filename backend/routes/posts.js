import express from 'express';
import { db } from '../database/db.js';
import { z } from 'zod';
import verifyAuth from '../middleware/verifyAuth.js';

const router = express.Router();

// Validação com Zod
const postSchema = z.object({
    title: z.string().min(1),
    slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido"),
    summary: z.string().min(1),
    content: z.string().min(1),
    html_content: z.string().min(1),
    author: z.string().min(1),
    category: z.string().min(1),
    reading_time: z.number().int().min(1),
    thumbnail: z.string().url(),
});

const commentSchema = z.object({
    post_id: z.number().int(),
    author: z.string().min(1),
    content: z.string().min(1),
});

const updatePostSchema = z.object({
    title: z.string().min(1),
    slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido"),
    summary: z.string().min(1),
    content: z.string().min(1),
    author: z.string().min(1),
    category: z.string().min(1),
    reading_time: z.number().int().min(1),
    thumbnail: z.string().url(),
});

// Criar novo post
router.post('/', verifyAuth, async (req, res) => {
    const result = postSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ error: result.error.format() });
    }

    const {
        title, slug, summary, content, html_content,
        author, category, reading_time, thumbnail,
    } = result.data;

    try {
        await db.query(
            `INSERT INTO posts (title, slug, summary, content, html_content, author, category, reading_time, thumbnail)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [title, slug, summary, content, html_content, author, category, reading_time, thumbnail]
        );

        res.status(201).json({ message: 'Post criado com sucesso!' });
    } catch (error) {
        console.error('Erro ao salvar post:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Listar posts com paginação e filtros
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
        console.error('Erro ao buscar posts:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Buscar post por slug
router.get('/:slug', async (req, res) => {
    const { slug } = req.params;

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

// Criar comentário
router.post('/:slug/comments', async (req, res) => {
    const { slug } = req.params;
    const result = commentSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ error: result.error.format() });
    }

    const { author, content } = result.data;

    try {
        const post = await db.query('SELECT id FROM posts WHERE slug = $1 LIMIT 1', [slug]);
        if (post.rows.length === 0) return res.status(404).json({ error: 'Post não encontrado' });

        const postId = post.rows[0].id;

        await db.query(
            `INSERT INTO comments (post_id, author, content) VALUES ($1, $2, $3)`,
            [postId, author, content]
        );

        await db.query(
            `UPDATE posts SET comments = comments + 1 WHERE id = $1`,
            [postId]
        );

        res.status(201).json({ message: 'Comentário adicionado!' });
    } catch (error) {
        console.error('Erro ao comentar:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Listar comentários de um post
router.get('/:slug/comments', async (req, res) => {
    const { slug } = req.params;
    try {
        const post = await db.query('SELECT id FROM posts WHERE slug = $1 LIMIT 1', [slug]);
        if (post.rows.length === 0) return res.status(404).json({ error: 'Post não encontrado' });

        const postId = post.rows[0].id;
        const comments = await db.query('SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC', [postId]);

        res.status(200).json(comments.rows);
    } catch (error) {
        console.error('Erro ao buscar comentários:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Dentro de /routes/post.js (ou .ts se estiver usando TypeScript)

router.delete('/:slug', verifyAuth, async (req, res) => {
    const { slug } = req.params;

    if (!slug) {
        return res.status(400).json({ error: 'Slug não fornecido' });
    }

    try {
        const result = await db.query('DELETE FROM posts WHERE slug = $1 RETURNING *', [slug]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Post não encontrado para exclusão' });
        }

        res.status(200).json({ message: 'Post excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir post:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.put('/:slug', verifyAuth, async (req, res) => {
    const { slug } = req.params;
    const result = updatePostSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ error: result.error.format() });
    }

    const { title, summary, content, author, category, reading_time, thumbnail } = result.data;

    try {
        const update = await db.query(
            `UPDATE posts
       SET title = $1, summary = $2, content = $3, author = $4,
           category = $5, reading_time = $6, thumbnail = $7
       WHERE slug = $8
       RETURNING *`,
            [title, summary, content, author, category, reading_time, thumbnail, slug]
        );

        if (update.rowCount === 0) {
            return res.status(404).json({ error: 'Post não encontrado para atualizar' });
        }

        res.status(200).json({ message: 'Post atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar post:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.put('/like/:slug', async (req, res) => {
    const { slug } = req.params;
    try {
        await db.query('UPDATE posts SET likes = likes + 1 WHERE slug = $1', [slug]);
        res.status(200).json({ message: 'Like adicionado com sucesso' });
    } catch (err) {
        console.error('Erro ao adicionar like:', err);
        res.status(500).json({ error: 'Erro interno' });
    }
});

// tabela: comentarios(id, post_id, nome, texto, created_at)
router.post('/:slug/comentario', async (req, res) => {
    const { slug } = req.params;
    const { nome, texto } = req.body;

    try {
        const post = await db.query('SELECT id FROM posts WHERE slug = $1 LIMIT 1', [slug]);
        if (post.rows.length === 0) return res.status(404).json({ error: 'Post não encontrado' });

        await db.query('INSERT INTO comentarios (post_id, nome, texto) VALUES ($1, $2, $3)', [post.rows[0].id, nome, texto]);

        res.status(201).json({ message: 'Comentário adicionado' });
    } catch (err) {
        console.error('Erro ao comentar:', err);
        res.status(500).json({ error: 'Erro interno' });
    }
});

router.get('/:slug/comentarios', async (req, res) => {
    const { slug } = req.params;

    try {
        const post = await db.query('SELECT id FROM posts WHERE slug = $1 LIMIT 1', [slug]);
        if (post.rows.length === 0) return res.status(404).json({ error: 'Post não encontrado' });

        const comentarios = await db.query('SELECT nome, texto, created_at FROM comentarios WHERE post_id = $1 ORDER BY created_at DESC', [post.rows[0].id]);

        res.status(200).json(comentarios.rows);
    } catch (err) {
        console.error('Erro ao buscar comentarios:', err);
        res.status(500).json({ error: 'Erro interno' });
    }
});



export default router;
