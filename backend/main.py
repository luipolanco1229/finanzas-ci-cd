""" API Finanzas - Backend - Módulo principal """
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Literal, Optional, List

app = FastAPI(title="API Finanzas", version="1.0.0", root_path="/api")

# CORS: habilita peticiones desde Vite (puerto 5173 por defecto)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Movimiento(BaseModel):
    """ Modelo de movimiento de dinero """
    tipo: Literal["ingreso", "gasto"]
    monto: float = Field(gt=0, description="Valor positivo")
    descripcion: Optional[str] = None
    categoria: Optional[str] = None

# Almacenamiento en memoria (se reinicia en cada arranque)
_movimientos: List[dict] = [
    {"tipo": "ingreso", "monto": 1200.0, "descripcion": "Salario", "categoria": "Trabajo"},
    {"tipo": "gasto", "monto": 150.0, "descripcion": "Transporte", "categoria": "Movilidad"},
    {"tipo": "gasto", "monto": 230.0, "descripcion": "Mercado", "categoria": "Hogar"},
]

@app.get("/health")
def salud():
    """ API de salud """
    return {"status": "ok"}

@app.get("/movimientos")
def listar_movimientos():
    """ Lista todos los movimientos """
    return _movimientos

@app.post("/movimientos", status_code=201)
def crear_movimiento(mov: Movimiento):
    """ Crea un nuevo movimiento """
    _movimientos.append(mov.dict())
    return mov

@app.delete("/movimientos/{idx}", status_code=204)
def eliminar_movimiento(idx: int):
    """ Elimina un movimiento por índice """
    if idx < 0 or idx >= len(_movimientos):
        raise HTTPException(status_code=404, detail="Movimiento no encontrado")
    _movimientos.pop(idx)

@app.get("/resumen")
def resumen():
    """ Resumen financiero con KPIs """
    ingresos = sum(m["monto"] for m in _movimientos if m["tipo"] == "ingreso")
    gastos = sum(m["monto"] for m in _movimientos if m["tipo"] == "gasto")
    balance = ingresos - gastos

    # KPIs por categoría (opcional para la UI)
    por_categoria = {}        
    for m in _movimientos:
        cat = m.get("categoria") or "Sin categoría"
        por_categoria.setdefault(cat, 0.0)
        por_categoria[cat] += m["monto"] if m["tipo"] == "gasto" else 0.0

    return {
        "ingresos": ingresos,
        "gastos": gastos,
        "balance": balance,
        "gastos_por_categoria": por_categoria,
        "total_movimientos": len(_movimientos),
    }
