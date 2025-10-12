# Elegant Stitches Boutique - Backend API

A comprehensive RESTful API for managing a custom tailoring boutique business, built with Node.js, Express, and MongoDB.

## Features

- 🔐 **Authentication & Authorization** - JWT-based auth with role-based access control
- 👥 **Client Management** - Complete client profiles with measurements and photos
- 📋 **Order Management** - Track orders from creation to delivery
- 💳 **Payment Processing** - Multiple payment methods with Stripe integration
- 📊 **Analytics Dashboard** - Comprehensive business insights and reporting
- 📄 **Invoice Generation** - Automatic PDF invoice creation
- 📧 **Email Notifications** - Automated order and payment confirmations
- 📸 **Image Upload** - Cloudinary integration for photo management

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Express Validator
- **Email:** NodeMailer
- **Payments:** Stripe
- **PDF Generation:** PDFKit
- **Image Storage:** Cloudinary

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:
   - MongoDB connection string
   - JWT secret
   - Email credentials (if using email features)
   - Stripe keys (if using payment features)
   - Cloudinary credentials (if using image uploads)

5. Seed the database with sample data (optional):
   ```bash
   npm run seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/update-password` - Update password
- `POST /api/auth/logout` - Logout user

### Clients
- `GET /api/clients` - Get all clients (with pagination & search)
- `GET /api/clients/:id` - Get single client
- `POST /api/clients` - Create new client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client (admin only)
- `PUT /api/clients/:id/measurements` - Update measurements
- `POST /api/clients/:id/photos` - Add client photo
- `GET /api/clients/stats` - Get client statistics

### Orders
- `GET /api/orders` - Get all orders (with filters)
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order (admin only)
- `PUT /api/orders/:id/status` - Update order status
- `GET /api/orders/stats/overview` - Get order statistics

### Payments
- `GET /api/payments` - Get all payments
- `GET /api/payments/:id` - Get single payment
- `POST /api/payments` - Create new payment
- `PUT /api/payments/:id` - Update payment
- `POST /api/payments/:id/refund` - Process refund (admin only)
- `GET /api/payments/stats/overview` - Get payment statistics

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard analytics
- `GET /api/analytics/revenue` - Get revenue analytics
- `GET /api/analytics/clients` - Get client analytics
- `GET /api/analytics/orders` - Get order analytics

### Invoices
- `GET /api/invoices/:orderId` - Generate invoice PDF
- `GET /api/invoices/:orderId/data` - Get invoice data (JSON)

## Database Models

### User
- Authentication credentials
- Role-based access (admin, staff)
- Profile information

### Client
- Personal information
- Contact details
- Comprehensive measurements
- Photos and preferences
- Order history

### Order
- Order details and items
- Pricing and payment status
- Status tracking with history
- Dates and deadlines

### Payment
- Payment transactions
- Multiple payment methods
- Refund tracking

## Default Login Credentials

After running the seed script, you can login with:

**Admin Account:**
- Email: `admin@elegantstitches.com`
- Password: `admin123`

**Staff Account:**
- Email: `staff@elegantstitches.com`
- Password: `staff123`

⚠️ **Important:** Change these credentials in production!

## Development

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Seed database with sample data
npm run seed
```

## Environment Variables

See `.env.example` for all available configuration options.

## Error Handling

The API uses a centralized error handling middleware that returns consistent error responses:

```json
{
  "status": "error",
  "message": "Error message here"
}
```

## Security

- Passwords are hashed using bcrypt
- JWT tokens for stateless authentication
- Input validation on all routes
- MongoDB injection protection
- CORS configuration for frontend access

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

ISC

## Support

For questions or issues, please contact the development team.

