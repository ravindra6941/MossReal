from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
from pymongo.errors import DuplicateKeyError
from bson import ObjectId


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# AIVO Models
class DemoRequestCreate(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    phone: Optional[str] = None
    company: str
    companySize: str
    jobTitle: Optional[str] = None
    useCase: Optional[str] = None

class DemoRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    firstName: str
    lastName: str
    email: str
    phone: Optional[str] = None
    company: str
    companySize: str
    jobTitle: Optional[str] = None
    useCase: Optional[str] = None
    status: str = "new"
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class NewsletterSubscribe(BaseModel):
    email: EmailStr
    source: str = "footer"

class Newsletter(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    source: str
    isActive: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

# Helper function to convert ObjectId to string
def serialize_doc(doc):
    if doc is None:
        return None
    if isinstance(doc, list):
        return [serialize_doc(item) for item in doc]
    if isinstance(doc, dict):
        return {key: serialize_value(value) for key, value in doc.items()}
    return serialize_value(doc)

def serialize_value(value):
    if isinstance(value, ObjectId):
        return str(value)
    elif isinstance(value, datetime):
        return value.isoformat()
    elif isinstance(value, dict):
        return {k: serialize_value(v) for k, v in value.items()}
    elif isinstance(value, list):
        return [serialize_value(item) for item in value]
    return value

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# AIVO API Endpoints
@api_router.post("/demo-requests")
async def create_demo_request(demo_request: DemoRequestCreate):
    try:
        # Create demo request object
        demo_obj = DemoRequest(**demo_request.dict())
        demo_dict = demo_obj.dict()
        
        # Insert into MongoDB
        result = await db.demo_requests.insert_one(demo_dict)
        
        return JSONResponse(
            status_code=201,
            content={
                "success": True,
                "message": "Demo request submitted successfully",
                "id": demo_obj.id
            }
        )
    except Exception as e:
        logger.error(f"Error creating demo request: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit demo request")

@api_router.get("/demo-requests")
async def get_demo_requests():
    try:
        # Get all demo requests, sorted by creation date (newest first)
        demo_requests = await db.demo_requests.find().sort("createdAt", -1).to_list(1000)
        
        # Serialize the documents to handle ObjectId
        serialized_requests = serialize_doc(demo_requests)
        
        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "data": serialized_requests,
                "total": len(serialized_requests)
            }
        )
    except Exception as e:
        logger.error(f"Error fetching demo requests: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch demo requests")

@api_router.post("/newsletter")
async def subscribe_newsletter(newsletter: NewsletterSubscribe):
    try:
        # Check if email already exists
        existing = await db.newsletter.find_one({"email": newsletter.email})
        
        if existing:
            return JSONResponse(
                status_code=200,
                content={
                    "success": True,
                    "message": "Email already subscribed to newsletter",
                    "alreadySubscribed": True
                }
            )
        
        # Create newsletter subscription
        newsletter_obj = Newsletter(**newsletter.dict())
        newsletter_dict = newsletter_obj.dict()
        
        # Insert into MongoDB
        result = await db.newsletter.insert_one(newsletter_dict)
        
        return JSONResponse(
            status_code=201,
            content={
                "success": True,
                "message": "Successfully subscribed to newsletter",
                "id": newsletter_obj.id
            }
        )
    except Exception as e:
        logger.error(f"Error subscribing to newsletter: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to subscribe to newsletter")

@api_router.get("/newsletter")
async def get_newsletter_subscribers():
    try:
        # Get all newsletter subscribers, sorted by creation date (newest first)
        subscribers = await db.newsletter.find({"isActive": True}).sort("createdAt", -1).to_list(1000)
        
        # Serialize the documents to handle ObjectId
        serialized_subscribers = serialize_doc(subscribers)
        
        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "data": serialized_subscribers,
                "total": len(serialized_subscribers)
            }
        )
    except Exception as e:
        logger.error(f"Error fetching newsletter subscribers: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch newsletter subscribers")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
