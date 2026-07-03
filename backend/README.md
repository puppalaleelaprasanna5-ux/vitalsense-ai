# VitalSense AI Backend

This repository contains the backend architecture for the VitalSense AI project.

## Project

A Node.js + TypeScript backend starter using Express and common middleware packages.

## Folder structure

backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
├── prisma/
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── README.md

## Install

```bash
cd backend
npm install
```

## Run

Start in development mode:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Start the compiled server:

```bash
npm run start
```

## Notes

- This setup includes Express, TypeScript, tsx, dotenv, cors, helmet, and morgan.
- No APIs, authentication, or routes are implemented yet.

## Prisma

Prisma is configured with PostgreSQL in `prisma/schema.prisma`.
The client is exposed from `src/config/prisma.ts`.

### Database

Read your database connection string from `.env` via `DATABASE_URL`.
You can use a PostgreSQL database such as `postgresql://USER:PASSWORD@HOST:5432/vitalsense`.

### Migration commands

Run migrations after configuring your database:

```bash
cd backend
npx prisma migrate dev --name init
```

Generate the Prisma client manually if needed:

```bash
cd backend
npx prisma generate
```
