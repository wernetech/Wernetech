// utils/emailService.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendEmail({ to, subject, html }) {
    try {
        const info = await transporter.sendMail({
            from: `"WerneTech" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
        });

        console.log("✅ E-mail enviado:", info.messageId);
        console.log("📨 Resposta SMTP:", info.response);
        return info;
    } catch (err) {
        console.error("❌ Erro ao enviar e-mail:", err);
        throw err;
    }
}
