# AIVO Backend Integration Contracts

## API Endpoints to Implement

### 1. Demo Request API
**Endpoint:** `POST /api/demo-requests`
**Purpose:** Store demo booking form submissions
**Request Body:**
```json
{
  "firstName": "string (required)",
  "lastName": "string (required)", 
  "email": "string (required)",
  "phone": "string (optional)",
  "company": "string (required)",
  "companySize": "string (required)",
  "jobTitle": "string (optional)",
  "useCase": "string (optional)"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Demo request submitted successfully",
  "id": "demo_request_id"
}
```

### 2. Newsletter Signup API
**Endpoint:** `POST /api/newsletter`
**Purpose:** Store newsletter subscriptions
**Request Body:**
```json
{
  "email": "string (required)",
  "source": "string (footer/hero/pricing)" 
}
```
**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter"
}
```

### 3. Get Demo Requests (Admin)
**Endpoint:** `GET /api/demo-requests`
**Purpose:** Retrieve all demo requests for admin
**Response:**
```json
{
  "success": true,
  "data": [array of demo requests],
  "total": "number"
}
```

## MongoDB Models

### DemoRequest Model
```javascript
{
  _id: ObjectId,
  firstName: String (required),
  lastName: String (required),
  email: String (required, indexed),
  phone: String,
  company: String (required),
  companySize: String (required),
  jobTitle: String,
  useCase: String,
  status: String (default: "new"), // new, contacted, demo_scheduled, closed
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

### Newsletter Model
```javascript
{
  _id: ObjectId,
  email: String (required, unique, indexed),
  source: String (required), // footer, hero, pricing
  isActive: Boolean (default: true),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

## Frontend Integration Changes

### Mock Data to Remove
- Remove mock form submission in `DemoModal.jsx`
- Add actual API calls to `/api/demo-requests`

### New Components to Add
- Newsletter signup form in Footer
- Newsletter signup in hero section (optional)
- Success/error handling for API calls

### Frontend Updates Required
1. **DemoModal.jsx**: Replace mock submission with real API call
2. **Footer.jsx**: Add newsletter signup form with API integration
3. **Add error handling**: Toast notifications for success/error states
4. **Loading states**: Proper loading indicators during API calls

## Implementation Steps
1. Create MongoDB models (DemoRequest, Newsletter)
2. Implement API endpoints with validation
3. Update frontend components to use real APIs
4. Add proper error handling and user feedback
5. Test complete flow from frontend to database

## Data Validation
- Email format validation
- Required field validation
- Duplicate email handling for newsletter
- Input sanitization for security

## Success Criteria
- Demo form submits and stores data in MongoDB
- Newsletter signup works from footer
- Proper error handling and user feedback
- Data is queryable for admin purposes