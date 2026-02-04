from fastapi import FastAPI
from routers import ldr, bdr, sdr, ae

app = FastAPI()

app.include_router(ldr.router)
app.include_router(bdr.router)
app.include_router(sdr.router)
app.include_router(ae.router)

@app.get("/")
def read_root():
    return {"message": "Hello from AI Agents Service"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
