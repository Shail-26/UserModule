# User Module

A simple user management application with **Signup**, **Login**, **User Profile**, and **All Users List** functionalities.

- **Frontend**: Built with Next.js (TypeScript, Tailwind CSS, App Router, Turbopack)
- **Backend**: Built with Nest.js, GraphQL, and MongoDB

---

## How to Run

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

- Ensure MongoDB is running (e.g., mongod for local or use a MongoDB Atlas URI)
- Start the backend server:

```bash
npm run start:dev
```

- The GraphQL API will be available at:
- http://localhost:3000/graphql

### 3. Set Up the Frontend

Open a new terminal and run:
```bash
cd frontend
npm install
npm run dev
```

- The frontend app will be available at:
- http://localhost:3001 (or another port if 3001 is occupied)

### 4. Access the Application

Open http://localhost:3001 in your browser.
Use the homepage to navigate:

- **Signup** – Create a new user
- **Login** – Authenticate
- **Profile** – View user details (requires login)
- **All Users** – View the list of all users (requires login)
