import { db } from './db.js';

export async function createLeadsTable() {
    try {
        await db.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        solution TEXT,
        company TEXT,
        position TEXT,
        segment TEXT,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        console.log('Tabela "leads" verificada/criada com sucesso!');
    } catch (error) {
        console.error('Erro ao criar tabela leads:', error);
    }
}
