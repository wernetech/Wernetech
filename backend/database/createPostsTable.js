import { db } from './db.js';

export async function createPostsTable() {
    try {
        await db.query(`
      CREATE TABLE IF NOT EXISTS posts (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            summary TEXT,
            author TEXT NOT NULL,
            category TEXT,
            reading_time INT,
            thumbnail TEXT,
            likes INT DEFAULT 0,            
            comments INT DEFAULT 0,  -- Adicionando a coluna comments
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
        console.log('Tabela "Posts" verificada/criada com sucesso!');
    } catch (error) {
        console.error('Erro ao criar tabela Posts:', error);
    }
}
