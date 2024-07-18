# Digital Wallet Project

A PayPal-like digital wallet application for managing online transactions and payments.

## Features

- User account management
- Digital wallet with balance tracking
- Bank integration for adding money (onRamp transactions)
- Webhook handler for processing bank transactions
- Secure transaction processing

## Screenshots

### Home Page
![Home Page](images/Screenshot%202024-07-19%20020830.png)

### Transfer Page
![Transfer Page](images/Screenshot%202024-07-19%20020934.png)

## Tech Stack

- Frontend & Backend: Next.js
- Database: PostgreSQL (or your specific database)
- ORM: Prisma
- Language: TypeScript
- Build Tool: esbuild (for specific components)

## Setup and Installation

1. Clone the repository:
```
git clone [your-repo-url]
cd paytmplease
```
2. Install dependencies:
```
npm install
```
3. Set up your environment variables (create a `.env` file in user-app):
```
JWT_SECRET= ...
NEXTAUTH_URL= ...
```
4. Generate and Migrate Prisma client in packages/db:
``` 
npx prisma migrate dev
npx prisma generate
```
5. `npm run dev` to start the development server.

