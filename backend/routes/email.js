// routes/email.js
import express from "express";
import { sendEmail } from "../utils/emailService.js";

const router = express.Router();

router.post("/send", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes." });
    }

    try {
        await sendEmail({
            to: process.env.SMTP_USER,
            subject: "Novo lead recebido",
            html: `
        <h2>Novo contato no site</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Mensagem:</strong><br/>${message}</p>
      `,
        });

        res.status(200).json({ success: true, message: "E-mail enviado com sucesso!" });
    } catch (err) {
        console.error("Erro ao enviar email:", err);
        res.status(500).json({ error: "Falha ao enviar o e-mail." });
    }
});

export default router;
