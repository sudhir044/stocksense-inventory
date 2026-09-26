# StockSense Inventory Management System

StockSense is a full-stack inventory management system designed to manage products, stock, warehouses, locations, receipts, deliveries, internal transfers, stock adjustments, and inventory movement history.

The system provides a centralized dashboard for monitoring inventory operations with role-based authentication and JWT-secured APIs.

---

##  Features

### Authentication & Security

- User registration
- User login
- JWT-based authentication
- Authenticated user profile
- OTP-based password reset
- Hashed passwords
- Hashed OTP reset tokens
- Protected API routes
- Role-based authorization
- Helmet security headers
- CORS configuration
- Centralized error handling

### Inventory Management

- Product management
- Product categories
- Warehouse management
- Location management
- Current stock tracking
- Stock quantity updates
- Low-stock monitoring
- Out-of-stock monitoring

### Inventory Operations

- Inbound receipts
- Outbound deliveries
- Internal stock transfers
- Stock adjustments
- Operation validation
- Automatic stock updates
- Inventory movement tracking

### Dashboard

The dashboard provides:

- Total products
- Total stock
- Low-stock products
- Out-of-stock products
- Pending receipts
- Pending deliveries
- Scheduled transfers
- Recent inventory movements

### Move History / Stock Ledger

Every inventory movement is recorded in the stock ledger.

Supported movement types include:

- `receipt`
- `delivery`
- `transfer_out`
- `transfer_in`
- `adjustment`

---

#  Project Architecture

```text
stocksense-inventory/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── env.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   ├── role.middleware.js
│   │   │   ├── validate.middleware.js
│   │   │   ├── notFound.middleware.js
│   │   │   └── error.middleware.js
│   │   │
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── products/
│   │   │   ├── categories/
│   │   │   ├── warehouses/
│   │   │   ├── locations/
│   │   │   ├── receipts/
│   │   │   ├── deliveries/
│   │   │   ├── transfers/
│   │   │   ├── adjustments/
│   │   │   ├── stock/
│   │   │   ├── ledger/
│   │   │   └── dashboard/
│   │   │
│   │   ├── utils/
│   │   │   ├── AppError.js
│   │   │   └── asyncHandler.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── database/
│   │   └── schema/
│   │
│   ├── scripts/
│   │   └── migrate.js
│   │
│   ├── tests/
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── ...
│   │
│   ├── index.html
│   ├── vite.config.js
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
