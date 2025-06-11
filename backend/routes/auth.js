import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../database/db.js';
import verifyAuth from '../middleware/verifyAuth.js';

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
    const { email, password, cellphone, company, city, state } = req.body;

    if (!email || !password || !cellphone || !company || !city || !state) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const hash = await bcrypt.hash(password, 10);

        await db.query(
            `INSERT INTO users (email, password, cellphone, company, city, state)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [email, hash, cellphone, company, city, state]
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
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res
            .cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // ✅ false em dev
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: '/', // ✅ necessário para o clearCookie funcionar
            })
            .status(200)
            .json({
                message: 'Login bem-sucedido.',
                user: { id: user.id, email: user.email },
            });
    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ error: 'Erro no login.' });
    }
});

// Verificar sessão
router.get('/me', verifyAuth, (req, res) => {
    res.status(200).json({ user: req.user });
});

// Logout
router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/', // ✅ precisa bater com o login
    });

    res.status(200).json({ message: 'Logout realizado com sucesso.' });
});

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email obrigatório' });

    try {
        // Verifica se o e-mail existe
        const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userResult.rows[0];

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado com este e-mail' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expires = Date.now() + 1000 * 60 * 60; // 1h

        await db.query(
            'UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3',
            [token, new Date(expires), email]
        );

        const resetLink = `http://5.161.71.249:3002/reset-password?token=${token}`;

        await sendEmail({
            to: email,
            subject: 'Redefinição de senha - WerneTech',
            html: `<p>Para redefinir sua senha, clique no link abaixo:</p><p><a href="${resetLink}">${resetLink}</a></p>`
        });

        res.json({ message: 'Email de redefinição enviado com sucesso.' });
    } catch (err) {
        console.error('Erro ao enviar link de redefinição:', err);
        res.status(500).json({ error: 'Erro interno ao solicitar redefinição' });
    }
});

// 2. Rota para redefinir a senha
router.post('/reset-password', async (req, res) => {
    const { token, password } = req.body;

    if (!token || !password) return res.status(400).json({ error: 'Token e nova senha obrigatórios' });

    try {
        const result = await db.query(
            'SELECT * FROM users WHERE reset_token = $1 AND reset_token_expires > NOW()',
            [token]
        );

        const user = result.rows[0];
        if (!user) return res.status(400).json({ error: 'Token inválido ou expirado' });

        // criptografar a senha com bcrypt
        const bcrypt = await import('bcrypt');
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            'UPDATE users SET password = $1, reset_token = NULL, reset_token_expires = NULL WHERE id = $2',
            [hashedPassword, user.id]
        );

        res.json({ message: 'Senha redefinida com sucesso!' });
    } catch (err) {
        console.error('Erro ao redefinir senha:', err);
        res.status(500).json({ error: 'Erro interno ao redefinir a senha' });
    }
});

// Debug (listar todos os usuários)
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error('Erro ao buscar usuários:', err);
        res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
});

export default router;
