# KrishiConnect Backend

FastAPI backend for the KrishiConnect agritech platform.

## Setup

Run these commands from the `backend` directory:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

Edit `.env` with your PostgreSQL connection URL and a development `JWT_SECRET_KEY`. Create the `krishiconnect` database, then create its tables and start the API:

```powershell
python init_db.py
uvicorn app.main:app --reload
```

The API documentation is available at http://localhost:8000/docs. The health endpoint is `/api/v1/health`.