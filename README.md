# Point of Sale (POS) System

This project implements a comprehensive Point of Sale (POS) system designed to streamline retail operations, from product management and transaction processing to user authentication and detailed sales reporting. It leverages modern web technologies to provide a robust, scalable, and user-friendly solution for businesses.


## Technologies Used

This project is built using a modern and efficient technology stack, ensuring high performance, scalability, and maintainability:

*   **Backend Framework:** [ElysiaJS](https://elysiajs.com/) - A fast, lightweight, and type-safe web framework for Node.js, built on top of Hono and powered by Bun.
*   **Package Manager & Runtime:** [Bun](https://bun.sh/) - An all-in-one JavaScript runtime and toolkit, offering incredibly fast performance for development and production.
*   **Database & ORM:**
    *   **Database:** PostgreSQL
    *   **ORM:** [Prisma](https://www.prisma.io/) - A next-generation ORM that makes database access easy with a type-safe API.
*   **Authentication:** JWT (JSON Web Token) - For secure and stateless user authentication and session management.
*   **Frontend Framework:** [Next.js](https://nextjs.org/) - A React framework for building performant and scalable web applications with server-side rendering (SSR) and incremental static regeneration (ISR) capabilities.
*   **Payment Gateway Integration:** Integration with leading payment providers such as [Midtrans](https://midtrans.com/), [Xendit](https://www.xendit.co/), or [Stripe](https://stripe.com/). Supports various payment methods including QRIS and debit/credit cards.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) or [shadcn/ui](https://ui.shadcn.com/) - For rapid and consistent UI development.




## Key Features

This POS system offers a comprehensive set of features designed to enhance efficiency and provide valuable insights for businesses:

### Product Management
*   **CRUD Operations:** Full Create, Read, Update, and Delete (CRUD) functionality for products, including details such as name, price, stock, category, and barcode/QR code.
*   **Image Upload:** Ability to upload product images, enhancing product catalog visualization.

### Transaction & Payment
*   **Seamless Checkout:** Cashiers can easily select products and proceed to checkout.
*   **Automated Calculations:** Automatic calculation of total belanja, including discounts and taxes.
*   **Integrated Payment Gateway:** Support for various payment methods through integration with popular payment gateways (QRIS, credit/debit cards, e-wallet).
*   **Receipt Generation:** Option to print physical receipts or generate PDF receipts for transactions.

### User & Role Management
*   **Role-Based Access Control (RBAC):** Differentiated access levels for various user roles: Admin, Kasir (Cashier), and Owner.
*   **Admin Privileges:** Administrators have control over product management and access to detailed reports.
*   **Owner Privileges:** Owners have comprehensive access to sales reports and advanced analytics for strategic decision-making.

### Reporting & Analytics
*   **Comprehensive Sales Reports:** Generate daily, weekly, and monthly sales reports to track business performance.
*   **Key Metrics:** Monitor total omzet (revenue), profit margin, and breakdown by payment methods.
*   **Data Export:** Export reports to CSV or Excel formats for further analysis or record-keeping.

### Security & Authentication
*   **Secure Login/Register:** User authentication via email and password.
*   **JWT for Session Management:** Utilizes JSON Web Tokens (JWT) to ensure secure and stateless user sessions.
*   **Middleware Validation:** ElysiaJS middleware for robust JWT token validation on all protected API routes.




## Backend Architecture (ElysiaJS + Prisma + JWT)

The backend of this POS system is built with ElysiaJS, providing a fast and type-safe API layer. Prisma is used as the ORM for efficient database interactions, and JWT handles secure authentication.

### Routes

The API is structured with clear and intuitive routes to manage different aspects of the POS system. For detailed API documentation, including request/response schemas, please refer to the [API Documentation](#api-documentation) section.

*   `/auth/register`: Endpoint for new user registration.
*   `/auth/login`: Endpoint for user login and JWT generation.
*   `/products`: Endpoints for CRUD operations on product data (accessible by Admin).
*   `/transactions`: Endpoint for creating new transactions and calculating totals.

### Prisma Schema

The database schema is defined using Prisma, ensuring a clear and type-safe data model:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  username  String   @unique
  password  String
  role      String   @default("USER")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  Transaction Transaction[]
}

model Product {
  id         String    @id @default(cuid())
  name       String
  price      Float
  stock      Int       @default(0)
  sku        String?   @unique // bisa dipakai untuk barcode/QR, opsional
  category   Category? @relation(fields: [categoryId], references: [id])
  categoryId String?
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt

  TransactionItem TransactionItem[]
}

model Category {
  id        String     @id @default(cuid())
  name      String     @unique
  products  Product[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}

model Transaction {
  id         String             @id @default(cuid())
  user       User               @relation(fields: [userId], references: [id])
  userId     String
  items      TransactionItem[]
  total      Float
  payment    String             // contoh: CASH, QRIS, CARD
  status     String             @default("PENDING") // PENDING, PAID, CANCELED
  createdAt  DateTime           @default(now())
  updatedAt  DateTime           @updatedAt
}

model TransactionItem {
  id            String     @id @default(cuid())
  transaction   Transaction @relation(fields: [transactionId], references: [id])
  transactionId String
  product       Product     @relation(fields: [productId], references: [id])
  productId     String
  qty           Int
  price         Float       // harga satuan saat transaksi
  subtotal      Float       // qty * price
}





### JWT Authentication Flow

The authentication process leverages JSON Web Tokens (JWT) to ensure secure and efficient user sessions:

1.  **User Login:** A user (Kasir, Admin, or Owner) attempts to log in with their email and password.
2.  **Backend Verification:** The backend verifies the provided credentials against the stored user data.
3.  **JWT Generation:** Upon successful verification, the backend generates a unique JWT.
4.  **Token Storage:** The generated JWT is sent to the frontend and securely stored, typically in `localStorage` or `HttpOnly` cookies.
5.  **API Request Authorization:** For every subsequent request to a protected API endpoint, the frontend includes the JWT in the `Authorization` header as a Bearer token (e.g., `Authorization: Bearer <token>`).
6.  **Middleware Verification:** ElysiaJS middleware intercepts these requests and verifies the authenticity and validity of the JWT. If the token is valid, the request proceeds; otherwise, an unauthorized error is returned.



## Deployment & Infrastructure

This section outlines the recommended deployment strategies and infrastructure components for the POS system.

### Backend Deployment

The ElysiaJS backend, powered by Bun, can be deployed in several ways:

*   **Server/VPS:** Deploy directly to a virtual private server (VPS) or a dedicated server.
*   **Docker:** Containerize the application using Docker for easier deployment, scaling, and environment consistency.

### Database

For the PostgreSQL/MySQL database, you have several options:

*   **Cloud Providers:** Utilize managed database services like [Supabase](https://supabase.com/) or [PlanetScale](https://planetscale.com/) for scalability and ease of management.
*   **Local/Self-Hosted:** Deploy the database on a local server or a self-managed instance.

### Frontend Deployment

The Next.js frontend can be deployed efficiently using:

*   **Vercel:** Leverage Vercel's platform for seamless Next.js deployment, offering features like automatic scaling, global CDN, and serverless functions.
*   **VPS:** Deploy to a VPS for more control over the hosting environment.

### Storage

For storing product images and other media assets, it is recommended to use object storage solutions:

*   **Amazon S3:** A highly scalable, durable, and secure object storage service.
*   **MinIO:** An open-source object storage server compatible with Amazon S3 APIs, suitable for self-hosting.




## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```
## Development
To start the development server run:
```bash
bun run dev
```
Open http://localhost:3000/ with your browser to see the result.





# API Documentation

This section provides a detailed overview of the API endpoints available in the backend system, built with ElysiaJS.

## Authentication Routes

### `POST /auth/register`

**Description:** Registers a new user with the system. This endpoint is used for creating new accounts for cashiers, administrators, or owners.

**Request Body:**

```json
{
  "name": "string",
  "email": "string (email format)",
  "password": "string (min 8 characters)",
}
```

**Responses:**

*   **201 Created:** User successfully registered.
    ```json
    {
        "id": "uuid",
        "name": "string",
        "email": "string",
    }
    ```

*   **400 Bad Request:** Invalid input or email already exists.
    ```json
    {
      "error": "string"
    }
    ```

### `POST /auth/login`

**Description:** Authenticates a user and generates a JSON Web Token (JWT) for session management.

**Request Body:**

```json
{
  "email": "string (email format)",
  "password": "string"
}
```

**Responses:**

*   **200 OK:** User successfully logged in, returns JWT.
    ```json
    {
      "message": "Login successful",
      "token": "string (JWT)"
    }
    ```

*   **401 Unauthorized:** Invalid credentials.
    ```json
    {
      "error": "Invalid email or password"
    }
    ```

## Product Routes

### `GET /products`

**Description:** Retrieves a list of all products. Accessible by Admin and Owner roles.

**Responses:**

*   **200 OK:** Returns an array of product objects.
    ```json
    [
      {
        "id": "uuid",
        "name": "string",
        "price": "number",
        "stock": "integer",
        "categoryId": "uuid",
        "imageUrl": "string (URL)"
      }
    ]
    ```

*   **401 Unauthorized:** If the user is not authenticated.
*   **403 Forbidden:** If the authenticated user does not have the required role (e.g., Kasir).

### `GET /products/:id`

**Description:** Retrieves a single product by its ID. Accessible by Admin and Owner roles.

**Path Parameters:**

*   `id`: `uuid` - The unique identifier of the product.

**Responses:**

*   **200 OK:** Returns the product object.
    ```json
    {
      "id": "uuid",
      "name": "string",
      "price": "number",
      "stock": "integer",
      "categoryId": "uuid",
      "imageUrl": "string (URL)"
    }
    ```

*   **404 Not Found:** If the product with the given ID does not exist.
*   **401 Unauthorized:** If the user is not authenticated.
*   **403 Forbidden:** If the authenticated user does not have the required role.

### `POST /products`

**Description:** Creates a new product. Only accessible by Admin role.

**Request Body:**

```json
{
  "name": "string",
  "price": "number",
  "stock": "integer",
  "categoryId": "uuid",
  "image": "file (optional, for upload)"
}
```

**Responses:**

*   **201 Created:** Product successfully created.
    ```json
    {
      "message": "Product created successfully",
      "product": {
        "id": "uuid",
        "name": "string",
        "price": "number",
        "stock": "integer",
        "categoryId": "uuid",
        "imageUrl": "string (URL)"
      }
    }
    ```

*   **400 Bad Request:** Invalid input.
*   **401 Unauthorized:** If the user is not authenticated.
*   **403 Forbidden:** If the authenticated user does not have the Admin role.

### `PUT /products/:id`

**Description:** Updates an existing product by its ID. Only accessible by Admin role.

**Path Parameters:**

*   `id`: `uuid` - The unique identifier of the product to update.

**Request Body:**

```json
{
  "name": "string (optional)",
  "price": "number (optional)",
  "stock": "integer (optional)",
  "categoryId": "uuid (optional)",
  "image": "file (optional, for upload)"
}
```

**Responses:**

*   **200 OK:** Product successfully updated.
    ```json
    {
      "message": "Product updated successfully",
      "product": {
        "id": "uuid",
        "name": "string",
        "price": "number",
        "stock": "integer",
        "categoryId": "uuid",
        "imageUrl": "string (URL)"
      }
    }
    ```

*   **400 Bad Request:** Invalid input.
*   **404 Not Found:** If the product with the given ID does not exist.
*   **401 Unauthorized:** If the user is not authenticated.
*   **403 Forbidden:** If the authenticated user does not have the Admin role.

### `DELETE /products/:id`

**Description:** Deletes a product by its ID. Only accessible by Admin role.

**Path Parameters:**

*   `id`: `uuid` - The unique identifier of the product to delete.

**Responses:**

*   **204 No Content:** Product successfully deleted.
*   **404 Not Found:** If the product with the given ID does not exist.
*   **401 Unauthorized:** If the user is not authenticated.
*   **403 Forbidden:** If the authenticated user does not have the Admin role.

## Transaction Routes

### `POST /transactions`

**Description:** Creates a new transaction. This endpoint handles selecting products, calculating total, applying discounts/taxes, and preparing for payment. Accessible by Kasir role.

**Request Body:**

```json
{
  "products": [
    {
      "productId": "uuid",
      "quantity": "integer"
    }
  ],
  "discount": "number (optional)",
  "taxRate": "number (optional)"
}
```

**Responses:**

*   **201 Created:** Transaction successfully created, returns transaction details including calculated total.
    ```json
    {
      "message": "Transaction created successfully",
      "transaction": {
        "id": "uuid",
        "userId": "uuid",
        "total": "number",
        "status": "string (e.g., 'pending')",
        "createdAt": "datetime",
        "items": [
          {
            "productId": "uuid",
            "qty": "integer",
            "price": "number"
          }
        ]
      }
    }
    ```

*   **400 Bad Request:** Invalid input or insufficient stock.
*   **401 Unauthorized:** If the user is not authenticated.
*   **403 Forbidden:** If the authenticated user does not have the Kasir role.


