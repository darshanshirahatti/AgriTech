import asyncio
import os
from sqlalchemy.ext.asyncio import create_async_engine
from app.core.database import Base
# Import all models to ensure they are registered with Base.metadata
from app.models.user import User
from app.models.profile import FarmerProfile, BuyerProfile, ExpertProfile
from app.models.role import UserRole

# Use the environment variable if present, otherwise default to local credentials
DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql+asyncpg://user:password@localhost:5432/krishiconnect")

async def init_db():
    print(f"Connecting to {DATABASE_URL}...")
    try:
        engine = create_async_engine(DATABASE_URL, echo=True)
        async with engine.begin() as conn:
            print("Creating database tables...")
            await conn.run_sync(Base.metadata.create_all)
        print("Database tables created successfully!")
    except Exception as e:
        print(f"\nERROR: Failed to connect or create tables.")
        print(f"Details: {e}")
        print("\nMake sure:")
        print("1. PostgreSQL is installed and running.")
        print("2. The database 'krishiconnect' exists.")
        print("3. The username and password are correct.")

if __name__ == "__main__":
    asyncio.run(init_db())
