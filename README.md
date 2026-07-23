# Orders & Products (INVENTORY)

Веб-приложение для учёта **приходов (заказов)** и **продуктов** на складе: просмотр списков, детали прихода, удаление записей, переключение языка и темы. В шапке отображается текущая дата, время и **число активных WebSocket-сессий** (открытых вкладок/клиентов, подключённых к фронтенду).

## Стек технологий

| Слой | Технологии |
|------|------------|
| **Frontend** | [Next.js 16](https://nextjs.org/) (App Router), React 19, TypeScript, SCSS Modules, Tailwind CSS 4 |
| **Состояние** | Redux Toolkit, React Context (i18n, тема, мобильное меню) |
| **Realtime** | [Socket.IO](https://socket.io/) (сервер в `pages/api/socket`, клиент в хуке `useActiveSessions`) |
| **HTTP-клиент** | Axios |
| **UI** | lucide-react, react-loading-skeleton |
| **Валидация** | Zod |
| **Backend** | Node.js, [Express](https://expressjs.com/), TypeScript |
| **ORM / БД** | [Prisma](https://www.prisma.io/), MariaDB 10.11 |
| **Инфраструктура** | Docker Compose |

## Что реализовано

- **Приходы (orders)** — список карточек, панель деталей, удаление прихода и позиций.
- **Продукты (products)** — список с фильтрами по типу/состоянию, удаление товара.
- **REST API** (`/api/v1`) — заказы и продукты (Express + Prisma).
- **Локализация** — русский и английский (`messages/ru.json`, `messages/en.json`).
- **Тема** — светлая/тёмная.
- **Адаптив** — боковое меню и мобильная навигация.
- **Счётчик активных сессий** — в правой части шапки (блок «Сессии» + число). Каждое подключение Socket.IO считается одной сессией; при открытии второй вкладки счётчик увеличивается у всех клиентов.

## Структура репозитория

```
orders-products-app/
├── backend/          # Express API, Prisma, миграции, seed
├── frontend/         # Next.js приложение
├── docker-compose.yml
├── .env              # переменные для Docker (не коммитить секреты в публичный репозиторий)
└── README.md
```

## Требования

- [Docker](https://www.docker.com/) и Docker Compose **или**
- Node.js 20+, локально установленная MariaDB/MySQL (для разработки без Docker)

## Запуск через Docker (рекомендуется)

1. В корне проекта создайте файл `.env` (пример значений — см. раздел «Переменные окружения»).

2. Соберите и запустите сервисы:

```bash
docker compose up --build -d
```

3. Откройте приложение:

| Сервис | URL |
|--------|-----|
| Frontend | http://localhost:3001 |
| Backend API | http://localhost:5000/api/v1 |
| MariaDB | localhost:3306 |

При первом старте backend выполняет миграции Prisma и загрузку seed-данных.

Остановка:

```bash
docker compose down
```

Полная очистка данных БД (volume):

```bash
docker compose down -v
```

## Локальная разработка без Docker

### Backend

```bash
cd backend
cp ../.env .env   # или настройте DATABASE_URL на локальную БД
npm install
npm run prisma:generate
npm run db:setup    # миграции + seed (нужен клиент mariadb/mysql)
npm run dev         # http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
```

Создайте `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

Запуск:

```bash
npm run dev   # http://localhost:3000
```

> **Счётчик сессий:** Socket.IO поднимается на том же процессе, что и Next.js. Клиент сначала вызывает `GET /api/socket`, затем подключается по WebSocket. Без этого шага соединение может не установиться (особенно сразу после перезапуска контейнера).

## Переменные окружения (корневой `.env` для Compose)

| Переменная | Назначение |
|------------|------------|
| `MARIADB_ROOT_PASSWORD`, `MARIADB_DATABASE` | MariaDB в Docker |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | Подключение backend к БД |
| `DATABASE_URL` | URL для Prisma |
| `PORT` | Порт backend (5000) |
| `NODE_ENV` | Окружение Node |
| `CORS_ORIGIN` | Разрешённые origin для API (например `http://localhost:3000,http://localhost:3001`) |
| `API_PREFIX` | Префикс API (`/api/v1`) |

Frontend в Docker получает `NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1` (см. `docker-compose.yml`).

## API (кратко)

- `GET/POST/DELETE …/orders` — заказы (приходы).
- `GET/POST/DELETE …/products` — продукты.

Точные маршруты см. в `backend/src/routes/`.

## Полезные команды

```bash
# Backend: Prisma Studio (локально, с настроенным DATABASE_URL)
cd backend && npm run prisma:studio

# Frontend: линтер
cd frontend && npm run lint

# Frontend: production-сборка
cd frontend && npm run build && npm start
```

## Лицензия

ISC (backend). Frontend — private package.
