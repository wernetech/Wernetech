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
                <!DOCTYPE html>
                <html lang="pt-BR">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Novo Lead Recebido</title>
                <style>
                    body {
                    margin: 0;
                    padding: 0;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                    font-family: Arial, sans-serif;
                    background-color: #f4f7f6;
                    }
                    table { border-spacing: 0; }
                    td { padding: 0; }
                    img { border: 0; }
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
                    font-family: Arial, sans-serif;
                    color: #333333;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                    overflow: hidden;
                    }
                    .header {
                    background-color: #3B82F6;
                    color: #ffffff;
                    padding: 30px;
                    text-align: center;
                    }
                    .header h1 {
                    margin: 0;
                    font-size: 28px;
                    font-weight: bold;
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
                    .lead-info {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                    }
                    .lead-info td {
                    padding: 12px 0;
                    border-bottom: 1px solid #eeeeee;
                    }
                    .lead-info strong {
                    color: #555555;
                    width: 120px;
                    display: inline-block;
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
                            <td style="text-align: center;">
                            <img src="https://drive.google.com/uc?id=1lGGphQkjKi__3OotayUd55C_21IzlQhl" alt="Wernetech Logo" style="max-width: 200px; height: auto;" />
                            </td>
                        </tr>
                        <tr>
                            <td class="content">
                            <h2>📨 Novo Contato via Consultoria</h2>
                            <table class="lead-info">
                                <tr><td><strong>Nome:</strong> ${name}</td></tr>
                                <tr><td><strong>E-mail:</strong> ${email}</td></tr>
                                <tr><td><strong>Telefone:</strong> ${phone || "-"}</td></tr>
                                <tr><td><strong>Empresa:</strong> ${company || "-"}</td></tr>
                                <tr><td><strong>Cargo:</strong> ${position || "-"}</td></tr>
                                <tr><td><strong>Segmento:</strong> ${segment || "-"}</td></tr>
                                <tr><td><strong>Mensagem:</strong><br>${message}</td></tr>
                            </table>
                            </td>
                        </tr>
                        <tr>
                            <td class="footer">
                            © ${new Date().getFullYear()} Wernetech - Todos os direitos reservados.
                            </td>
                        </tr>
                        </table>
                    </div>
                    </body>

                </html>
                `
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
                <!DOCTYPE html>
                <html lang="pt-BR">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Novo Lead Recebido</title>
                <style>
                    body {
                    margin: 0;
                    padding: 0;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                    font-family: Arial, sans-serif;
                    background-color: #f4f7f6;
                    }
                    table { border-spacing: 0; }
                    td { padding: 0; }
                    img { border: 0; }
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
                    font-family: Arial, sans-serif;
                    color: #333333;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                    overflow: hidden;
                    }
                    .header {
                    background-color: #3B82F6;
                    color: #ffffff;
                    padding: 30px;
                    text-align: center;
                    }
                    .header h1 {
                    margin: 0;
                    font-size: 28px;
                    font-weight: bold;
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
                    .lead-info {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                    }
                    .lead-info td {
                    padding: 12px 0;
                    border-bottom: 1px solid #eeeeee;
                    }
                    .lead-info strong {
                    color: #555555;
                    width: 120px;
                    display: inline-block;
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
                        <td style="text-align: center;">
                            <img src="https://drive.google.com/uc?id=1lGGphQkjKi__3OotayUd55C_21IzlQhl" alt="Wernetech Logo" style="max-width: 200px; height: auto;" />
                        </td>
                    </tr>
                    <tr>
                        <td class="content">
                        <h2>📨 Novo Lead na Solução</h2>
                        <table class="lead-info">
                            <tr><td><strong>Nome:</strong> ${name}</td></tr>
                            <tr><td><strong>E-mail:</strong> ${email}</td></tr>
                            <tr><td><strong>Telefone:</strong> ${phone || "-"}</td></tr>
                            <tr><td><strong>Empresa:</strong> ${company || "-"}</td></tr>
                            <tr><td><strong>Cargo:</strong> ${role || "-"}</td></tr>
                            <tr><td><strong>Qtd. de Licenças:</strong> ${licenses || "-"}</td></tr>
                        </table>
                        </td>
                    </tr>
                    <tr>
                        <td class="footer">
                        © ${new Date().getFullYear()} Wernetech - Todos os direitos reservados.
                        </td>
                    </tr>
                    </table>
                </div>
                </body>
                </html>
                `
        });

        res.status(200).json({ success: true, message: "Email enviado com sucesso!" });
    } catch (err) {
        console.error("Erro ao enviar email:", err);
        res.status(500).json({ error: "Falha ao enviar o e-mail." });
    }
});

