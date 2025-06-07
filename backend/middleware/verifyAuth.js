// backend/middleware/verifyAuth.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default function verifyAuth(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token ausente.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Erro na verificação do token:', err.message);
        return res.status(403).json({ error: 'Token inválido ou expirado.' });
    }
}
