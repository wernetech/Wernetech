// routes/email.js
import express from "express";
import { sendEmail } from "../utils/emailService.js";

const router = express.Router();

router.post("/send", async (req, res) => {
    const {
        name,
        email,
        phone,
        company,
        position,
        segment,
        message,
    } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes." });
    }

    try {
        await sendEmail({
            to: process.env.SMTP_USER,
            subject: "Novo lead recebido pelo site",
            html: `
        <h2>📨 Novo Contato via Consultoria</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone || "-"}</p>
        <p><strong>Empresa:</strong> ${company || "-"}</p>
        <p><strong>Cargo:</strong> ${position || "-"}</p>
        <p><strong>Segmento:</strong> ${segment || "-"}</p>
        <p><strong>Mensagem:</strong><br/>${message}</p>
      `,
        });

        res
            .status(200)
            .json({ success: true, message: "E-mail enviado com sucesso!" });
    } catch (err) {
        console.error("Erro ao enviar email:", err);
        res.status(500).json({ error: "Falha ao enviar o e-mail." });
    }
});

router.post("/send2", async (req, res) => {
    const { name, email, phone, company, role, licenses, solution } = req.body;

    if (!name || !email || !solution) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes." });
    }

    try {
        await sendEmail({
            to: process.env.SMTP_USER,
            subject: "Novo contato via página de solução",
            html: `
        <h2>📌 Novo Lead na Solução: ${solution}</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone || "-"}</p>
        <p><strong>Empresa:</strong> ${company || "-"}</p>
        <p><strong>Cargo:</strong> ${role || "-"}</p>
        <p><strong>Qtd. de Licenças:</strong> ${licenses || "-"}</p>
      `,
        });

        res.status(200).json({ success: true, message: "Lead enviado com sucesso!" });
    } catch (err) {
        console.error("Erro ao enviar email:", err);
        res.status(500).json({ error: "Falha ao enviar o e-mail." });
    }
});



export default router;
