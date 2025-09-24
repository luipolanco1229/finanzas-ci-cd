import os
import requests

BASE_URL = os.getenv("APP_BASE_URL", "http://localhost:8000")

def test_get_movimientos():
    response = requests.get(f"{BASE_URL}/movimientos")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_movimiento():
    payload = {
        "descripcion": "Compra",
        "monto": 100,
        "tipo": "gasto"
    }
    response = requests.post(f"{BASE_URL}/movimientos", json=payload)
    assert response.status_code == 201
    assert response.json()["descripcion"] == "Compra"
