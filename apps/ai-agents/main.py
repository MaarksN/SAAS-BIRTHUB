from fastapi import FastAPI
from routers import ldr

app = FastAPI()

app.include_router(ldr.router)

@app.get("/")
def read_root():
    return {"message": "Hello from AI Agents Service"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
