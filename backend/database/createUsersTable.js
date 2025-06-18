import { db } from './db.js';
import bcrypt from 'bcrypt';

export async function createUsersTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        password TEXT NOT NULL,
        cellphone VARCHAR(15) NOT NULL,
        company VARCHAR(100) NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(2) NOT NULL,
        verified BOOLEAN DEFAULT false,
        verification_token TEXT,
        reset_token TEXT,
        admin BOOLEAN DEFAULT false,
        reset_token_expires TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Tabela "users" verificada/criada com sucesso!');

    // Verifica se já existe um admin
    const existingAdmin = await db.query(
      `SELECT * FROM users WHERE email = $1`,
      ['admin@wernetech.com']
    );

    if (existingAdmin.rows.length === 0) {
      const hashedPassword = await bcrypt.hash('admin123#', 10);
      await db.query(
        `INSERT INTO users (email, password, name, cellphone, company, city, state, verified, admin)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          'admin@wernetech.com',
          hashedPassword,
          'administrador',
          '(31) 99999-9999',
          'WerneTech',
          'Contagem',
          'MG',
          true,
          true,
        ]
      );
      console.log('Usuário admin criado com sucesso!');
    } else {
      console.log('Usuário admin já existe.');
    }
  } catch (error) {
    console.error('Erro ao criar tabela ou admin:', error);
  }
}
