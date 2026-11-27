# Smart Website Monitoring API

A minimal backend starter for the Smart Website Monitoring Platform, built with Node.js, Express, and JavaScript ES modules.

## Requirements

- Node.js 18 or newer
- npm

## Installation

From this `Backend` directory, install the dependencies:

```bash
npm install
```

## Environment setup

Copy `.env.example` to `.env` and adjust the values for your environment:

```bash
cp .env.example .env
```

On Windows PowerShell, use `Copy-Item .env.example .env` instead. The starter defaults are `PORT=3000`, `NODE_ENV=development`, and `FRONTEND_URL=http://localhost:5173`. `PORT` must be a valid port number, `NODE_ENV` must be `development`, `production`, or `test`, and `FRONTEND_URL` must be a valid URL.

## Run the backend

Start with automatic restarts during development:

```bash
npm run dev
```

Start normally:

```bash
npm start
```

The health endpoint is available at `GET http://localhost:3000/api/health` and responds with:

```json
{
  "success": true,
  "message": "Smart Website Monitoring API is running"
}
```
