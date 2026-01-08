from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import uuid

app = FastAPI(
    title="Alumni Connect API",
    description="AI-powered ride pooling system API",
    version="1.0.0"
)

# CORS middleware
# TODO: Update allow_origins with your actual Vercel URL after deployment
# Example: allow_origins=["https://your-app.vercel.app", "http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with: ["https://your-app.vercel.app", "http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class Rider(BaseModel):
    name: str
    pickup: str
    time: str

class Pool(BaseModel):
    id: str
    route_name: str
    riders: List[Rider]
    total_cost: float
    per_person: float
    distance: float
    duration: str
    pickup_order: List[str]
    destination: str
    completed_at: Optional[str] = None

# Mock data for demonstration (Indian context)
MOCK_TODAY_POOLS = [
    {
        "id": "pool-001",
        "route_name": "Bangalore Central Express",
        "riders": [
            {"name": "Priya Sharma", "pickup": "Electronic City", "time": "8:15 AM"},
            {"name": "Arjun Reddy", "pickup": "MG Road Metro", "time": "8:30 AM"},
            {"name": "Ananya Patel", "pickup": "IISc Campus", "time": "8:45 AM"},
        ],
        "total_cost": 450.00,
        "per_person": 150.00,
        "distance": 28.5,
        "duration": "1h 15m",
        "pickup_order": ["Electronic City", "MG Road Metro", "IISc Campus"],
        "destination": "Kempegowda Airport Terminal 2"
    },
    {
        "id": "pool-002",
        "route_name": "Mumbai North Shuttle",
        "riders": [
            {"name": "Rahul Mehta", "pickup": "Bandra Kurla Complex", "time": "9:00 AM"},
            {"name": "Kavya Nair", "pickup": "Phoenix Mall", "time": "9:20 AM"},
        ],
        "total_cost": 380.00,
        "per_person": 190.00,
        "distance": 24.0,
        "duration": "1h 5m",
        "pickup_order": ["Bandra Kurla Complex", "Phoenix Mall"],
        "destination": "Jio World Convention Centre"
    },
    {
        "id": "pool-003",
        "route_name": "Delhi Metro Link",
        "riders": [
            {"name": "Siddharth Kapoor", "pickup": "Connaught Place", "time": "7:30 AM"},
            {"name": "Neha Singh", "pickup": "India Gate", "time": "7:45 AM"},
            {"name": "Vikram Gupta", "pickup": "Gurgaon Sector 29", "time": "8:00 AM"},
        ],
        "total_cost": 520.00,
        "per_person": 173.33,
        "distance": 35.0,
        "duration": "1h 30m",
        "pickup_order": ["Connaught Place", "India Gate", "Gurgaon Sector 29"],
        "destination": "IGI Airport Terminal 3"
    }
]

MOCK_YESTERDAY_POOLS = [
    {
        "id": "pool-y001",
        "route_name": "IIT Campus Shuttle",
        "riders": [
            {"name": "Aditya Verma", "pickup": "Hostel Block A", "time": "7:30 AM"},
            {"name": "Riya Joshi", "pickup": "Central Library", "time": "7:45 AM"},
        ],
        "total_cost": 320.00,
        "per_person": 160.00,
        "distance": 22.0,
        "duration": "55m",
        "pickup_order": ["Hostel Block A", "Central Library"],
        "destination": "Indiranagar Metro",
        "completed_at": (datetime.now() - timedelta(days=1, hours=2)).isoformat()
    },
    {
        "id": "pool-y002",
        "route_name": "Hyderabad Evening Express",
        "riders": [
            {"name": "Rajesh Kumar", "pickup": "HITEC City", "time": "5:30 PM"},
            {"name": "Meera Iyer", "pickup": "Banjara Hills", "time": "5:45 PM"},
            {"name": "Amit Desai", "pickup": "Gachibowli Stadium", "time": "6:00 PM"},
        ],
        "total_cost": 525.00,
        "per_person": 175.00,
        "distance": 31.0,
        "duration": "1h 20m",
        "pickup_order": ["HITEC City", "Banjara Hills", "Gachibowli Stadium"],
        "destination": "Rajiv Gandhi Airport Terminal 1",
        "completed_at": (datetime.now() - timedelta(days=1, hours=14)).isoformat()
    },
    {
        "id": "pool-y003",
        "route_name": "Pune IT Corridor",
        "riders": [
            {"name": "Sanjay Menon", "pickup": "Hinjewadi Tech Park", "time": "8:00 AM"},
            {"name": "Deepika Rao", "pickup": "Wakad Bridge", "time": "8:15 AM"},
        ],
        "total_cost": 280.00,
        "per_person": 140.00,
        "distance": 18.5,
        "duration": "45m",
        "pickup_order": ["Hinjewadi Tech Park", "Wakad Bridge"],
        "destination": "Pune Railway Station",
        "completed_at": (datetime.now() - timedelta(days=1, hours=12)).isoformat()
    }
]

@app.get("/")
async def root():
    return {
        "message": "Alumni Connect API",
        "version": "1.0.0",
        "endpoints": {
            "today_pools": "/api/pools/today",
            "yesterday_pools": "/api/pools/yesterday",
            "health": "/health"
        }
    }

@app.get("/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.get("/api/pools/today")
async def get_today_pools():
    """
    Returns today's automatically generated pooled rides.
    In production, this would query the database for pools scheduled for today.
    """
    return {
        "pools": MOCK_TODAY_POOLS,
        "count": len(MOCK_TODAY_POOLS),
        "generated_at": datetime.now().isoformat()
    }

@app.get("/api/pools/yesterday")
async def get_yesterday_pools():
    """
    Returns yesterday's completed pools to prove automation worked overnight.
    In production, this would query completed pools from the previous day.
    """
    return {
        "pools": MOCK_YESTERDAY_POOLS,
        "count": len(MOCK_YESTERDAY_POOLS),
        "generated_at": datetime.now().isoformat()
    }

@app.get("/api/pools/{pool_id}")
async def get_pool(pool_id: str):
    """Get details for a specific pool by ID"""
    all_pools = MOCK_TODAY_POOLS + MOCK_YESTERDAY_POOLS
    pool = next((p for p in all_pools if p["id"] == pool_id), None)
    
    if not pool:
        raise HTTPException(status_code=404, detail="Pool not found")
    
    return {"pool": pool}

@app.get("/api/pools/{pool_id}/qr/{rider_name}")
async def get_rider_qr(pool_id: str, rider_name: str):
    """Generate QR code data for a specific rider in a pool"""
    all_pools = MOCK_TODAY_POOLS + MOCK_YESTERDAY_POOLS
    pool = next((p for p in all_pools if p["id"] == pool_id), None)
    
    if not pool:
        raise HTTPException(status_code=404, detail="Pool not found")
    
    rider = next((r for r in pool["riders"] if r["name"] == rider_name), None)
    if not rider:
        raise HTTPException(status_code=404, detail="Rider not found in pool")
    
    qr_data = f"RIDE:{pool_id}|RIDER:{rider_name}|PICKUP:{rider['pickup']}|TIME:{rider['time']}"
    
    return {
        "qr_data": qr_data,
        "rider": rider,
        "pool": {
            "id": pool["id"],
            "route_name": pool["route_name"],
            "destination": pool["destination"]
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

