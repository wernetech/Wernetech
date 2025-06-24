# Documentação do Projeto - Wernetech

## 🔐 Dados de Acesso ao Sistema (Servidor Ubuntu)

- **Usuário Root:** root
- **Senha:** (definida no provisionamento, recomendável alterar no primeiro acesso)

### Como mudar a senha do root:

```bash
passwd
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

> Para mais dúvidas ou ajustes, entre em contato com o desenvolvedor responsável ou utilize o repositório no GitHub.

## 🔧 GitHub

- O projeto será transferido para a propriedade do cliente mediante entrega.
- Todos os arquivos de configuração, deploy e credenciais temporárias estão incluídos no repositório.

---

> Documentação elaborada com base na implantação e requisitos de infraestrutura do cliente. Pronta para uso e manutenção.

