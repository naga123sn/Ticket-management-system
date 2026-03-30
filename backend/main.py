from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.db import engine, Base
from models import models  # ensures all models are registered
from routers import auth, tickets, users, helpers, stats

# Create all tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Ticket Management System", version="1.0.0")

# CORS — allow React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router)
app.include_router(tickets.router)
app.include_router(users.router)
app.include_router(helpers.router)
app.include_router(stats.router)


@app.get("/")
def root():
    return {"message": "Ticket Management API is running"}
