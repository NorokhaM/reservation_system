from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests

app = FastAPI()

# Example database of cards
VALID_CARDS = {"735BA5A1": "John Doe", "654321": "Jane Smith"}

# Request model for card scanning
class Card(BaseModel):
    card_id: str

@app.post("/scan")
async def scan_card(card: Card):
    """
    Endpoint to handle card scanning.
    """
    card_id = card.card_id

    if card_id in VALID_CARDS:
        return {"status": "success", "user": VALID_CARDS[card_id]}
    else:
        raise HTTPException(status_code=404, detail="Card not recognized")
# Health check endpoint
@app.get("/")
async def root():
    return {"message": "FastAPI server is running"}

class DeviceControlRequest(BaseModel):
    device_id: str
    power: str

@app.post("/control-device")
async def control_device(request: DeviceControlRequest):
    payload = {
        "device_id": request.device_id,
        "power": request.power,
    }

    try:
        response = requests.post(f"http://{request.device_id}:80/control", json=payload)
        if response.status_code == 200:
            return {"status": "success", "response": response.json()}
        else:
            raise HTTPException(
                status_code=response.status_code,
                detail=f"Failed to send data: {response.json().get('error', 'Unknown error')}",
 )
    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error communicating with the ESP32: {str(e)}",
        )