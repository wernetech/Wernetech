# Documentação do Projeto - Wernetech

## 🔐 Dados de Acesso ao Sistema (Servidor Ubuntu)

- **Usuário Root:** root
- **IP de conexão:** 5.161.71.249
- **Senha:** (Gerada pela VPS)

### Como mudar a senha do root:

```bash
Você deve gerar sempre na vps para seguranaça, na aba RESCUE, clique em Reset Root Password, ai pegue e copie quando pedir no terminal
```

## 🚀 Deploy e Infraestrutura

- O projeto utiliza Docker Compose para orquestração dos containers:
  - PostgreSQL
  - Backend (Node.js + Express)
  - Frontend (Next.js)
  - NGINX (proxy reverso)
  - Certbot (SSL)

### ⚡ Comandos para subir o ambiente

```bash
docker-compose up -d --build
```

### Certbot SSL

Para emitir o certificado SSL com Let's Encrypt:

```bash
docker-compose run --rm certbot
```

- O certificado será armazenado em:
  - `/certbot/conf/live/wernetech.com/fullchain.pem`
  - `/certbot/conf/live/wernetech.com/privkey.pem`

> A renovação não está automatizada. Recomendado incluir esse processo na agenda da empresa.

## 🌐 Domínio e DNS

- Domínio: `wernetech.com`
- DNS apontado para: `5.161.71.249`
- Porta 80 e 443 liberadas no firewall externo (Hetzner)

## 📂 Estrutura de Pastas

```
empresa-wernetech/
├── backend/         # Serviço Node.js + Express
├── frontend/        # Aplicativo React/Next.js
├── nginx/           # Configuração do NGINX + SSL
├── certbot/         # Certificados SSL
├── docker-compose.yml
```

## 🚧 Como Manipular o Projeto

### Desenvolvimento local

```bash
npm install
docker-compose up -d --build
```

### Scripts Disponíveis

**Raiz:**

```json
"dev": "concurrently \"npm run dev:back\" \"npm run dev:front\""
```

**Backend:**

```json
"dev": "nodemon server.js"
```

**Frontend:**

```json
"dev": "next dev",
"build": "next build",
"start": "next start"
```

### Acesso ao sistema em produção

- Site: [https://wernetech.com](https://wernetech.com)
- Painel de contato, formulários e envio de e-mails integrados

## 📢 Ambiente de E-mail

- SMTP configurado no backend via variáveis de ambiente:

```env
SMTP_HOST=mail.wernetech.com
SMTP_PORT=587
SMTP_USER=contato@wernetech.com
SMTP_PASS=(senha fornecida)
```

- Porta configurada com STARTTLS (`SMTP_SECURE=false`, `SMTP_REQUIRE_TLS=true`)

## 🚑 Tecnologias Utilizadas

### Backend

- Node.js + Express
- PostgreSQL
- JWT
- Nodemailer
- Zod (validações)

### Frontend

- Next.js 15
- TailwindCSS 4
- React 19
- Tiptap Editor
- Framer Motion
- React Spring

### Infraestrutura

- Docker + Docker Compose
- NGINX como reverse proxy com SSL
- Certbot para SSL Let's Encrypt
- Hospedado em servidor VPS Hetzner

## 📁 Docker Compose

```yaml
version: "3.8"

services:
  postgres:
    image: bitnami/postgresql:latest
    environment:
      POSTGRES_USER: wernetech_admin
      POSTGRES_PASSWORD: admin_9876
      POSTGRES_DB: empresa
    volumes:
      - pgdata:/bitnami/postgresql

  backend:
    build: ./backend
    environment:
      DATABASE_URL: "postgresql://wernetech_admin:admin_9876@postgres:5432/empresa"
      JWT_SECRET: "..."
      EMAIL_IP: wernetech.com
      SMTP_*

  frontend:
    build: ./frontend
    environment:
      NEXT_PUBLIC_API: https://wernetech.com/api

  nginx:
    image: nginx:latest
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot

  certbot:
    image: certbot/certbot
    entrypoint: sh -c "certbot certonly ..."

volumes:
  pgdata:
```

---

# CRUD da Tabela "users" (Banco de Dados PostgreSQL)

Este guia foi criado para demonstrar como manipular os dados da tabela `users` no banco de dados PostgreSQL, utilizado no projeto Wernetech. Abaixo temos exemplos práticos de como realizar as principais operações: SELECT, INSERT, UPDATE e DELETE.

---

## 📒 Estrutura da Tabela `users`

```sql
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
```

---

## 🔍 SELECT (Consultar)

```sql
-- Buscar todos os usuários
SELECT * FROM users;

-- Buscar um usuário por ID
SELECT * FROM users WHERE id = 1;

-- Buscar usuários administradores
SELECT * FROM users WHERE admin = true;
```

---

## ➕ INSERT (Inserir)

```sql
-- Inserir um novo usuário comum
INSERT INTO users (email, name, password, cellphone, company, city, state)
VALUES (
  'usuario@teste.com',
  'Usuário Teste',
  'senha_hashed_aqui',
  '(31) 91234-5678',
  'Empresa XYZ',
  'Belo Horizonte',
  'MG'
);

-- Inserir um usuário administrador já verificado
INSERT INTO users (email, name, password, cellphone, company, city, state, verified, admin)
VALUES (
  'admin@teste.com',
  'Admin Teste',
  'senha_hashed_aqui',
  '(31) 90000-0000',
  'Empresa XYZ',
  'Contagem',
  'MG',
  true,
  true
);
```

---

## ✏️ UPDATE (Atualizar)

```sql
-- Atualizar o nome e cidade de um usuário
UPDATE users
SET name = 'Novo Nome', city = 'Nova Cidade', updated_at = CURRENT_TIMESTAMP
WHERE id = 1;

-- Atualizar senha (hash já gerado pelo backend)
UPDATE users
SET password = 'nova_senha_hashed', updated_at = CURRENT_TIMESTAMP
WHERE email = 'usuario@teste.com';
```

---

## ❌ DELETE (Deletar)

```sql
-- Remover um usuário por ID
DELETE FROM users WHERE id = 5;

-- Remover todos os usuários não verificados
DELETE FROM users WHERE verified = false;
```

---

## 🚀 Observações Importantes

* **Senhas** devem sempre ser armazenadas com hash. Use o `bcrypt` no backend.
* Use sempre `updated_at = CURRENT_TIMESTAMP` para registrar alterações.
* Evite deletar usuários importantes como administradores diretamente.
* Recomenda-se realizar backups antes de operações destrutivas (DELETE).

---

> Para mais dúvidas ou ajustes, entre em contato com o desenvolvedor responsável ou utilize o repositório no GitHub.

## 🔧 GitHub

- O projeto será transferido para a propriedade do cliente mediante entrega.
- Todos os arquivos de configuração, deploy e credenciais temporárias estão incluídos no repositório.

---

> Documentação elaborada com base na implantação e requisitos de infraestrutura do cliente. Pronta para uso e manutenção.

> Desenvolvido por: Davi Quaresma da Silva Henriques

