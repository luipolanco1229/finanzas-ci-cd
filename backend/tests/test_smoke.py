import os
import requests

BASE_URL = os.getenv("APP_BASE_URL", "http://localhost:8000")

def test_smoke_api_up():
    response = requests.get(f"{BASE_URL}/health")
    assert response.status_code == 200
