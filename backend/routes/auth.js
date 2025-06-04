import express from 'express';
import bcrypt from 'bcrypt';
import { db } from '../database/db.js';

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: 'Email e senha obrigatórios.' });

    try {
        const hash = await bcrypt.hash(password, 10);

        await db.query(
            'INSERT INTO users (email, password) VALUES ($1, $2)',
            [email, hash]
        );

        res.status(201).json({ message: 'Usuário registrado com sucesso.' });
    } catch (err) {
        console.error('Erro no registro:', err);
        res.status(500).json({ error: 'Erro ao registrar usuário.' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Usuário não encontrado.' });
        }

        const user = result.rows[0];
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        res.status(200).json({ message: 'Login bem-sucedido.', user: { id: user.id, email: user.email } });
    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ error: 'Erro no login.' });
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');

        if (result.rows.length === 0) {
            return res.json({ error: 'Nenhum valor encontrado' });
        }

        console.log('Valores encontrados!');
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar users:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
});


export default router;
