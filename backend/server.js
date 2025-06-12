import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import leadsRoutes from './routes/leads.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import emailRoutes from './routes/email.js';

import { createLeadsTable } from './database/createLeadsTable.js';
import { createUsersTable } from './database/createUsersTable.js';
import { createPostsTable } from './database/createPostsTable.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost',
  'https://localhost',
  'http://5.161.71.249',
  'https://5.161.71.249',
  'https://wernetech.com',
  'http://wernetech.com'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/leads', leadsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/email', emailRoutes);

// Retry para criação das tabelas
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function iniciarBancoComRetry() {
  const tentativas = 5;

  for (let i = 0; i < tentativas; i++) {
    try {
      await createUsersTable();
      await createPostsTable();
      await createLeadsTable();

      console.log("✅ Tabelas verificadas/criadas com sucesso");
      return; // Finaliza com sucesso
    } catch (err) {
      console.error(`❌ Tentativa ${i + 1} falhou:`, err.message);

      if (i < tentativas - 1) {
        console.log("⏳ Aguardando 3 segundos para tentar novamente...");
        await delay(3000);
      } else {
        console.error("🚨 Todas as tentativas falharam. Encerrando aplicação.");
        process.exit(1); // Mata a aplicação se falhar todas
      }
    }
  }
}

iniciarBancoComRetry();

app.get("/teste", (req, res) => {
  res.status(200).json({ message: "Conexão deu certo!" });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
