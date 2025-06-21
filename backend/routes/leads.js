import express from 'express';
import { db } from '../database/db.js';
import { z } from 'zod';
import { sendEmail } from '../utils/emailService.js';

const router = express.Router();

// Validação com Zod
const leadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(8),
  company: z.string().optional(),
  position: z.string().optional(),
  segment: z.string().optional(),
  message: z.string().min(1),
});

// Rota para criação de lead
router.post('/', async (req, res) => {
  const result = leadSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.format() });
  }

  const { name, email, phone, company, position, segment, message } = result.data;

  try {
    await db.query(
      `INSERT INTO leads (name, email, phone, company, position, segment, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [name, email, phone, company, position, segment, message]
    );

    // Envio de e-mail
    const htmlContent = `
      <body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <div style="background: #0d47a1; padding: 20px; text-align: center;">
            <img src="https://drive.google.com/uc?export=view&id=1lGGphQkjKi__3OotayUd55C_21IzlQhl" alt="Logo Wernetech" style="max-height: 120px;" />
          </div>
          <div style="padding: 30px;">
            <h2>📨 Novo Contato via Consultoria</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${phone}</p>
            <p><strong>Empresa:</strong> ${company || '-'}</p>
            <p><strong>Cargo:</strong> ${position || '-'}</p>
            <p><strong>Segmento:</strong> ${segment || '-'}</p>
            <p><strong>Mensagem:</strong><br/>${message}</p>
          </div>
          <div style="background: #eeeeee; text-align: center; padding: 16px; font-size: 12px;">
            © ${new Date().getFullYear()} Wernetech - Todos os direitos reservados.
          </div>
        </div>
      </body>
    `;

    await sendEmail({
      to: 'comercial@wernetech.com',
      subject: 'Novo lead via consultoria - Wernetech',
      html: htmlContent,
    });

    res.status(201).json({ message: 'Lead salvo e email enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar lead ou enviar e-mail:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para listar todos os leads
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM leads`);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar leads:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router;
