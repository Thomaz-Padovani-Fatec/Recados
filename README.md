# Recados

Monorepo com `backend/` (Laravel 12 + Sanctum), `frontend/` (React) e MySQL, rodando em Docker.

## Subir o projeto

```bash
docker compose up -d --build
docker compose exec backend php artisan migrate
```

| Serviço  | URL                       |
|----------|---------------------------|
| Frontend | http://localhost:3000     |
| API      | http://localhost:8000/api |

Se o `migrate` falhar logo após o primeiro `up`, o MySQL ainda está iniciando: aguarde alguns segundos e rode de novo.

## Comandos úteis

```bash
docker compose ps
docker compose logs -f backend
docker compose exec backend php artisan tinker
docker compose down        # para os containers (mantém o banco)
docker compose down -v     # para e apaga o volume do banco
```
