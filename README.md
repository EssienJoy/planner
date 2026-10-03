# Plannerly

A personal planner web app for organising days, goals, and small teams —
plans, tasks, reminders, and progress tracking in one calm place, fronted by
a marketing landing page.

## What kind of project is this?

A full-stack **monorepo** with two independent npm projects that run
separately (separate `package.json`, dependencies, and env files):

| Folder   | What it is                                              | Stack                                                                |
| -------- | ------------------------------------------------------- | -------------------------------------------------------------------- |
| `client` | The web app (landing page + authenticated dashboard)    | React 19, React Router v7 (SSR), Vite, Tailwind CSS v4, shadcn/Base UI, TanStack Query, Redux Toolkit |
| `server` | The REST API (auth, users, plans, tasks, notifications) | Node.js, Express 5, Mongoose (MongoDB), JWT cookie auth, Nodemailer  |

The client renders pages and forms; the server owns data and sessions. They
talk to each other over HTTP JSON, authenticated with an **httpOnly JWT
cookie** (never localStorage).

## Prerequisites

- Node.js 18+ and npm
- A MongoDB database (e.g. a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)
- (Optional, for emails) a [Mailtrap](https://mailtrap.io) sandbox inbox

## Setup

Both folders need their dependencies and env files. The repos ship
`.env.example` files — copy them, never commit the real ones.

### 1. Server (port 3000)

```bash
cd server
npm install
cp .env.example config.env   # then fill in your real values (see below)
npm run dev
```

You should see `App running on port 3000...` followed by
`DB connection successful!`.

> `server.js` loads `./config.env` relative to the folder, so always run
> npm scripts **from inside `server/`**.

### 2. Client (port 5173)

```bash
cd client
npm install
cp .env.example .env         # then check the values (see below)
npm run dev
```

Open http://localhost:5173 — sign up, and you're in the planner.

### 3. Production builds

```bash
cd client && npm run build    # client -> build/
cd server && npm start        # serves the API with NODE_ENV=production
```

Other useful client scripts: `npm run lint`, `npm run typecheck`,
`npm run preview`.

## Environment variables

### Client — `.env`

Copy `.env.example` to `.env`:

| Variable               | Used for                                              |
| ---------------------- | ----------------------------------------------------- |
| `VITE_BACKEND_API_URL` | Base URL of the API, e.g. `http://localhost:3000/api/v1/` |
| `NODE_ENV`             | `development` locally                                 |

Rules that bite: only variables prefixed with **`VITE_`** reach the
browser (`import.meta.env.*`), and **the dev server must be restarted**
after any `.env` change.

### Server — `config.env`

Copy `.env.example` to `config.env`:

| Variable              | Used for                                                        |
| --------------------- | --------------------------------------------------------------- |
| `NODE_ENV`            | `development` locally                                           |
| `PORT`                | API port (`3000`)                                               |
| `DATABASE_PASSWORD`   | MongoDB user password — injected into `DATABASE_URI`            |
| `DATABASE_URI`        | Connection string with a literal `<PASSWORD>` placeholder       |
| `JWT_SECRET`          | Long random string for signing session tokens                   |
| `JWT_EXPIRES`         | Token lifetime, e.g. `90d`                                      |
| `JWT_COOKIE_EXPIRES_IN` | Cookie lifetime in days, e.g. `90`                            |
| `EMAIL_USERNAME` / `EMAIL_PASSWORD` | Mailtrap sandbox credentials (password resets, welcome mail) |
| `EMAIL_HOST` / `EMAIL_PORT` | Mailtrap SMTP host/port                                   |
| `EMAIL_FROM`          | Sender address shown on outgoing mail                           |

## How client and server connect

```
Browser ── page/API request ──► Client (5173, React Router SSR)
                                        │  fetch(BACKEND_URL + route,
                                        │        { credentials: "include" })
                                        ▼
                                  Server (3000, /api/v1/…)
                                        │  validates JWT cookie,
                                        │  runs controllers
                                        ▼
                                   MongoDB Atlas
```

- **Session flow:** login/signup POST credentials → server sets an httpOnly
  `jwt` cookie → every later request carries it automatically
  (`credentials: "include"` on the client, CORS enabled for the client
  origin on the server).
- **SSR awareness:** route `loader`s/`action`s run on the server during
  SSR, so they **forward the incoming `Cookie` header** explicitly when
  calling the API (browser `fetch` does this automatically, server-side
  `fetch` does not).
- **Guards:** loaders check the session and `redirect("/login")` when it
  is missing/invalid; the login/signup loaders bounce signed-in users to
  the planner.
- **API surface** (all under `/api/v1/`): `users/signup`, `users/login`,
  `users/logout`, `users/me`, `plans`, `plans/:id`, tasks, notifications.

## Troubleshooting

- **Blank page / `RefreshRuntime` errors:** stop the dev server, start it
  fresh (`npm run dev`), then hard-refresh (Ctrl+Shift+R).
- **API calls fail:** is the server running on 3000? Is
  `VITE_BACKEND_API_URL` correct *and* was the client restarted after
  editing `.env`?
- **Logged out on refresh / 401s:** the JWT cookie is `httpOnly` + the API
  is cross-origin in dev — the server must allow credentials from the
  client origin, and requests must use `credentials: "include"`.
- **Editor shows `+types/*` module-not-found:** run
  `npx react-router typegen` (or `npm run typecheck`) to regenerate route
  types, then reload the editor's TS server.
- **`index.html` / `package.json` missing at repo root:** expected — the
  runnable projects live in `client/` and `server/`; run all commands
  inside those folders.
