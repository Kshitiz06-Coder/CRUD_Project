# SPA Portal — React CRUD Dashboard

A modern, responsive single-page application built with **React**, **Tailwind CSS v4**, and the **DummyJSON API**. It features a complete authentication flow, employee management (CRUD), product browsing, and a user profile — all wrapped in a clean dashboard layout with protected routing.

---

## Features

- **Secure Authentication** — Login via DummyJSON auth API with JWT token persistence (`localStorage`) and automatic session validation on refresh.
- **Protected Routes** — Route guards ensure only authenticated users can access the dashboard, employees, products, and profile pages.
- **Employee Management (CRUD)** — Full create, read, update, and delete functionality with:
  - Paginated data table
  - Real-time search
  - Inline add/edit modals
  - Delete confirmation dialogs
- **Product Catalog** — Responsive grid layout with search, price sorting (asc/desc), and detailed product modals.
- **User Profile** — Displays authenticated user info with a settings panel.
- **Responsive Design** — Sidebar navigation collapses gracefully; all pages work on mobile, tablet, and desktop.
- **Modern UI** — Built with Tailwind CSS v4 using an Indigo + Slate color palette, soft shadows, rounded cards, and inline SVG icons (no extra icon libraries needed).

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18+ |
| Routing | React Router v6 |
| Styling | Tailwind CSS v4 |
| HTTP Client | Axios (with request interceptors) |
| API | [DummyJSON](https://dummyjson.com) |
| Build Tool | Vite |
| Linting | ESLint (with GitHub Actions CI) |

---

## CRUD Implementation with React & DummyJSON

This project demonstrates a complete **CRUD (Create, Read, Update, Delete)** workflow using React functional components and the DummyJSON REST API. The employee management module serves as the primary CRUD showcase:

### Read & Search
- Fetches paginated employee data from `GET /users` with query parameters for `limit`, `skip`, and `search`.
- Implements real-time search by debouncing input and querying `GET /users/search?q={query}`.
- Uses React `useEffect` hooks to trigger refetches when pagination or search terms change.

### Create
- Posts new employee data to `POST /users/add` (DummyJSON's mock add endpoint).
- Uses a controlled form inside a modal dialog with validation states.
- Optimistically updates the local state to reflect the new entry without waiting for a full page reload.

### Update
- Sends modified employee fields via `PUT /users/{id}`.
- Pre-fills the edit modal with existing data fetched from `GET /users/{id}`.
- Handles partial updates by merging form changes with the existing user object.

### Delete
- Calls `DELETE /users/{id}` and removes the record from the UI upon success.
- Includes a confirmation dialog to prevent accidental deletions.
- Provides toast feedback on success or error.

### State Management
- Uses React's built-in `useState` and `useReducer` for local component state.
- Implements a custom `useApi` hook to abstract Axios calls, loading states, and error handling across all CRUD operations.

---

## API Integration Details

The app communicates exclusively with the [DummyJSON](https://dummyjson.com) API, a free fake REST API ideal for prototyping and testing frontend logic.

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/auth/login` | `POST` | Authenticate user and receive JWT token |
| `/auth/me` | `GET` | Validate current session using Bearer token |
| `/users` | `GET` | Fetch paginated list of users/employees |
| `/users/search` | `GET` | Search users by name or email |
| `/users/{id}` | `GET` | Retrieve single user details |
| `/users/add` | `POST` | Create a new user (mock) |
| `/users/{id}` | `PUT` | Update existing user (mock) |
| `/users/{id}` | `DELETE` | Remove user (mock) |
| `/products` | `GET` | Fetch paginated product catalog |
| `/products/search` | `GET` | Search products by title |
| `/products/{id}` | `GET` | Retrieve single product details |

All API requests are handled through a centralized Axios instance with:
- **Request Interceptor** — Automatically attaches the JWT token from `localStorage` as an `Authorization: Bearer` header.
- **Response Interceptor** — Catches 401/403 errors and redirects to the login page, clearing invalid tokens.

---

## Architecture Highlights

- **Component Composition** — UI is built from reusable components (`Table`, `Modal`, `Loader`, `Pagination`) shared across the employee and product modules.
- **Protected Route Guard** — A `&lt;ProtectedRoute&gt;` wrapper checks for a valid token before rendering dashboard pages; unauthenticated users are redirected to `/login`.
- **Responsive Sidebar** — A collapsible navigation sidebar using Tailwind's responsive prefixes (`md:flex`, `hidden`) and local state for the mobile hamburger menu.
- **No External Icon Libraries** — All icons are inline SVGs to keep bundle size minimal and avoid dependency bloat.
.

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/spa-portal.git

# Install dependencies
pnpm install

# Start the development server
pnpm run dev

# Build for production
pnpm run build