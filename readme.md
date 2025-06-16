----- docker:

-resetar o docker forçado:
wsl --shutdown

-validar o se o docker ta rodando:
docker info

-Checar os serviços docker rodando:
docker ps
docker ps -a

-Iniciar os containers:
docker-compose up -d

-Chegar o log do docker:
docker logs id(pego no docker ps)
docker logs -f id(pego no docker ps)

-Subir/atualizar containers:
docker compose up -d --build
docker compose build --no-cache

-Atualizar em caso de estiver rodando:
docker compose down
docker compose up -d --build

-Limpar cache:
docker system prune -af

-Remover tudo antigo:
docker-compose down --volumes --remove-orphans

-Derrubar todos os dockers:
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)

-Ver as variaveis de ambiente do docker:
docker compose exec postgres env | Select-String POSTGRES
No lugar de "postgres" coloca o nome do serviço e no "POSTGRES", a variavel do enviroment que quer ver

docker compose exec wernetech_backend env | Select-String EMAIL_IP

-Testar conexão manual:
docker exec -it wernetech_app bash

-Ver o conteudo do arquivo:
cat leads.js (nome do arquivo)

-Após testar tente conectar ao banco:
psql -U wernetech_admin -d empresa (troque as variaveis de acordo com o seu banco)

-Verifique os containers que ainda estão usando a rede:
docker ps -a --filter network=empresa-wernetech_default

-Força a remoção de containers ainda ativos:
docker rm -f $(docker ps -aq)

-Comando pra ver as portas que o docker ta rodando:
docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Ports}}"

-Comandos reset dentro da vps:
docker-compose down -v
docker-compose build --no-cache
docker-compose up


----- NGINX:

-Abrir o arquivo de config do NGINX:
sudo nano /etc/nginx/sites-available/default

-Bloco server { ... }:
server {
    listen 80;
    server_name _;

    location /api/ {
        proxy_pass http://localhost:4000/;
    }

    location / {
        proxy_pass http://localhost:3002/;
    }
}

listen 80; → Escuta na porta padrão HTTP.
server_name _; → Aceita qualquer nome de host (útil quando não tem domínio).
location /api/ → Tudo que vier de /api/ vai pro backend Express na porta 4000.
location / → Todo o resto vai pro frontend Next.js na porta 3002.

-Testar a config:
sudo nginx -t

-Ver se está rodando:
sudo systemctl status nginx

-Reiniciar o serviço NGINX:
sudo systemctl restart nginx



-criar admin provisorio dentro do container app:
curl -X POST http://localhost:4000/api/auth/register-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@admin.com",
    "password": "admin123#",
    "cellphone": "31999999999",
    "company": "Admin Corp",
    "city": "Contagem",
    "state": "MG"
  }'