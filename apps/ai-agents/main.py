from fastapi import FastAPI
from routers import ldr, bdr, sdr, ae, cs, support, ops, head, cro

app = FastAPI()

app.include_router(ldr.router)
app.include_router(bdr.router)
app.include_router(sdr.router)
app.include_router(ae.router)
app.include_router(cs.router)
app.include_router(support.router)
app.include_router(ops.router)
app.include_router(head.router)
app.include_router(cro.router)

@app.get("/")
def read_root():
    return {"message": "Hello from AI Agents Service"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
