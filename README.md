# Solo Circle

Solo Circle is a full-stack project consisting of a React.js frontend styled with Tailwind CSS and a Node.js backend using Prisma ORM and PostgreSQL.

## Project Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js using Prisma ORM
- **Database**: PostgreSQL

## Prerequisites

Ensure the following are installed:

- **Node.js**: Version 22.12.0
- **Yarn**: Version 1.22.22
- **PostgreSQL**: Ensure the database server is running and accessible.

## Installation

Install dependencies on root path:

- For **Root dependencies**:
  ```bash
  yarn
  ```

- For **frontend dependencies**:
  ```bash
  yarn frontend-preinstall
  ```

- For **backend dependencies**:
  ```bash
  yarn backend-preinstall
  ```

## Database Setup

Configure the database connection by updating the `DATABASE_URL` in the backend's `.env` file, located in the `backend/` folder. Example:

```env
PORT=8000
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
CRYPTO_ENCRYPTION_KEY=********************
SUPERUSER_EMAIL=********************
ACCESS_TOKEN_SECRET=********************

GOOGLE_CLIENT_ID=********************
GOOGLE_CLIENT_SECRET=********************
GOOGLE_REDIRECT_URI=********************

FACEBOOK_APP_ID=********************
FACEBOOK_APP_SECRET=********************
FACEBOOK_REDIRECT_URI=********************

X_CLIENT_ID=********************
X_CLIENT_SECRET=********************
X_REDIRECT_URI=********************
```

Synchronize the database schema with Prisma:

```bash
npx prisma migrate dev
```

### Step 4: Run the Project

Start the development servers for both frontend and backend:

```bash
yarn dev
```

This command will run both the frontend and backend servers concurrently.

## Project Structure

```
solo-circle/
├── frontend/   # React.js and Tailwind CSS codebase
├── backend/    # Node.js with Prisma ORM and PostgreSQL
├── backend/.env  # Environment variables
├── package.json
└── README.md   # Project documentation
```

## Notes

- Ensure that the required ports for the frontend and backend are available and not used by other applications.
- Use the `.env` file in the `backend/` folder to customize database and server configurations.
- For Prisma-related commands, refer to the [Prisma documentation](https://www.prisma.io/docs/).