# Table Reservation Lock API

A simple Node.js + Express API to handle temporary table locking and unlocking to prevent double bookings.

## 📦 Tech Stack

- Node.js
- Express.js
- In-memory JSON file as data storage

## 🚀 API Endpoints

### POST /api/table/lock

- **Request:**
```json
{
  "tableId": "table-123",
  "userId": "user-abc",
  "duration": 600
}