router.post("/send4", async (req, res) => {
    const { name, email, phone, company, role, solution, observation } = req.body;

    if (!name || !email || !solution) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes." });
    }

    try {
        await sendEmail({
            to: process.env.SMTP_USER,
            subject: "Novo contato via página de solução",
            html: `
             <!DOCTYPE html>
                <html lang="pt-BR">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Novo Lead Recebido</title>
                <style>
                    body {
                    margin: 0;
                    padding: 0;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                    font-family: Arial, sans-serif;
                    background-color: #f4f7f6;
                    }
                    table { border-spacing: 0; }
                    td { padding: 0; }
                    img { border: 0; }
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
                    font-family: Arial, sans-serif;
                    color: #333333;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                    overflow: hidden;
                    }
                    .header {
                    background-color: #3B82F6;
                    color: #ffffff;
                    padding: 30px;
                    text-align: center;
                    }
                    .header h1 {
                    margin: 0;
                    font-size: 28px;
                    font-weight: bold;
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
                    .lead-info {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                    }
                    .lead-info td {
                    padding: 12px 0;
                    border-bottom: 1px solid #eeeeee;
                    }
                    .lead-info strong {
                    color: #555555;
                    width: 120px;
                    display: inline-block;
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
                        <td style="text-align: center;">
                            <img src="https://drive.google.com/uc?id=1lGGphQkjKi__3OotayUd55C_21IzlQhl" alt="Wernetech Logo" style="max-width: 200px; height: auto;" />
                            </td>
                    </tr>
                    <tr>
                        <td class="content">
                        <h2>📨 Novo Lead na Solução</h2>
                        <table class="lead-info">
                            <tr><td><strong>Nome:</strong> ${name}</td></tr>
                            <tr><td><strong>E-mail:</strong> ${email}</td></tr>
                            <tr><td><strong>Telefone:</strong> ${phone || "-"}</td></tr>
                            <tr><td><strong>Empresa:</strong> ${company || "-"}</td></tr>
                            <tr><td><strong>Cargo:</strong> ${role || "-"}</td></tr>
                            <tr><td><strong>Observação:</strong> ${observation || "-"}</td></tr>
                            <p><strong>Nome:</strong> ${name}</p>
                        </table>
                        </td>
                    </tr>
                    <tr>
                        <td class="footer">
                        © ${new Date().getFullYear()} Wernetech - Todos os direitos reservados.
                        </td>
                    </tr>
                    </table>
                </div>
                </body>
                </html>
                `
        });

        res.status(200).json({ success: true, message: "Email enviado com sucesso!" });
    } catch (err) {
        console.error("Erro ao enviar email:", err);
        res.status(500).json({ error: "Falha ao enviar o e-mail." });
    }
});

