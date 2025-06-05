import db from "../database/db.js";

export async function authMiddleware(req, res, next) {
    try {
        const userCookie = req.cookies?.user;

        if (!userCookie) {
            return res.status(401).json({ error: "Usuário não autenticado." });
        }

        const userData = JSON.parse(userCookie);
        const result = await db.query("SELECT * FROM users WHERE id = $1", [userData.id]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Usuário inválido ou inexistente." });
        }

        req.user = result.rows[0];
        next();
    } catch (err) {
        console.error("Erro na autenticação:", err);
        return res.status(500).json({ error: "Erro interno na autenticação." });
    }
}
