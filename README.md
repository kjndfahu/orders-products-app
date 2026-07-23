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

## Архитектура Backend

Backend построен по **трёхслойной архитектуре** с использованием классов:

### 1. **Repository Layer (Репозитории)**
- Базовый абстрактный класс `BaseRepository` инкапсулирует работу с Prisma Client
- `OrderRepository` и `ProductRepository` наследуются от базового класса
- Отвечают за прямое взаимодействие с БД: SELECT, INSERT, UPDATE, DELETE
- Строят сложные запросы с фильтрацией, сортировкой и связями (include/select)

### 2. **Service Layer (Сервисы)**
- `OrderService` и `ProductService` — классы бизнес-логики
- Используют репозитории для доступа к данным
- Содержат валидацию, трансформацию данных, дополнительную обработку
- Могут объединять несколько запросов в одну транзакцию

### 3. **Controller Layer (Контроллеры)**
- Функции-обработчики Express маршрутов (`getAllOrders`, `createProduct` и т.д.)
- Извлекают параметры из req (query, params, body)
- Вызывают методы сервисов
- Формируют HTTP-ответы (res.json, res.status)

### Почему классы?

✅ **Инкапсуляция** — логика доступа к данным изолирована в классах  
✅ **Повторное использование** — базовый класс устраняет дублирование кода  
✅ **Тестируемость** — легко мокировать зависимости (Prisma Client) через DI в конструкторе  
✅ **Расширяемость** — новый репозиторий = новый класс-наследник  
✅ **Читаемость** — чёткое разделение ответственности по слоям

## Frontend: Оптимизация и производительность

### Lazy Loading (Dynamic Import)
Компоненты страниц загружаются асинхронно с помощью `next/dynamic`:

```tsx
const OrdersView = dynamic(
  () => import("@/components/Orders").then((mod) => mod.OrdersView),
  { loading: () => <OrdersSkeleton /> }
);
```

**Преимущества:**
- ⚡ Уменьшение размера первоначального бандла
- 🚀 Быстрее Time to Interactive (TTI)
- 📦 Code Splitting — каждая страница загружает только свой код
- 💀 Skeleton UI — пользователь видит структуру страницы до загрузки данных

### LocalStorage
Тема приложения (светлая/тёмная) сохраняется в `localStorage`:

```ts
const THEME_STORAGE_KEY = 'theme';
localStorage.setItem(THEME_STORAGE_KEY, theme);
```

**Зачем?**
- 🎨 Предотвращает "мигание" темы при перезагрузке страницы
- 🧠 Запоминает выбор пользователя между сессиями
- ⚡ Синхронный скрипт в `layout.tsx` применяет тему до рендера React (устраняет FOUC)

### Другие оптимизации
- **SCSS Modules** — локальные стили, нет конфликтов имён классов
- **Redux Toolkit** — иммутабельные обновления состояния через Immer
- **React 19** — автоматический батчинг, улучшенные хуки
- **Socket.IO** — polling → WebSocket upgrade предотвращает ошибки "closed before established"

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

### Backend

```bash
# Разработка с hot-reload
cd backend && npm run dev

# Production сборка
cd backend && npm run build
cd backend && npm start

# Prisma
npm run prisma:generate    # Генерация Prisma Client
npm run prisma:migrate     # Применение миграций (dev)
npm run prisma:studio      # GUI для БД (http://localhost:5555)
npm run prisma:seed        # Загрузка тестовых данных
npm run db:setup           # Миграции + seed (первый запуск)
```

### Frontend

```bash
# Разработка
cd frontend && npm run dev

# Production
npm run build              # Оптимизированная сборка
npm start                  # Запуск production сервера

# Линтинг
npm run lint               # ESLint проверка
```

### Docker

```bash
# Запуск всех сервисов
docker compose up -d

# Пересборка после изменений
docker compose up --build -d

# Остановка
docker compose down

# Остановка + удаление volumes (БД)
docker compose down -v

# Логи конкретного сервиса
docker compose logs backend -f
docker compose logs frontend -f

# Вход в контейнер
docker compose exec backend sh
docker compose exec db mariadb -u root -p
```

## NPM скрипты

### Backend (`backend/package.json`)

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск в dev режиме с tsx watch (hot-reload) |
| `npm run build` | Компиляция TypeScript → JavaScript (dist/) |
| `npm start` | Запуск скомпилированного приложения |
| `npm run prisma:generate` | Генерация Prisma Client из schema.prisma |
| `npm run prisma:migrate` | Создание/применение миграций БД |
| `npm run prisma:studio` | Открыть Prisma Studio (GUI для БД) |
| `npm run prisma:seed` | Загрузка seed.sql в БД (требует mariadb CLI) |
| `npm run db:setup` | Полная настройка БД: миграции + seed |

### Frontend (`frontend/package.json`)

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск Next.js dev сервера (http://localhost:3000) |
| `npm run build` | Production сборка (оптимизация, минификация) |
| `npm start` | Запуск production сервера |
| `npm run lint` | ESLint проверка кода |

## Лицензия

ISC (backend). Frontend — private package.
