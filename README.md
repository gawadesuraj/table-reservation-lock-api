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

## 🧪 Postman Collection

You can test all API endpoints using this [[Postman Collection](./TableReservation.postman_collection.json).](https://gawadesuraj-3889280.postman.co/workspace/Suraj-Gawade's-Workspace~38eaaedd-2e49-4d29-8261-fd565a9b3bda/collection/47083889-3d1832a4-ea62-4385-941c-ef4dd31cbefa?action=share&source=copy-link&creator=47083889)

