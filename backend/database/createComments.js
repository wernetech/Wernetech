import { db } from './db.js';

export async function createCommentsTable() {
    try {
        await db.query(`
      CREATE TABLE IF NOT EXISTS comments (
            id SERIAL PRIMARY KEY,
            post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
            author TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
        console.log('Tabela "Posts" verificada/criada com sucesso!');
    } catch (error) {
        console.error('Erro ao criar tabela Posts:', error);
    }
}
