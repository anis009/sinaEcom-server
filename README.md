# SinaEcom Server

A full-featured E-commerce backend API built with Node.js, Express, and MongoDB. This server provides complete functionality for managing products, users, orders, categories, and payments with SSLCommerz integration.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Password hashing with bcryptjs
  - Password reset functionality with email
  - Admin role management
- **Product Management**
  - CRUD operations for products
  - Product reviews and ratings
  - Top products listing
  - Multiple image support
  - Stock management
- **Category Management**
  - Create and retrieve product categories
  - Category images support
- **Order Management**
  - Create and track orders
  - Order history for users
  - Shipping address management
  - Payment status tracking
  - Delivery status tracking
- **Payment Integration**
  - SSLCommerz payment gateway integration
  - Transaction management
- **File Upload**
  - Image upload functionality with Multer
  - Static file serving
- **Security**
  - CORS enabled
  - Protected routes with JWT middleware
  - Admin-only routes

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd sinaEcom-server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development

   # SSLCommerz Configuration
   STORED_ID=your_sslcommerz_store_id
   STORE_PASSWORD=your_sslcommerz_store_password

   # Email Configuration (for password reset)
   EMAIL_HOST=your_smtp_host
   EMAIL_PORT=587
   EMAIL_USER=your_email
   EMAIL_PASSWORD=your_email_password
   ```

4. **Start the server**

   Development mode (with nodemon):

   ```bash
   npm run server
   ```

   Production mode:

   ```bash
   npm run node
   ```

## 📁 Project Structure

```
sinaEcom-server/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── controllers/
│   ├── categoryController.js  # Category logic
│   ├── orderControllers.js    # Order management logic
│   ├── payControllers.js      # Payment processing logic
│   ├── productControllers.js  # Product management logic
│   └── userControllers.js     # User authentication logic
├── middleware/
│   ├── authMiddleware.js      # JWT authentication & authorization
│   ├── errorMiddleware.js     # Error handling middleware
│   └── sendEmail.js           # Email sending utility
├── models/
│   ├── category.js            # Category schema
│   ├── order.js               # Order schema
│   ├── product.js             # Product schema
│   ├── user.js                # User schema
│   └── year.js                # Year schema
├── routes/
│   ├── categoryRoute.js       # Category routes
│   ├── orderRoutes.js         # Order routes
│   ├── payRoutes.js           # Payment routes
│   ├── productRoutes.js       # Product routes
│   ├── uploadRoutes.js        # File upload routes
│   └── userRoutes.js          # User routes
├── uploads/                   # Static uploaded files
├── utils/
│   └── generateAuthToken.js   # JWT token generation
├── .env                       # Environment variables
├── index.js                   # Main application file
├── package.json               # Project dependencies
├── seeder.js                  # Database seeder
└── vercel.json               # Vercel deployment configuration
```

## 🔌 API Endpoints

### User Routes (`/api/users`)

- `POST /` - Register new user
- `PUT /` - Update user profile (Protected)
- `POST /login` - User login
- `POST /forgotpassword` - Request password reset
- `POST /resetpassword/:resetToken` - Reset password with token

### Product Routes (`/api/products`)

- `GET /` - Get all products (with pagination & search)
- `POST /` - Create new product (Admin only)
- `GET /top` - Get top-rated products
- `GET /:id` - Get single product by ID
- `PUT /:id` - Update product (Admin only)
- `POST /review/:id` - Create product review (Protected)

### Order Routes (`/api/order`)

- `POST /` - Create new order (Protected)
- `GET /:id` - Get single order by ID (Protected)
- `GET /mine/orders` - Get logged-in user's orders (Protected)

### Category Routes (`/api/category`)

- `GET /` - Get all categories
- `POST /` - Create new category

### Payment Routes (`/api/pay`)

- Payment processing with SSLCommerz

### Upload Routes (`/api/upload`)

- File upload functionality

## 🗄️ Database Models

### User Model

- name, email, password
- isAdmin (role-based access)
- image (profile picture)
- resetPasswordToken, resetPasswordExpire

### Product Model

- name, brand, category, description
- image (array for multiple images)
- price, countInStock
- rating, numReviews
- reviews (embedded subdocuments)

### Order Model

- user reference
- orderItems (array)
- shippingAddress (address, city, postalCode, country)
- phoneNumber
- paymentMethod
- isPaid, isDelivered
- prices (shipping, tax, total)

### Category Model

- name
- image

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 👤 Admin Access

Some routes are restricted to admin users only. Admin middleware checks if the authenticated user has `isAdmin: true`.

## 📦 Dependencies

### Main Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **multer** - File upload handling
- **cors** - CORS middleware
- **dotenv** - Environment variables
- **nodemailer** - Email sending
- **sslcommerz-lts** - Payment gateway integration
- **express-async-handler** - Async error handling
- **morgan** - HTTP request logger
- **uuid** - Unique ID generation

### Dev Dependencies

- **nodemon** - Auto-restart during development
- **concurrently** - Run multiple commands

## 🚀 Deployment

This project is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration.

To deploy:

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## 🛡️ Error Handling

The application includes custom error handling middleware:

- `notFound` - Handles 404 errors
- `errorHandler` - Formats error responses

## 📧 Email Functionality

Password reset functionality uses Nodemailer to send reset tokens to users' email addresses.

## 🎨 CORS Configuration

CORS is enabled for all origins (`*`). For production, consider restricting this to specific domains.

## 📝 Development

To run in development mode with auto-reload:

```bash
npm run server
```

The server will log:

```
MongoDB Connected: <host>🔥🔥🔥🚀🚀
Server is running in development on port 5000 🔥🔥🔥🚀🚀
```

## 📄 License

ISC

## 👥 Author

SinaEcom Development Team

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⚠️ Security Notes

- Never commit your `.env` file to version control
- Use strong JWT secrets in production
- Keep dependencies updated
- Use HTTPS in production
- Restrict CORS origins in production

## 📞 Support

For support, email your support team or create an issue in the repository.

---

Made with ❤️ for SinaEcom