router.post("/send3", async (req, res) => {
    const { name, email, phone, company, role } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes." });
    }

    try {
        await sendEmail({
            to: process.env.SMTP_USER,
            subject: "Novo contato via página inicial",
            html: `
             <!DOCTYPE html>
                <html lang="pt-BR">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Novo Lead Recebido</title>
                <style>
                    body {
                    margin: 0;
                    padding: 0;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                    font-family: Arial, sans-serif;
                    background-color: #f4f7f6;
                    }
                    table { border-spacing: 0; }
                    td { padding: 0; }
                    img { border: 0; }
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
                    font-family: Arial, sans-serif;
                    color: #333333;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                    overflow: hidden;
                    }
                    .header {
                    background-color: #3B82F6;
                    color: #ffffff;
                    padding: 30px;
                    text-align: center;
                    }
                    .header h1 {
                    margin: 0;
                    font-size: 28px;
                    font-weight: bold;
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
                    .lead-info {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                    }
                    .lead-info td {
                    padding: 12px 0;
                    border-bottom: 1px solid #eeeeee;
                    }
                    .lead-info strong {
                    color: #555555;
                    width: 120px;
                    display: inline-block;
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
                        <td style="text-align: center;">
                            <img src="https://drive.google.com/uc?id=1lGGphQkjKi__3OotayUd55C_21IzlQhl" alt="Wernetech Logo" style="max-width: 200px; height: auto;" />
                            </td>
                    </tr>
                    <tr>
                        <td class="content">
                        <h2>📨 Cliente interessado em recursos não lançados</h2>
                        <table class="lead-info">
                            <tr><td><strong>Nome:</strong> ${name}</td></tr>
                            <tr><td><strong>E-mail:</strong> ${email}</td></tr>
                            <tr><td><strong>Telefone:</strong> ${phone || "-"}</td></tr>
                            <tr><td><strong>Empresa:</strong> ${company || "-"}</td></tr>
                            <tr><td><strong>Cargo:</strong> ${role || "-"}</td></tr>
                        </table>
                        </td>
                    </tr>
                    <tr>
                        <td class="footer">
                        © ${new Date().getFullYear()} Wernetech - Todos os direitos reservados.
                        </td>
                    </tr>
                    </table>
                </div>
                </body>
                </html>
                `
        });

        res.status(200).json({ success: true, message: "Email enviado com sucesso!" });
    } catch (err) {
        console.error("Erro ao enviar email:", err);
        res.status(500).json({ error: "Falha ao enviar o e-mail." });
    }
});

router.post("/send5", async (req, res) => {
    const { name, email, contact_reason, message } = req.body;

    if (!name || !email || !contact_reason || !message) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
        await sendEmail({
            to: process.env.SMTP_USER,
            subject: "📩 Novo Contato via Página de Contato",
            html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Nova Mensagem de Contato</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: 'Poppins', Arial, sans-serif;
              background-color: #f8f9fa;
              color: #212529;
            }
            .wrapper {
              width: 100%;
              padding: 40px 0;
              background-color: #f8f9fa;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .main {
              width: 100%;
              max-width: 600px;
              background-color: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              border: 1px solid #dee2e6;
              box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
            }
            .header {
              background-color: #3B82F6;
              padding: 30px;
              text-align: center;
              color: #fff;
            }
            .header img {
              max-height: 50px;
            }
            .content {
              padding: 30px 40px;
            }
            .content h2 {
              font-size: 22px;
              color: #3B82F6;
              margin-top: 0;
              margin-bottom: 20px;
            }
            .content p {
              font-size: 16px;
              line-height: 1.6;
              color: #495057;
            }
            .info td {
              padding: 8px 0;
              border-bottom: 1px solid #e9ecef;
            }
            .info strong {
              display: inline-block;
              width: 130px;
              color: #212529;
            }
            .footer {
              background-color: #e5e7eb;
              color: #777;
              text-align: center;
              font-size: 12px;
              padding: 16px;
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <table class="main">
              <tr class="header">
                <td>
                  <img src="https://drive.google.com/uc?export=view&id=1lGGphQkjKi__3OotayUd55C_21IzlQhl" alt="Logo Wernetech" />
                </td>
              </tr>
              <tr>
                <td class="content">
                  <h2>📨 Novo Contato Recebido</h2>
                  <table class="info">
                    <tr><td><strong>Nome:</strong> ${name}</td></tr>
                    <tr><td><strong>E-mail:</strong> ${email}</td></tr>
                    <tr><td><strong>Motivo:</strong> ${contact_reason}</td></tr>
                    <tr><td><strong>Mensagem:</strong><br/>${message}</td></tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="footer">
                  © ${new Date().getFullYear()} Wernetech - Todos os direitos reservados.
                </td>
              </tr>
            </table>
          </div>
        </body>
        </html>
      `,
        });

        res.status(200).json({ success: true, message: "Mensagem enviada com sucesso!" });
    } catch (err) {
        console.error("Erro ao enviar contato:", err);
        res.status(500).json({ error: "Falha ao enviar o e-mail." });
    }
});




export default router;
