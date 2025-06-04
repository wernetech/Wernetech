import { db } from './db.js';

export async function createUsersTable() {
    try {
        await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        console.log('Tabela "users" verificada/criada com sucesso!');
    } catch (error) {
        console.error('Erro ao criar tabela users:', error);
    }
}
