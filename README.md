# Goose Game 🪿

Браузерная игра - тапай по гусю и набирай очки!

## Запуск

```bash
npm install
npm run dev
```

Открыть http://localhost:3000

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск dev сервера |
| `npm run build` | Сборка для production |

## Docker

### Production сборка

```bash
# Сборка и запуск
docker-compose up -d goose-game

# Или напрямую
docker build -t goose-game .
docker run -p 8080:80 goose-game
```

Открыть http://localhost:8080

### Development режим

```bash
docker-compose --profile dev up goose-game-dev
```

Открыть http://localhost:3000

## Тестовые данные

**Админ:**
- username: `admin`
- password: `pass`

## Стек

- React 18 + TypeScript
- Vite
- Mantine UI
- Redux Toolkit + RTK Query
- React Router
- react-hook-form + Zod
- ESLint + Prettier
- Docker + Nginx

## API

Backend: `http://v2991160.hosted-by-vdsina.ru`

| Endpoint | Метод | Описание |
|----------|-------|----------|
| `/api/v1/auth/login` | POST | Логин |
| `/api/v1/auth/me` | GET | Текущий пользователь |
| `/api/v1/auth/logout` | POST | Выход |
| `/api/v1/rounds` | GET | Список раундов |
| `/api/v1/rounds` | POST | Создать раунд (admin) |
| `/api/v1/rounds/{id}` | GET | Детали раунда |
| `/api/v1/rounds/{id}/tap` | POST | Тап по гусю |
