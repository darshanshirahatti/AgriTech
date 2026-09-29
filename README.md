# AgriTech

KrishiConnect is an agricultural technology platform focused on helping farmers make informed decisions with crop insights, weather information, market data, planning tools, and agricultural knowledge. The repository contains a Next.js web application and a FastAPI backend.

## Tech Stack

- Web: Next.js 16, React 19, TypeScript, Tailwind CSS
- API: FastAPI, SQLAlchemy (async), Pydantic
- Database: PostgreSQL with asyncpg

## Requirements

- Node.js and npm
- Python 3.11 or newer
- PostgreSQL for database-backed API features

## Run the Web App

From the repository root:

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

The web app will be available at http://localhost:3000. The example environment file points the frontend to the local API at `http://localhost:8000/api/v1`.

## Run the API

In a second terminal:

```powershell
Set-Location backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

Edit `backend/.env` with your local PostgreSQL connection details and a new development `JWT_SECRET_KEY`. Create the `krishiconnect` database, then initialize its tables and start the API:

```powershell
python init_db.py
uvicorn app.main:app --reload
```

The API runs at http://localhost:8000. Interactive API documentation is available at http://localhost:8000/docs, and the health endpoint is http://localhost:8000/api/v1/health.

## Environment Files

- `.env.example` configures the frontend API URL.
- `backend/.env.example` lists backend configuration, including the database URL and JWT settings.
- Keep `.env.local` and `backend/.env` private. They are ignored by Git; only the example templates should be committed.

## Useful Commands

```bash
npm run dev       # Start the web app
npm run lint      # Run ESLint
npm run build     # Build the web app
```

Run backend commands from the `backend` directory. Install Python dependencies with `pip install -r requirements.txt`; run backend tests with `pytest`.

## Repository Layout

```text
src/       Next.js application and UI components
backend/   FastAPI application, database models, and tests
public/    Static web assets
```
