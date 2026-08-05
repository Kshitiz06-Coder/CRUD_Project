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

## Project Structure
