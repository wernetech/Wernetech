import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

console.log('🔐 DB URL:', process.env.DATABASE_URL); // debug

export const db = new Pool({
    connectionString: process.env.DATABASE_URL,
});