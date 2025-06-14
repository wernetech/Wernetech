import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../database/db.js';
import verifyAuth from '../middleware/verifyAuth.js';
import { randomBytes } from 'crypto';
import { sendEmail } from '../utils/emailService.js';

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
    const { email, password, cellphone, company, city, state } = req.body;

    if (!email || !password || !cellphone || !company || !city || !state) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const hash = await bcrypt.hash(password, 10);
        const token = randomBytes(32).toString('hex');

        await db.query(
            `INSERT INTO users (email, password, cellphone, company, city, state, verified, verification_token)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [email, hash, cellphone, company, city, state, false, token]
        );

        const confirmLink = `http://localhost/confirm-email?token=${token}`;

        await sendEmail({
            to: email,
            subject: 'Confirmação de e-mail - WerneTech',
            html: `
                <!DOCTYPE html>
                <html lang="pt-BR">
                    <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                        <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
                        <title>Confirme seu E-mail</title>
                        <style>
                        body {
                            margin: 0;
                            padding: 0;
                            font-family: Arial, sans-serif;
                            background-color: #f4f7f6;
                        }
                        table {
                            border-spacing: 0;
                        }
                        .wrapper {
                            width: 100%;
                            table-layout: fixed;
                            background-color: #f4f7f6;
                            padding: 40px 0;
                        }
                        .main {
                            background-color: #ffffff;
                            margin: 0 auto;
                            width: 100%;
                            max-width: 600px;
                            border-spacing: 0;
                            color: #333333;
                            border-radius: 12px;
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                            overflow: hidden;
                        }
                        .header {
                            background-color: #3B82F6;
                            color: #ffffff;
                            padding: 30px;
                            text-align: center;
                        }
                        .header img {
                            max-height: 50px;
                        }
                        .content {
                            padding: 30px 40px;
                        }
                        .content h2 {
                            font-size: 22px;
                            margin-top: 0;
                            margin-bottom: 20px;
                            color: #3B82F6;
                        }
                        .content p {
                            font-size: 16px;
                            line-height: 1.6;
                            color: #444444;
                        }
                        .button {
                            display: inline-block;
                            margin-top: 24px;
                            padding: 12px 24px;
                            background-color: #3B82F6;
                            color: #ffffff;
                            text-decoration: none;
                            border-radius: 6px;
                            font-weight: bold;
                        }
                        .footer {
                            background-color: #E5E7EB;
                            color: #777777;
                            padding: 20px;
                            text-align: center;
                            font-size: 12px;
                        }
                        </style>
                    </head>
                    <body>
                        <div class="wrapper">
                        <table class="main">
                            <tr class="header">
                            <td>
                                <img src="https://drive.google.com/uc?export=view&id=1lGGphQkjKi__3OotayUd55C_21IzlQhl" alt="Logo WerneTech" />
                            </td>
                            </tr>
                            <tr>
                            <td class="content">
                                <h2>Confirmação de E-mail</h2>
                                <p>Olá,</p>
                                <p>Obrigado por se registrar na <strong>WerneTech</strong>.</p>
                                <p>Para ativar sua conta, clique no botão abaixo:</p>
                                <p>
                                <a href="${confirmLink}" class="button">Ativar Conta</a>
                                </p>
                                <p>Se você não solicitou este registro, pode ignorar esta mensagem.</p>
                            </td>
                            </tr>
                            <tr>
                            <td class="footer">
                                © ${new Date().getFullYear()} WerneTech - Todos os direitos reservados.
                            </td>
                            </tr>
                        </table>
                        </div>
                    </body>
                </html>
                    `
        });

        res.status(201).json({ message: 'Usuário registrado. Verifique seu e-mail para ativar a conta.' });
    } catch (err) {
        console.error('Erro no registro:', err);
        res.status(500).json({ error: 'Erro ao registrar usuário.' });
    }
});

// Confirmar e-mail
router.get('/confirm-email', async (req, res) => {
    const { token } = req.query;

    if (!token) return res.status(400).json({ error: 'Token de verificação ausente.' });

    try {
        const result = await db.query(
            'UPDATE users SET verified = true, verification_token = NULL WHERE verification_token = $1 RETURNING id',
            [token]
        );

        if (result.rowCount === 0) {
            return res.status(400).json({ error: 'Token inválido ou expirado.' });
        }

        res.status(200).json({ message: 'Conta verificada com sucesso!' });
    } catch (err) {
        console.error('Erro na verificação de conta:', err);
        res.status(500).json({ error: 'Erro interno na verificação de conta.' });
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

        // ⚠️ Novo bloqueio
        if (!user.verified) {
            return res.status(403).json({ error: 'Confirme seu e-mail antes de fazer login.' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res
            .cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: '/',
            })
            .status(200)
            .json({
                message: 'Login bem-sucedido.',
                user: { id: user.id, email: user.email },
                admin: user.admin,
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
        path: '/',
    });

    res.status(200).json({ message: 'Logout realizado com sucesso.' });
});

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email obrigatório' });

    try {
        const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userResult.rows[0];

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado com este e-mail' });
        }

        const token = randomBytes(32).toString('hex');
        const expires = Date.now() + 1000 * 60 * 60;

        await db.query(
            'UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3',
            [token, new Date(expires), email]
        );

        const resetLink = `http://localhost/reset-password?token=${token}`;

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
